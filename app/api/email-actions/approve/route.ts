import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Donation from '@/lib/models/Donation'
import { sendDonationEmail } from '@/lib/mail'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const donationId = searchParams.get('donationId')

    if (!token || !donationId) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 })
    }

    // Verify token (in production, store tokens in database with expiration)
    const expectedToken = crypto
      .createHash('sha256')
      .update(`${donationId}-${process.env.EMAIL_ACTION_SECRET || 'default-secret'}`)
      .digest('hex')

    if (token !== expectedToken) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 })
    }

    await connectDB()

    // Find and update donation
    const donation = await Donation.findById(donationId)
    if (!donation) {
      return NextResponse.json({ success: false, message: 'Donation not found' }, { status: 404 })
    }

    if (donation.status !== 'pending') {
      return NextResponse.json({ success: false, message: 'Donation already processed' }, { status: 400 })
    }

    // Update donation status
    donation.status = 'approved'
    donation.approvedAt = new Date()
    await donation.save()

    // Send confirmation email to donor
    const donationData = {
      donorName: donation.donor.name,
      donorEmail: donation.donor.email,
      donationRef: donation.donationRef,
      totalAmount: donation.totalAmount,
      status: 'approved' as const,
      items: donation.items,
      donorMessage: donation.donor.message,
      approvedAt: donation.approvedAt,
      createdAt: donation.createdAt
    }

    await sendDonationEmail({ 
      to: donation.donor.email, 
      subject: '🎉 Donation Received - Thank You for Your Support!' 
    }, donationData)

    // Return HTML success page instead of JSON
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Donation Approved - GEKCT Foundation</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f9fafb; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .success { color: #10b981; font-size: 48px; margin-bottom: 20px; }
          h1 { color: #1f2937; margin-bottom: 20px; }
          p { color: #6b7280; margin-bottom: 30px; }
          .btn { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success">✅</div>
          <h1>Donation Approved Successfully!</h1>
          <p>Donation <strong>${donation.donationRef}</strong> has been approved and the donor has been notified.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/donations" class="btn">View All Donations</a>
        </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })

  } catch (error) {
    console.error('Error approving donation via email:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to approve donation' 
    }, { status: 500 })
  }
}

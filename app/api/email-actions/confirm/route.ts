import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Donation from '@/lib/models/Donation'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const donationId = searchParams.get('donationId')

    if (!token || !donationId) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 })
    }

    // Verify token
    const expectedToken = crypto
      .createHash('sha256')
      .update(`${donationId}-${process.env.EMAIL_ACTION_SECRET || 'default-secret'}`)
      .digest('hex')

    if (token !== expectedToken) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 })
    }

    await connectDB()

    // Find donation
    const donation = await Donation.findById(donationId)
    if (!donation) {
      return NextResponse.json({ success: false, message: 'Donation not found' }, { status: 404 })
    }

    // Redirect to admin panel with highlighted donation
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/donations?highlight=${donation._id}`)

  } catch (error) {
    console.error('Error processing confirm action:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process confirm action' 
    }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { sendDonationEmail } from '@/lib/mail'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    // Optional token guard (enable by setting TEST_EMAIL_TOKEN in env)
    const token = searchParams.get('token')
    if (process.env.TEST_EMAIL_TOKEN && token !== process.env.TEST_EMAIL_TOKEN) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    let to = (searchParams.get('to') || '').trim()
    const subject = (searchParams.get('subject') || 'Test email from GEKCT').trim()
    const name = (searchParams.get('name') || 'Test Recipient').trim()

    if (!to) {
      // fallback to configured sender (useful for verifying SMTP works)
      if (process.env.EMAIL_USER) {
        to = process.env.EMAIL_USER
      } else if (process.env.SMTP_USER) {
        to = process.env.SMTP_USER
      }
    }

    if (!to || !isValidEmail(to)) {
      return NextResponse.json({
        success: false,
        error: 'Please provide a valid recipient email via ?to=recipient@example.com',
      }, { status: 400 })
    }

    const donationRef = `TEST-${Date.now()}`

    const result = await sendDonationEmail({
      to,
      subject,
    }, {
      donorName: name,
      donationRef,
      totalAmount: 2500.00,
      status: 'approved',
      items: [
        {
          categoryName: 'Education Support',
          unit: 'months',
          unitPrice: 1000.00,
          quantity: 2,
          total: 2000.00
        },
        {
          categoryName: 'Medical Aid',
          unit: 'patients',
          unitPrice: 500.00,
          quantity: 1,
          total: 500.00
        }
      ],
      donorMessage: 'Thank you for the amazing work you do in the community. I hope this helps make a difference!',
      approvedAt: new Date(),
      createdAt: new Date()
    })

    if (!result?.queued) {
      return NextResponse.json({
        success: false,
        error: 'Email not sent',
        reason: (result as any)?.reason || 'unknown',
        to,
        subject,
      }, { status: 500 })
    }

    return NextResponse.json({ success: true, to, subject })
  } catch (error) {
    console.error('Error sending test email:', error)
    return NextResponse.json({ success: false, error: 'Failed to send test email' }, { status: 500 })
  }
}

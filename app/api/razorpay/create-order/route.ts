import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Initialize Razorpay only if environment variables are available
let razorpay: Razorpay | null = null

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment gateway not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const { amount, currency = 'INR' } = await request.json()

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum amount is ₹1' },
        { status: 400 }
      )
    }

    const options = {
      amount: amount, // Amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}

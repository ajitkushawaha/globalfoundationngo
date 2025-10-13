import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Donation from '@/lib/models/Donation'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get('limit') || 12), 50)

    const docs = await Donation.find({ status: 'approved' })
      .sort({ approvedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean()

    const donors = docs.map((d) => ({
      name: d.donor.anonymous ? 'Anonymous' : d.donor.name,
      amount: d.totalAmount,
      approvedAt: d.approvedAt || d.createdAt,
    }))

    return NextResponse.json({ success: true, data: donors })
  } catch (error) {
    console.error('Error fetching recent donors:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch recent donors' }, { status: 500 })
  }
}

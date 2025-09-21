import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Statistic from '@/lib/models/Statistic'

// GET /api/statistics - Get all statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const active = searchParams.get('active') !== 'false' // Default to true
    
    const query: any = {}
    
    if (type) query.type = type
    if (active) query.isActive = true
    
    const statistics = await Statistic.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: statistics
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

// POST /api/statistics - Create new statistic
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const statistic = new Statistic(body)
    await statistic.save()
    
    return NextResponse.json({
      success: true,
      data: statistic
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating statistic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create statistic' },
      { status: 500 }
    )
  }
}

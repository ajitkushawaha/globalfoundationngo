import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Statistic from '@/lib/models/Statistic'

// GET /api/statistics/[id] - Get single statistic
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const statistic = await Statistic.findById(params.id)
    
    if (!statistic) {
      return NextResponse.json(
        { success: false, error: 'Statistic not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: statistic
    })
  } catch (error) {
    console.error('Error fetching statistic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistic' },
      { status: 500 }
    )
  }
}

// PUT /api/statistics/[id] - Update statistic
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const statistic = await Statistic.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!statistic) {
      return NextResponse.json(
        { success: false, error: 'Statistic not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: statistic
    })
  } catch (error) {
    console.error('Error updating statistic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update statistic' },
      { status: 500 }
    )
  }
}

// DELETE /api/statistics/[id] - Delete statistic
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const statistic = await Statistic.findByIdAndDelete(params.id)
    
    if (!statistic) {
      return NextResponse.json(
        { success: false, error: 'Statistic not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Statistic deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting statistic:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete statistic' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Initiative from '@/lib/models/Initiative'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const initiative = await Initiative.findById(params.id).lean()
    
    if (!initiative) {
      return NextResponse.json(
        { success: false, error: 'Initiative not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: initiative
    })
  } catch (error) {
    console.error('Error fetching initiative:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch initiative' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Generate slug from title if not provided and title is being updated
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    const initiative = await Initiative.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!initiative) {
      return NextResponse.json(
        { success: false, error: 'Initiative not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: initiative,
      message: 'Initiative updated successfully'
    })
  } catch (error) {
    console.error('Error updating initiative:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Initiative with this slug already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update initiative' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const initiative = await Initiative.findByIdAndDelete(params.id)
    
    if (!initiative) {
      return NextResponse.json(
        { success: false, error: 'Initiative not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Initiative deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting initiative:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete initiative' },
      { status: 500 }
    )
  }
}

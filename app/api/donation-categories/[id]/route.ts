import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import DonationCategory from '@/lib/models/DonationCategory'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const category = await DonationCategory.findById(params.id).lean()
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Donation category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Error fetching donation category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation category' },
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
    
    // Generate slug from name if not provided and name is being updated
    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    const category = await DonationCategory.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Donation category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Donation category updated successfully'
    })
  } catch (error) {
    console.error('Error updating donation category:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Donation category with this slug already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update donation category' },
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
    
    const category = await DonationCategory.findByIdAndDelete(params.id)
    
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Donation category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Donation category deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting donation category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete donation category' },
      { status: 500 }
    )
  }
}

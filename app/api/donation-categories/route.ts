import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import DonationCategory from '@/lib/models/DonationCategory'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    // Build filter object
    const filter: any = {}
    if (activeOnly) {
      filter.isActive = true
    }
    
    const categories = await DonationCategory.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching donation categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donation categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Generate slug from name if not provided
    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    const category = new DonationCategory(body)
    await category.save()
    
    return NextResponse.json({
      success: true,
      data: category,
      message: 'Donation category created successfully'
    })
  } catch (error) {
    console.error('Error creating donation category:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Donation category with this slug already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create donation category' },
      { status: 500 }
    )
  }
}

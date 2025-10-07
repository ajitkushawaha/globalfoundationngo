import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Initiative from '@/lib/models/Initiative'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    
    // Build filter object
    const filter: any = {}
    
    if (status) filter.status = status
    if (category) filter.category = category
    if (featured === 'true') filter.featured = true
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const initiatives = await Initiative.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await Initiative.countDocuments(filter)
    
    return NextResponse.json({
      success: true,
      data: initiatives,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching initiatives:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch initiatives' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    const initiative = new Initiative(body)
    await initiative.save()
    
    return NextResponse.json({
      success: true,
      data: initiative,
      message: 'Initiative created successfully'
    })
  } catch (error) {
    console.error('Error creating initiative:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Initiative with this slug already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create initiative' },
      { status: 500 }
    )
  }
}

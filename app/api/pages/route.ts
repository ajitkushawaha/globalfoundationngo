import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Page from '@/lib/models/Page'

// GET /api/pages - Get all pages
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const pageType = searchParams.get('pageType')
    const showInNav = searchParams.get('showInNav')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}
    
    if (status) query.status = status
    if (pageType) query.pageType = pageType
    if (showInNav !== null) query.showInNavigation = showInNav === 'true'
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit
    const total = await Page.countDocuments(query)
    const pages = Math.ceil(total / limit)

    // Get pages
    const data = await Page.find(query)
      .sort({ navigationOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

// POST endpoint removed - New pages cannot be created

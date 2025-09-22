import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'

// GET /api/blog - Get all blog posts or single post by slug
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    // If slug is provided, return single post
    if (slug) {
      const post = await BlogPost.findOne({ slug, published: true }).lean()
      
      if (!post) {
        return NextResponse.json(
          { success: false, error: 'Blog post not found' },
          { status: 404 }
        )
      }
      
      // Increment view count
      await BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } })
      
      return NextResponse.json({
        success: true,
        data: [post] // Return as array for consistency
      })
    }
    
    // Otherwise, return all posts with pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published') !== 'false' // Default to true
    
    const query: any = {}
    
    if (category) query.category = category
    if (featured) query.featured = featured === 'true'
    if (published) query.published = true
    
    const skip = (page - 1) * limit
    
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    const total = await BlogPost.countDocuments(query)
    
    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
    
    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug })
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists' },
        { status: 400 }
      )
    }
    
    const post = new BlogPost({
      ...body,
      slug,
      publishedAt: body.published ? new Date() : null
    })
    
    await post.save()
    
    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

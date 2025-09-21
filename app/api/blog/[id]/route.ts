import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'

// GET /api/blog/[id] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const post = await BlogPost.findById(params.id)
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    // Increment view count
    await BlogPost.findByIdAndUpdate(params.id, { $inc: { views: 1 } })
    
    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[id] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Generate slug from title if title is being updated
    if (body.title) {
      const slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
      
      // Check if slug already exists (excluding current post)
      const existingPost = await BlogPost.findOne({ 
        slug, 
        _id: { $ne: params.id } 
      })
      
      if (existingPost) {
        return NextResponse.json(
          { success: false, error: 'A post with this title already exists' },
          { status: 400 }
        )
      }
      
      body.slug = slug
    }
    
    // Set publishedAt if post is being published
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }
    
    const post = await BlogPost.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const post = await BlogPost.findByIdAndDelete(params.id)
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}

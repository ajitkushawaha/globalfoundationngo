import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { EditBlogPostClient } from './edit-client'

interface EditBlogPostPageProps {
  params: {
    id: string
  }
}

async function getBlogPost(id: string) {
  try {
    await connectDB()
    const post = await BlogPost.findById(id).lean()
    
    if (!post) {
      return null
    }

    // Serialize the MongoDB object to a plain object
    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const blogPost = await getBlogPost(params.id)

  if (!blogPost) {
    notFound()
  }

  return <EditBlogPostClient initialData={blogPost} />
}

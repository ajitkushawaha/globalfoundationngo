import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt?: Date
  mediaType: 'image' | 'video'
  image?: string
  imageAlt?: string
  videoUrl?: string
  videoTitle?: string
  readTime: string
  views: number
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Education', 'Animal Welfare', 'Elderly Care', 'Environmental Conservation', 'General']
  },
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  image: {
    type: String,
    trim: true
  },
  imageAlt: {
    type: String,
    trim: true
  },
  videoUrl: {
    type: String,
    trim: true
  },
  videoTitle: {
    type: String,
    trim: true
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  views: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot be more than 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot be more than 160 characters']
  }
}, {
  timestamps: true
})

// Create index for better query performance
// Note: slug index is automatically created by unique: true
BlogPostSchema.index({ published: 1, publishedAt: -1 })
BlogPostSchema.index({ category: 1 })
BlogPostSchema.index({ featured: 1 })

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)

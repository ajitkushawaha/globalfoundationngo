import mongoose, { Document, Schema } from 'mongoose'

export interface IPageContent extends Document {
  page: string
  section: string
  title?: string
  content: string
  metadata?: {
    description?: string
    keywords?: string[]
    image?: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const PageContentSchema = new Schema<IPageContent>({
  page: {
    type: String,
    required: [true, 'Page is required'],
    enum: ['home', 'about', 'contact', 'donate', 'blog']
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true
  },
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  metadata: {
    description: {
      type: String,
      maxlength: [160, 'Description cannot be more than 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }],
    image: {
      type: String,
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create compound index for page and section
PageContentSchema.index({ page: 1, section: 1 }, { unique: true })

export default mongoose.models.PageContent || mongoose.model<IPageContent>('PageContent', PageContentSchema)

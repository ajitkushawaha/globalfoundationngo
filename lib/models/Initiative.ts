import mongoose, { Document, Schema } from 'mongoose'

export interface IInitiative extends Document {
  title: string
  slug: string
  description: string
  content: string
  category: string
  status: 'active' | 'completed' | 'paused' | 'planning'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  startDate: Date
  endDate?: Date
  targetAmount: number
  currentAmount: number
  featured: boolean
  image?: string
  imageAlt?: string
  gallery?: string[]
  tags: string[]
  location?: string
  beneficiaries: string
  impact: string
  seoTitle?: string
  seoDescription?: string
  author: string
  createdAt: Date
  updatedAt: Date
}

const InitiativeSchema = new Schema<IInitiative>({
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
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Education', 'Healthcare', 'Environment', 'Animal Welfare', 'Elderly Care', 'Children', 'Women Empowerment', 'Disaster Relief', 'Community Development', 'Other']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'planning'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [0, 'Target amount cannot be negative']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    trim: true
  },
  imageAlt: {
    type: String,
    trim: true
  },
  gallery: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  beneficiaries: {
    type: String,
    required: [true, 'Beneficiaries description is required'],
    trim: true
  },
  impact: {
    type: String,
    required: [true, 'Impact description is required'],
    trim: true
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot be more than 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot be more than 160 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    default: 'Admin'
  }
}, {
  timestamps: true
})

// Index for better query performance
// Note: slug index is automatically created by unique: true
InitiativeSchema.index({ status: 1 })
InitiativeSchema.index({ category: 1 })
InitiativeSchema.index({ featured: 1 })
InitiativeSchema.index({ priority: 1 })
InitiativeSchema.index({ startDate: -1 })

// Virtual for progress percentage
InitiativeSchema.virtual('progressPercentage').get(function() {
  if (this.targetAmount === 0) return 0
  return Math.min(Math.round((this.currentAmount / this.targetAmount) * 100), 100)
})

// Virtual for days remaining
InitiativeSchema.virtual('daysRemaining').get(function() {
  if (!this.endDate) return null
  const now = new Date()
  const diffTime = this.endDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
})

// Ensure virtual fields are serialized
InitiativeSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Initiative || mongoose.model<IInitiative>('Initiative', InitiativeSchema)
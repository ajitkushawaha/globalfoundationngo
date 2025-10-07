import mongoose, { Document, Schema } from 'mongoose'

export interface IDonationCategory extends Document {
  name: string
  slug: string
  description: string
  unitPrice: number
  unit: string
  icon: string
  color: string
  bgColor: string
  currentFunded: number
  targetGoal: number
  donors: number
  isActive: boolean
  sortOrder: number
  image?: string
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const DonationCategorySchema = new Schema<IDonationCategory>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
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
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [1, 'Unit price must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true,
    maxlength: [50, 'Unit cannot be more than 50 characters']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required'],
    trim: true
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true
  },
  bgColor: {
    type: String,
    required: [true, 'Background color is required'],
    trim: true
  },
  currentFunded: {
    type: Number,
    default: 0,
    min: [0, 'Current funded cannot be negative']
  },
  targetGoal: {
    type: Number,
    required: [true, 'Target goal is required'],
    min: [1, 'Target goal must be at least 1']
  },
  donors: {
    type: Number,
    default: 0,
    min: [0, 'Donors cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    trim: true
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

// Index for better query performance
// Note: slug index is automatically created by unique: true
DonationCategorySchema.index({ isActive: 1 })
DonationCategorySchema.index({ sortOrder: 1 })

// Virtual for progress percentage
DonationCategorySchema.virtual('progressPercentage').get(function() {
  if (this.targetGoal === 0) return 0
  return Math.min(Math.round((this.currentFunded / this.targetGoal) * 100), 100)
})

// Ensure virtual fields are serialized
DonationCategorySchema.set('toJSON', { virtuals: true })

export default mongoose.models.DonationCategory || mongoose.model<IDonationCategory>('DonationCategory', DonationCategorySchema)

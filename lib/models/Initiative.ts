import mongoose, { Document, Schema } from 'mongoose'

export interface IInitiative extends Document {
  title: string
  description: string
  icon: string
  image?: string
  imageAlt?: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const InitiativeSchema = new Schema<IInitiative>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  icon: {
    type: String,
    required: [true, 'Icon is required'],
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  imageAlt: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Create index for ordering
InitiativeSchema.index({ order: 1, isActive: 1 })

export default mongoose.models.Initiative || mongoose.model<IInitiative>('Initiative', InitiativeSchema)

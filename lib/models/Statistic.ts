import mongoose, { Document, Schema } from 'mongoose'

export interface IStatistic extends Document {
  type: 'impact' | 'achievement' | 'milestone'
  value: string
  label: string
  description: string
  icon: string
  color: string
  bgColor: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const StatisticSchema = new Schema<IStatistic>({
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['impact', 'achievement', 'milestone']
  },
  value: {
    type: String,
    required: [true, 'Value is required'],
    trim: true
  },
  label: {
    type: String,
    required: [true, 'Label is required'],
    trim: true,
    maxlength: [100, 'Label cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [200, 'Description cannot be more than 200 characters']
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
StatisticSchema.index({ order: 1, isActive: 1 })

export default mongoose.models.Statistic || mongoose.model<IStatistic>('Statistic', StatisticSchema)

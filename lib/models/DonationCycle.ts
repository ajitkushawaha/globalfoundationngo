import mongoose, { Schema, Document } from 'mongoose'

export interface IDonationCycle extends Document {
  cycleNumber: number
  totalDonations: number
  categoriesReset: number
  resetDate: Date
  categories: Array<{
    categoryId: string
    categoryName: string
    targetGoal: number
    currentFunded: number
    unitPrice: number
    totalAmount: number
  }>
  createdAt: Date
  updatedAt: Date
}

const DonationCycleSchema = new Schema<IDonationCycle>({
  cycleNumber: { type: Number, required: true, unique: true },
  totalDonations: { type: Number, required: true },
  categoriesReset: { type: Number, required: true },
  resetDate: { type: Date, required: true },
  categories: [{
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    targetGoal: { type: Number, required: true },
    currentFunded: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Update the updatedAt field before saving
DonationCycleSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const DonationCycle = mongoose.models.DonationCycle || mongoose.model<IDonationCycle>('DonationCycle', DonationCycleSchema)

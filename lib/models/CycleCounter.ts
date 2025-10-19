import mongoose, { Schema, Document } from 'mongoose'

export interface ICycleCounter extends Document {
  currentCycle: number
  totalResets: number
  lastResetDate: Date
  createdAt: Date
  updatedAt: Date
}

const CycleCounterSchema = new Schema<ICycleCounter>({
  currentCycle: { type: Number, default: 1 },
  totalResets: { type: Number, default: 0 },
  lastResetDate: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Ensure only one document exists
CycleCounterSchema.index({ _id: 1 }, { unique: true })

export default mongoose.models.CycleCounter || mongoose.model<ICycleCounter>('CycleCounter', CycleCounterSchema)

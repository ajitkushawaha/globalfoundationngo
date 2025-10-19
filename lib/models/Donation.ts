import mongoose, { Document, Schema } from 'mongoose'

export interface IDonationItem {
  categoryId: string
  categoryName: string
  unit: string
  unitPrice: number
  quantity: number
  total: number
}

export interface IDonorInfo {
  name: string
  email: string
  phone?: string
  instagram?: string
  message?: string
  anonymous: boolean
}

export interface IDonation extends Document {
  donor: IDonorInfo
  items: IDonationItem[]
  totalAmount: number
  status: 'pending' | 'approved' | 'rejected'
  donationRef: string
  approvedAt?: Date
  bankVerified?: boolean
  bankVerificationNotes?: string
  createdAt: Date
  updatedAt: Date
}

const DonationItemSchema = new Schema<IDonationItem>({
  categoryId: { type: String, required: true, trim: true },
  categoryName: { type: String, required: true, trim: true },
  unit: { type: String, required: true, trim: true },
  unitPrice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true, min: 0 },
}, { _id: false })

const DonorInfoSchema = new Schema<IDonorInfo>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  instagram: { type: String, trim: true },
  message: { type: String, trim: true },
  anonymous: { type: Boolean, default: false },
}, { _id: false })

const DonationSchema = new Schema<IDonation>({
  donor: { type: DonorInfoSchema, required: true },
  items: { type: [DonationItemSchema], required: true, validate: [(v: IDonationItem[]) => v.length > 0, 'At least one item required'] },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
  donationRef: { type: String, required: true, unique: true, index: true },
  approvedAt: { type: Date },
  bankVerified: { type: Boolean, default: false },
  bankVerificationNotes: { type: String, trim: true },
}, { timestamps: true })

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema)

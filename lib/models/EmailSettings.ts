import mongoose, { Document, Schema } from 'mongoose'

export interface IEmailSettings extends Document {
  // SMTP Configuration
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPassword: string
  fromEmail: string
  fromName: string
  
  // Admin Notification Settings
  adminNotificationEmails: string[]
  enableDonationNotifications: boolean
  enableApprovalNotifications: boolean
  
  // Email Templates
  donationReceivedSubject: string
  donationApprovedSubject: string
  donationRejectedSubject: string
  adminNotificationSubject: string
  
  // Metadata
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const EmailSettingsSchema = new Schema<IEmailSettings>({
  smtpHost: {
    type: String,
    required: true,
    trim: true
  },
  smtpPort: {
    type: Number,
    required: true,
    default: 587
  },
  smtpSecure: {
    type: Boolean,
    default: false
  },
  smtpUser: {
    type: String,
    required: true,
    trim: true
  },
  smtpPassword: {
    type: String,
    required: true
  },
  fromEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  fromName: {
    type: String,
    required: true,
    trim: true,
    default: 'GEKCT Foundation'
  },
  adminNotificationEmails: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  enableDonationNotifications: {
    type: Boolean,
    default: true
  },
  enableApprovalNotifications: {
    type: Boolean,
    default: true
  },
  donationReceivedSubject: {
    type: String,
    default: '🎉 Donation Received - Thank You for Your Support!'
  },
  donationApprovedSubject: {
    type: String,
    default: '🎉 Donation Received - Thank You for Your Support!'
  },
  donationRejectedSubject: {
    type: String,
    default: 'Important Update: Your Donation Request'
  },
  adminNotificationSubject: {
    type: String,
    default: '🔔 New Donation Received - Action Required'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.models.EmailSettings || mongoose.model<IEmailSettings>('EmailSettings', EmailSettingsSchema)

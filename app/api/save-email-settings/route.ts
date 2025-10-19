import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

// Simple EmailSettings schema
const EmailSettingsSchema = new mongoose.Schema({
  smtpHost: String,
  smtpPort: Number,
  smtpSecure: Boolean,
  smtpUser: String,
  smtpPassword: String,
  fromEmail: String,
  fromName: String,
  adminNotificationEmails: [String],
  enableDonationNotifications: Boolean,
  enableApprovalNotifications: Boolean,
  donationReceivedSubject: String,
  donationApprovedSubject: String,
  donationRejectedSubject: String,
  adminNotificationSubject: String,
  volunteerConfirmationSubject: String,
  isActive: { type: Boolean, default: true },
  createdBy: String
}, { timestamps: true })

const EmailSettings = mongoose.models.EmailSettings || mongoose.model('EmailSettings', EmailSettingsSchema)

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    console.log('Saving email settings:', { ...body, smtpPassword: '***' })
    
    // Deactivate existing settings
    await EmailSettings.updateMany({ isActive: true }, { isActive: false })
    
    // Create new settings
    const emailSettings = new EmailSettings({
      ...body,
      isActive: true
    })
    
    await emailSettings.save()
    console.log('Email settings saved successfully')
    
    // Don't return the password
    const { smtpPassword, ...settingsWithoutPassword } = emailSettings.toObject()
    
    return NextResponse.json({ 
      success: true, 
      settings: settingsWithoutPassword,
      message: 'Email settings saved successfully'
    })
  } catch (error) {
    console.error('Error saving email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: `Failed to save email settings: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const settings = await EmailSettings.findOne({ isActive: true })
    
    if (!settings) {
      return NextResponse.json({ 
        success: true, 
        settings: null,
        message: 'No email settings configured yet'
      })
    }
    
    // Don't return the password
    const { smtpPassword, ...settingsWithoutPassword } = settings.toObject()
    
    return NextResponse.json({ 
      success: true, 
      settings: settingsWithoutPassword 
    })
  } catch (error) {
    console.error('Error fetching email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: `Failed to fetch email settings: ${error instanceof Error ? error.message : String(error)}` 
    }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import EmailSettings from '@/lib/models/EmailSettings'

// GET: Get email settings
export async function GET(request: NextRequest) {
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

    // Don't return the password in the response
    const { smtpPassword, ...settingsWithoutPassword } = settings.toObject()
    
    return NextResponse.json({ 
      success: true, 
      settings: settingsWithoutPassword 
    })
  } catch (error) {
    console.error('Error fetching email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch email settings' 
    }, { status: 500 })
  }
}

// POST: Create or update email settings
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const {
      smtpHost,
      smtpPort,
      smtpSecure,
      smtpUser,
      smtpPassword,
      fromEmail,
      fromName,
      adminNotificationEmails,
      enableDonationNotifications,
      enableApprovalNotifications,
      donationReceivedSubject,
      donationApprovedSubject,
      donationRejectedSubject,
      adminNotificationSubject,
      createdBy
    } = body

    // Validate required fields
    if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail || !createdBy) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Deactivate existing settings
    await EmailSettings.updateMany({ isActive: true }, { isActive: false })

    // Create new settings
    const emailSettings = new EmailSettings({
      smtpHost,
      smtpPort: smtpPort || 587,
      smtpSecure: smtpSecure || false,
      smtpUser,
      smtpPassword,
      fromEmail,
      fromName: fromName || 'GEKCT Foundation',
      adminNotificationEmails: adminNotificationEmails || [],
      enableDonationNotifications: enableDonationNotifications !== false,
      enableApprovalNotifications: enableApprovalNotifications !== false,
      donationReceivedSubject: donationReceivedSubject || '🎉 Donation Received - Thank You for Your Support!',
      donationApprovedSubject: donationApprovedSubject || '🎉 Donation Received - Thank You for Your Support!',
      donationRejectedSubject: donationRejectedSubject || 'Important Update: Your Donation Request',
      adminNotificationSubject: adminNotificationSubject || '🔔 New Donation Received - Action Required',
      createdBy
    })

    await emailSettings.save()

    // Don't return the password in the response
    const { smtpPassword: _, ...settingsWithoutPassword } = emailSettings.toObject()

    return NextResponse.json({ 
      success: true, 
      settings: settingsWithoutPassword,
      message: 'Email settings saved successfully'
    })
  } catch (error) {
    console.error('Error saving email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save email settings' 
    }, { status: 500 })
  }
}

// PUT: Update email settings
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Settings ID is required' 
      }, { status: 400 })
    }

    const settings = await EmailSettings.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )

    if (!settings) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email settings not found' 
      }, { status: 404 })
    }

    // Don't return the password in the response
    const { smtpPassword, ...settingsWithoutPassword } = settings.toObject()

    return NextResponse.json({ 
      success: true, 
      settings: settingsWithoutPassword,
      message: 'Email settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update email settings' 
    }, { status: 500 })
  }
}

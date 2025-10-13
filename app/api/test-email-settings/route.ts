import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import EmailSettings from '@/lib/models/EmailSettings'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { testEmail } = body

    if (!testEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Test email is required' 
      }, { status: 400 })
    }

    // Get active email settings
    const settings = await EmailSettings.findOne({ isActive: true })
    
    if (!settings) {
      return NextResponse.json({ 
        success: false, 
        error: 'No email settings configured' 
      }, { status: 400 })
    }

    // Test email configuration
    const testResult = await testEmailConfiguration(settings, testEmail)
    
    return NextResponse.json({ 
      success: testResult.success, 
      message: testResult.message,
      error: testResult.error
    })
  } catch (error) {
    console.error('Error testing email settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to test email settings' 
    }, { status: 500 })
  }
}

async function testEmailConfiguration(settings: any, testEmail: string) {
  try {
    // Load nodemailer at runtime
    let nodemailerMod: any
    try {
      const req = eval('require') as any
      const nm = req('nodemailer')
      nodemailerMod = (nm as any).default || nm
    } catch (e) {
      return { success: false, error: 'nodemailer not installed' }
    }

    const transporter = nodemailerMod.createTransporter({
      host: settings.smtpHost,
      port: settings.smtpPort,
      secure: settings.smtpSecure,
      auth: { 
        user: settings.smtpUser, 
        pass: settings.smtpPassword 
      },
    })

    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: testEmail,
      subject: '✅ Email Configuration Test - GEKCT Foundation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">GEKCT Foundation</h1>
            <p style="color: #e0e7ff; margin: 8px 0 0 0;">Email Configuration Test</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <h2 style="color: #10B981; margin: 0 0 16px 0;">✅ Email Configuration Successful!</h2>
            <p style="color: #374151; margin: 0 0 16px 0;">
              Your email settings have been configured correctly and are working properly.
            </p>
            <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin: 0 0 12px 0; font-size: 16px;">Configuration Details:</h3>
              <p style="color: #6b7280; margin: 4px 0; font-size: 14px;"><strong>SMTP Host:</strong> ${settings.smtpHost}</p>
              <p style="color: #6b7280; margin: 4px 0; font-size: 14px;"><strong>Port:</strong> ${settings.smtpPort}</p>
              <p style="color: #6b7280; margin: 4px 0; font-size: 14px;"><strong>From Email:</strong> ${settings.fromEmail}</p>
              <p style="color: #6b7280; margin: 4px 0; font-size: 14px;"><strong>From Name:</strong> ${settings.fromName}</p>
            </div>
            <p style="color: #6b7280; margin: 16px 0 0 0; font-size: 14px;">
              You can now use these settings to send donation notifications to donors and admins.
            </p>
          </div>
        </div>
      `,
      text: `
GEKCT Foundation - Email Configuration Test

✅ Email Configuration Successful!

Your email settings have been configured correctly and are working properly.

Configuration Details:
- SMTP Host: ${settings.smtpHost}
- Port: ${settings.smtpPort}
- From Email: ${settings.fromEmail}
- From Name: ${settings.fromName}

You can now use these settings to send donation notifications to donors and admins.
      `
    })

    return { success: true, message: 'Test email sent successfully' }
  } catch (error) {
    console.error('Email test failed:', error)
    return { 
      success: false, 
      error: `Email test failed: ${error instanceof Error ? error.message : String(error)}` 
    }
  }
}

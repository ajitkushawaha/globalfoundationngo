
interface SendOptions {
  to: string
  subject: string
}

interface TemplateData {
  donorName: string
  donationRef: string
  totalAmount: number
  status: 'approved' | 'pending' | 'rejected'
  items?: Array<{
    categoryName: string
    unit: string
    unitPrice: number
    quantity: number
    total: number
  }>
  donorMessage?: string
  approvedAt?: Date
  createdAt?: Date
}

export async function sendDonationEmail(opts: SendOptions, data: TemplateData) {
  // Try to get admin-configured email settings first
  let emailSettings = null
  try {
    const connectDB = (await import('@/lib/mongodb')).default
    const EmailSettings = (await import('@/lib/models/EmailSettings')).default
    await connectDB()
    emailSettings = await EmailSettings.findOne({ isActive: true })
  } catch (error) {
    console.warn('Could not load admin email settings, falling back to environment variables')
  }

  let from, host, port, secure, user, pass

  if (emailSettings) {
    // Use admin-configured settings
    from = `"${emailSettings.fromName}" <${emailSettings.fromEmail}>`
    host = emailSettings.smtpHost
    port = emailSettings.smtpPort
    secure = emailSettings.smtpSecure
    user = emailSettings.smtpUser
    pass = emailSettings.smtpPassword
  } else {
    // Fallback to environment variables
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  const hasEmail = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)

    from = process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@example.com'
    host = hasSmtp ? process.env.SMTP_HOST! : (hasEmail ? 'smtp.gmail.com' : undefined)
    port = hasSmtp ? Number(process.env.SMTP_PORT || 587) : (hasEmail ? 465 : undefined)
    secure = hasSmtp ? Boolean(process.env.SMTP_SECURE === 'true') : (hasEmail ? true : false)
    user = hasSmtp ? process.env.SMTP_USER! : (hasEmail ? process.env.EMAIL_USER! : undefined)
    pass = hasSmtp ? process.env.SMTP_PASS! : (hasEmail ? process.env.EMAIL_PASS! : undefined)
  }

  // If neither is configured, log and exit gracefully
  if (!host || !user || !pass) {
    console.log('[mail] SMTP not configured. Would send email:', {
      to: opts.to,
      subject: opts.subject,
      from,
      preview: renderText(data)
    })
    return { queued: false, reason: 'smtp_not_configured' }
  }

  // Load nodemailer at runtime without forcing bundler to resolve it
  // Use eval('require') so Next.js/Webpack doesn't try to bundle a missing dep
  let nodemailerMod: any
  try {
    const req = eval('require') as any
    const nm = req('nodemailer')
    nodemailerMod = (nm as any).default || nm
  } catch (e) {
    console.warn('[mail] nodemailer not installed; email disabled:', e)
    return { queued: false, reason: 'nodemailer_not_installed' }
  }

  const transporter = nodemailerMod.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })

  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: renderText(data),
    html: renderHtml(data),
  })

  return { queued: true }
}

export async function sendAdminNotification(donationData: any) {
  try {
    console.log('[mail] Starting admin notification for donation:', donationData.donationRef)
    
    // Try to get admin-configured email settings first
    let emailSettings = null
    try {
      const connectDB = (await import('@/lib/mongodb')).default
      const EmailSettings = (await import('@/lib/models/EmailSettings')).default
      await connectDB()
      emailSettings = await EmailSettings.findOne({ isActive: true })
    } catch (error) {
      console.warn('Could not load admin email settings, falling back to environment variables')
    }


    if (!emailSettings || !emailSettings.enableDonationNotifications || !emailSettings.adminNotificationEmails.length) {
      console.log('[mail] Admin notifications disabled or no admin emails configured')
      return { queued: false, reason: 'admin_notifications_disabled' }
    }

    // Always use environment variables for SMTP (database doesn't store password)
    const from = emailSettings ? 
      `"${emailSettings.fromName}" <${emailSettings.fromEmail}>` : 
      process.env.EMAIL_FROM || process.env.EMAIL_USER
    const host = 'smtp.gmail.com'
    const port = 587
    const secure = false
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !user || !pass) {
      console.log('[mail] Email settings not configured')
      return { queued: false, reason: 'email_not_configured' }
    }

    // Load nodemailer
    let nodemailerMod: any
    try {
      const req = eval('require') as any
      const nm = req('nodemailer')
      nodemailerMod = (nm as any).default || nm
    } catch (e) {
      console.warn('[mail] nodemailer not installed; admin email disabled:', e)
      return { queued: false, reason: 'nodemailer_not_installed' }
    }

    const transporter = nodemailerMod.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    // Generate secure token for email actions
    const crypto = await import('crypto')
    const token = crypto.createHash('sha256')
      .update(`${donationData._id}-${process.env.EMAIL_ACTION_SECRET || 'default-secret'}`)
      .digest('hex')

    // Add token and donation ID to donation data for email template
    const emailData = {
      ...donationData,
      actionToken: token,
      donationId: donationData._id
    }

    // Send to all admin emails
    console.log('[mail] Sending to admin emails:', emailSettings.adminNotificationEmails)
    
    const promises = emailSettings.adminNotificationEmails.map(async (adminEmail: string) => {
      console.log('[mail] Sending admin notification to:', adminEmail)
      return transporter.sendMail({
        from,
        to: adminEmail,
        subject: emailSettings.adminNotificationSubject,
        text: renderAdminNotificationText(emailData),
        html: renderAdminNotificationHtml(emailData),
      })
    })

    await Promise.all(promises)
    console.log('[mail] Admin notifications sent successfully')
    return { queued: true }
  } catch (error) {
    console.error('[mail] Error sending admin notification:', error)
    console.error('[mail] Error details:', error instanceof Error ? error.message : String(error))
    return { queued: false, reason: 'send_failed' }
  }
}

function renderAdminNotificationText(donationData: any) {
  const donor = donationData.donor || {}
  const items = donationData.items || []
  
  return `
NEW DONATION RECEIVED - GEKCT Foundation

Donation Details:
- Reference: ${donationData.donationRef || 'N/A'}
- Donor: ${donor.name || 'N/A'}
- Email: ${donor.email || 'N/A'}
- Phone: ${donor.phone || 'Not provided'}
- Amount: ₹${donationData.totalAmount || 0}
- Date: ${donationData.createdAt ? new Date(donationData.createdAt).toLocaleDateString('en-IN') : 'N/A'}

Donation Items:
${items.map((item: any, index: number) => 
  `${index + 1}. ${item.categoryName || 'Unknown'} - ${item.quantity || 0} ${item.unit || ''} @ ₹${item.unitPrice || 0} = ₹${item.total || 0}`
).join('\n')}

${donor.message ? `Donor Message: "${donor.message}"` : ''}

Please verify the bank payment and approve/reject this donation in the admin panel.

GEKCT Foundation Admin Panel
  `
}

function renderAdminNotificationHtml(donationData: any) {
  const donor = donationData.donor || {}
  const items = donationData.items || []
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Donation Received - GEKCT Foundation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
          GEKCT Foundation
        </h1>
        <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 16px;">
          New Donation Received
        </p>
      </div>

      <!-- Alert Banner -->
      <div style="padding: 20px 30px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
        <div style="display: flex; align-items: center;">
          <div style="width: 12px; height: 12px; background-color: #f59e0b; border-radius: 50%; margin-right: 12px;"></div>
          <h2 style="color: #92400e; margin: 0; font-size: 18px; font-weight: 600;">
            🔔 Action Required: New Donation Received
          </h2>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px;">
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
            Donation Details
          </h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Reference Number</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600; font-family: 'Courier New', monospace;">${donationData.donationRef || 'N/A'}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Amount</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">₹${Number(donationData.totalAmount || 0).toFixed(2)}</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Donor Name</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${donor.name || 'N/A'}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Email</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${donor.email || 'N/A'}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Phone</p>
            <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${donor.phone || 'Not provided'}</p>
          </div>
          
          <div>
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Date</p>
            <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${donationData.createdAt ? new Date(donationData.createdAt).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'N/A'}</p>
          </div>
        </div>

        <!-- Donation Items -->
        <div style="margin: 24px 0;">
          <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Donation Items</h3>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 12px 16px; text-align: left; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Item</th>
                  <th style="padding: 12px 16px; text-align: center; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                  <th style="padding: 12px 16px; text-align: right; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Unit Price</th>
                  <th style="padding: 12px 16px; text-align: right; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item: any, index: number) => `
                <tr style="${index % 2 === 0 ? 'background-color: #ffffff;' : 'background-color: #f9fafb;'}">
                  <td style="padding: 12px 16px; color: #111827; font-size: 14px; border-bottom: 1px solid #f3f4f6;">${item.categoryName || 'Unknown'}</td>
                  <td style="padding: 12px 16px; text-align: center; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">${item.quantity || 0} ${item.unit || ''}</td>
                  <td style="padding: 12px 16px; text-align: right; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">₹${(item.unitPrice || 0).toFixed(2)}</td>
                  <td style="padding: 12px 16px; text-align: right; color: #111827; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f3f4f6;">₹${(item.total || 0).toFixed(2)}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Donor Message -->
        ${donor.message ? `
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h4 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Donor Message</h4>
          <p style="color: #92400e; font-size: 14px; margin: 0; font-style: italic;">"${donor.message}"</p>
        </div>
        ` : ''}

        <!-- Action Required -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
          <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 8px 0;">Action Required</h3>
          <p style="color: #e0e7ff; font-size: 16px; margin: 0 0 20px 0;">
            Verify bank payment and process this donation:
          </p>
          
          <!-- Action Buttons -->
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
            <!-- Confirm Amount Button -->
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email-actions/confirm?token=${donationData.actionToken}&donationId=${donationData.donationId}" 
               style="background: #f59e0b; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; min-width: 140px;">
              💰 CONFIRM AMOUNT
            </a>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.2); padding: 16px; border-radius: 6px;">
            <p style="color: #ffffff; font-size: 14px; margin: 0; font-weight: 600;">
              Or visit Admin Panel → Donations for detailed review
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This is an automated notification from GEKCT Foundation Admin System.
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>`
}

function renderText(data: TemplateData) {
  const action = data.status === 'approved' ? 'received' : data.status === 'rejected' ? 'rejected' : 'received'
  const statusText = data.status === 'approved' ? 'RECEIVED' : data.status === 'rejected' ? 'REJECTED' : 'RECEIVED'
  
  let text = `Dear ${data.donorName},\n\n`
  text += `Your donation has been ${action.toUpperCase()}!\n\n`
  text += `DONATION DETAILS:\n`
  text += `Reference Number: ${data.donationRef}\n`
  text += `Status: ${statusText}\n`
  text += `Date: ${data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN') : 'N/A'}\n`
  
  if (data.approvedAt) {
    text += `Received On: ${new Date(data.approvedAt).toLocaleDateString('en-IN')}\n`
  }
  
  text += `\nDONATION ITEMS:\n`
  if (data.items && data.items.length > 0) {
    data.items.forEach((item, index) => {
      text += `${index + 1}. ${item.categoryName}\n`
      text += `   Quantity: ${item.quantity} ${item.unit}\n`
      text += `   Unit Price: ₹${item.unitPrice}\n`
      text += `   Total: ₹${item.total}\n\n`
    })
  }
  
  text += `TOTAL AMOUNT: ₹${Number(data.totalAmount).toFixed(2)}\n\n`
  
  if (data.donorMessage) {
    text += `YOUR MESSAGE:\n"${data.donorMessage}"\n\n`
  }
  
  if (data.status === 'rejected') {
    text += `Thank you for your interest in supporting GEKCT Foundation. Unfortunately, we are unable to process your donation at this time. We appreciate your willingness to help and encourage you to try again in the future.\n\n`
  } else {
    text += `Thank you for your generous support to GEKCT Foundation. Your contribution helps us make a real difference in the community.\n\n`
  }
  text += `Warm regards,\n`
  text += `GEKCT Foundation Team\n`
  text += `Email: info@gekct.org\n`
  text += `Website: www.gekct.org`
  
  return text
}

function renderHtml(data: TemplateData) {
  const action = data.status === 'approved' ? 'received' : data.status === 'rejected' ? 'rejected' : 'received'
  const statusText = data.status === 'approved' ? 'RECEIVED' : data.status === 'rejected' ? 'REJECTED' : 'RECEIVED'
  const statusColor = data.status === 'approved' ? '#10B981' : data.status === 'rejected' ? '#EF4444' : '#F59E0B'
  const statusBgColor = data.status === 'approved' ? '#D1FAE5' : data.status === 'rejected' ? '#FEE2E2' : '#FEF3C7'
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Confirmation - GEKCT Foundation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
          GEKCT Foundation
        </h1>
        <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">
          Making a Difference Together
        </p>
      </div>

      <!-- Status Banner -->
      <div style="padding: 20px 30px; background-color: ${statusBgColor}; border-left: 4px solid ${statusColor};">
        <div style="display: flex; align-items: center; justify-content: center;">
          <div style="width: 12px; height: 12px; background-color: ${statusColor}; border-radius: 50%; margin-right: 12px;"></div>
          <h2 style="color: ${statusColor}; margin: 0; font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
            Donation ${statusText}
          </h2>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px;">
        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          Dear <strong>${escapeHtml(data.donorName)}</strong>,
        </p>
        
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
          ${data.status === 'rejected' 
            ? 'Thank you for your generous contribution to GEKCT Foundation. Unfortunately, we are unable to process your donation at this time. We appreciate your interest in supporting our cause and encourage you to try again in the future.'
            : 'Thank you for your generous contribution to GEKCT Foundation. Your donation has been received and we are grateful for your support in making a positive impact in our community.'
          }
        </p>

        <!-- Donation Details Card -->
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
            Donation Details
          </h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Reference Number</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600; font-family: 'Courier New', monospace;">${escapeHtml(data.donationRef)}</p>
            </div>
            <div>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Date</p>
              <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'N/A'}</p>
            </div>
          </div>
          
          ${data.approvedAt ? `
          <div style="margin-bottom: 16px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0; font-weight: 500;">Received On</p>
            <p style="color: #111827; font-size: 16px; margin: 0; font-weight: 600;">${new Date(data.approvedAt).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          ` : ''}
        </div>

        <!-- Donation Items -->
        ${data.items && data.items.length > 0 ? `
        <div style="margin: 24px 0;">
          <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Donation Items</h3>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f9fafb;">
                  <th style="padding: 12px 16px; text-align: left; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Item</th>
                  <th style="padding: 12px 16px; text-align: center; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Quantity</th>
                  <th style="padding: 12px 16px; text-align: right; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Unit Price</th>
                  <th style="padding: 12px 16px; text-align: right; color: #374151; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${data.items.map((item, index) => `
                <tr style="${index % 2 === 0 ? 'background-color: #ffffff;' : 'background-color: #f9fafb;'}">
                  <td style="padding: 12px 16px; color: #111827; font-size: 14px; border-bottom: 1px solid #f3f4f6;">${escapeHtml(item.categoryName)}</td>
                  <td style="padding: 12px 16px; text-align: center; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">${item.quantity} ${escapeHtml(item.unit)}</td>
                  <td style="padding: 12px 16px; text-align: right; color: #6b7280; font-size: 14px; border-bottom: 1px solid #f3f4f6;">₹${item.unitPrice.toFixed(2)}</td>
                  <td style="padding: 12px 16px; text-align: right; color: #111827; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f3f4f6;">₹${item.total.toFixed(2)}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ` : ''}

        <!-- Total Amount -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: #e0e7ff; font-size: 16px; margin: 0 0 8px 0; font-weight: 500;">Total Donation Amount</p>
          <p style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; font-family: 'Courier New', monospace;">₹${Number(data.totalAmount).toFixed(2)}</p>
        </div>

        <!-- Donor Message -->
        ${data.donorMessage ? `
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h4 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Your Message</h4>
          <p style="color: #92400e; font-size: 14px; margin: 0; font-style: italic;">"${escapeHtml(data.donorMessage)}"</p>
        </div>
        ` : ''}

        <!-- Thank You Message -->
        <div style="text-align: center; margin: 32px 0;">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
            Your generous contribution helps us continue our mission to make a positive impact in the community. 
            Every donation, no matter the size, makes a real difference.
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            We will keep you updated on how your donation is being used to create positive change.
          </p>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
          <p style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Warm regards,</p>
          <p style="color: #374151; font-size: 16px; margin: 0 0 16px 0;">GEKCT Foundation Team</p>
          
          <div style="display: flex; justify-content: center; gap: 24px; margin: 16px 0;">
            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px 0; font-weight: 500;">Email</p>
              <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 500;">info@gekct.org</p>
            </div>
            <div style="text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px 0; font-weight: 500;">Website</p>
              <p style="color: #1e40af; font-size: 14px; margin: 0; font-weight: 500;">www.gekct.org</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`
}

function escapeHtml(str: string) {
  return String(str).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'} as any)[c])
}

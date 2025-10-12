
interface SendOptions {
  to: string
  subject: string
}

interface TemplateData {
  donorName: string
  donationRef: string
  totalAmount: number
  status: 'approved' | 'pending' | 'rejected'
}

export async function sendDonationEmail(opts: SendOptions, data: TemplateData) {
  // Support both SMTP_* and EMAIL_* envs. If EMAIL_* is present, assume Gmail SMTP.
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  const hasEmail = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)

  // Build config
  const from = process.env.MAIL_FROM || process.env.SMTP_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@example.com'
  const host = hasSmtp ? process.env.SMTP_HOST! : (hasEmail ? 'smtp.gmail.com' : undefined)
  const port = hasSmtp ? Number(process.env.SMTP_PORT || 587) : (hasEmail ? 465 : undefined)
  const secure = hasSmtp ? Boolean(process.env.SMTP_SECURE === 'true') : (hasEmail ? true : false)
  const user = hasSmtp ? process.env.SMTP_USER! : (hasEmail ? process.env.EMAIL_USER! : undefined)
  const pass = hasSmtp ? process.env.SMTP_PASS! : (hasEmail ? process.env.EMAIL_PASS! : undefined)

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

function renderText(data: TemplateData) {
  const action = data.status === 'approved' ? 'approved' : data.status === 'rejected' ? 'rejected' : 'received'
  return `Dear ${data.donorName},\n\nWe have ${action} your donation (Ref: ${data.donationRef}).\nTotal Amount: ₹${data.totalAmount}\n\nThank you for supporting GEKCT Foundation.\n\nWarm regards,\nGEKCT Foundation`
}

function renderHtml(data: TemplateData) {
  const action = data.status === 'approved' ? 'approved' : data.status === 'rejected' ? 'rejected' : 'received'
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
    <p>Dear ${escapeHtml(data.donorName)},</p>
    <p>We have <strong>${escapeHtml(action)}</strong> your donation.</p>
    <p><strong>Reference:</strong> ${escapeHtml(data.donationRef)}<br/>
       <strong>Total Amount:</strong> ₹${Number(data.totalAmount).toFixed(2)}</p>
    <p>Thank you for supporting GEKCT Foundation.</p>
    <p>Warm regards,<br/>GEKCT Foundation</p>
  </div>`
}

function escapeHtml(str: string) {
  return String(str).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'} as any)[c])
}

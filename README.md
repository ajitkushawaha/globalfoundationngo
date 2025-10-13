This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# globalfoundationngo
# Production Deployment Wed Oct  8 03:28:27 IST 2025

## Email/SMTP Setup

This project can send emails to donors when a donation is approved or rejected. You can configure it in two ways:

1) Simple Gmail setup (recommended)
- EMAIL_USER: Your Gmail address (must allow app passwords)
- EMAIL_PASS: A Gmail App Password (16 characters) created at https://myaccount.google.com/apppasswords
- EMAIL_FROM (optional): Custom "From" name/address, e.g. GEKCT <no-reply@gekct.org>

Example .env:
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_char_app_password
# EMAIL_FROM="GEKCT Foundation" <yourgmail@gmail.com>

Notes for Gmail:
- App Passwords require 2‑Step Verification on your Google account.
- Do not use your normal Gmail password; generate an App Password.
- The code will automatically use smtp.gmail.com:465 (secure) when EMAIL_* is set.

2) Custom SMTP server (if you have your own mail server)
- SMTP_HOST: e.g. smtp.yourdomain.com
- SMTP_PORT: e.g. 465 (secure) or 587 (STARTTLS)
- SMTP_USER, SMTP_PASS: your SMTP credentials
- SMTP_SECURE: 'true' for port 465, 'false' for 587
- SMTP_FROM or EMAIL_FROM (optional): From address to display

Example .env:
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=user@yourdomain.com
SMTP_PASS=your_smtp_password
# SMTP_FROM="GEKCT Foundation" <no-reply@yourdomain.com>

How it works
- If EMAIL_USER and EMAIL_PASS are present, the app uses Gmail SMTP automatically.
- Otherwise, if SMTP_* variables are present, those are used.
- If neither is set, the app logs that mail is not configured and continues without sending.

Testing email
- Start the dev server, then open:
  http://localhost:3000/api/test-email?to=youraddress@example.com
- You should receive a test message. The endpoint will report success or the reason (e.g., smtp_not_configured).

Security tips
- Never commit real secrets to Git. Keep them only in .env.local on your machine or as environment variables on your server/hosting.
- For production, set the variables in your hosting provider's env settings.

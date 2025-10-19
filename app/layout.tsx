import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://gekct.org'),
  title: {
    default: 'Global Education and Charitable Trust',
    template: '%s | GEKCT'
  },
  description: 'Transforming lives through education, skills, and social empowerment. Join our mission to create positive change in education, animal welfare, and community development.',
  keywords: ['education', 'charity', 'NGO', 'Gujarat', 'India', 'volunteer', 'donation', 'social work'],
  authors: [{ name: 'Global Education and Charitable Trust' }],
  creator: 'GEKCT',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://gekct.org',
    siteName: 'Global Education and Charitable Trust',
    title: 'Global Education and Charitable Trust',
    description: 'Transforming lives through education, skills, and social empowerment.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Education and Charitable Trust',
    description: 'Transforming lives through education, skills, and social empowerment.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '1JVDJsX65wlqktfa7G9rWyWi2K9tHMC5A0WC4TsEOoo',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

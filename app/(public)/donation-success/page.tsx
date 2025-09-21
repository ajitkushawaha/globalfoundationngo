"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, Share2, Download, ArrowLeft } from "lucide-react"

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [donationData, setDonationData] = useState<any>(null)

  useEffect(() => {
    // Get donation data from URL params or localStorage
    const paymentId = searchParams.get('payment_id')
    const orderId = searchParams.get('order_id')
    const amount = searchParams.get('amount')
    
    if (paymentId && orderId && amount) {
      setDonationData({
        paymentId,
        orderId,
        amount: parseInt(amount),
        timestamp: new Date().toLocaleString()
      })
    }
  }, [searchParams])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just made a donation to GEKCT',
        text: `I donated ₹${donationData?.amount} to support education, animal welfare, and community development. Join me in making a difference!`,
        url: window.location.origin
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I donated ₹${donationData?.amount} to GEKCT! Join me in making a difference: ${window.location.origin}`
      navigator.clipboard.writeText(shareText)
      alert('Share text copied to clipboard!')
    }
  }

  const handleDownloadReceipt = () => {
    // In a real implementation, you would generate a PDF receipt
    alert('Receipt download feature will be implemented soon!')
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <Badge variant="secondary" className="mb-4">
                Payment Successful
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
                Thank You for Your
                <span className="text-primary"> Generous Donation!</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your contribution will make a real difference in someone's life.
              </p>
            </div>

            {/* Donation Details */}
            {donationData && (
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Donation Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Payment ID</span>
                      <span className="font-mono text-sm">{donationData.paymentId}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Order ID</span>
                      <span className="font-mono text-sm">{donationData.orderId}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-2xl font-bold text-primary">₹{donationData.amount}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="text-sm">{donationData.timestamp}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Impact Message */}
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Your Impact</h3>
                <p className="text-muted-foreground mb-6">
                  With your donation, we can provide essential support to those in need. 
                  You'll receive updates on how your contribution is being used to make a difference.
                </p>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm font-medium">
                    "Every donation, no matter the size, creates ripples of positive change in our community."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Impact
              </Button>
              <Button onClick={handleDownloadReceipt} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => router.push('/')} 
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

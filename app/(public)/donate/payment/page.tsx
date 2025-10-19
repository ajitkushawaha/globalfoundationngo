"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle2, Banknote, QrCode, ArrowLeft } from "lucide-react"

interface OrganizationSettings {
  organizationName: string
  bankDetails: {
    accountName: string
    accountNumber: string
    ifscCode: string
    bankName: string
    branch: string
    upiId: string
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text)
}

export default function PaymentPage() {
  const params = useSearchParams()
  const router = useRouter()
  const amount = params.get("amount") || "0"
  const donationId = params.get("donationId") || ""
  
  const [orgSettings, setOrgSettings] = useState<OrganizationSettings | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch organization settings
  useEffect(() => {
    const fetchOrgSettings = async () => {
      try {
        const response = await fetch('/api/organization-settings')
        const data = await response.json()
        if (data.success) {
          setOrgSettings(data.data)
        }
      } catch (error) {
        console.error('Error fetching organization settings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrgSettings()
  }, [])

  // Fallback organization details if API fails
  const org = useMemo(() => {
    if (orgSettings) {
      return {
        name: orgSettings.organizationName,
        upiId: orgSettings.bankDetails.upiId,
        accountName: orgSettings.bankDetails.accountName,
        accountNumber: orgSettings.bankDetails.accountNumber,
        ifsc: orgSettings.bankDetails.ifscCode,
        bank: orgSettings.bankDetails.bankName,
        branch: orgSettings.bankDetails.branch
      }
    }
    
    // Fallback to hardcoded values
    return {
      name: "Global Education and Charitable Trust",
      upiId: "50050505@kotak",
      accountName: "Global Education and Charitable Trust",
      accountNumber: "9551204332",
      ifsc: "KKBK0000838",
      bank: "Kotak Mahindra Bank",
      branch: "NARANPURA"
    }
  }, [orgSettings])

  const upiLink = useMemo(() => {
    const pn = encodeURIComponent(org.name)
    const pa = encodeURIComponent(org.upiId)
    const am = encodeURIComponent(amount)
    const tn = encodeURIComponent(`Donation ${donationId ? `#${donationId}` : ""}`.trim())
    return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR&tn=${tn}`
  }, [amount, donationId, org.name, org.upiId])

  const qrUrl = useMemo(() => {
    // Public QR generator for convenience; replace with a hosted static QR if preferred
    const data = encodeURIComponent(upiLink)
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${data}`
  }, [upiLink])

  if (loading) {
    return (
      <PublicLayout>
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4 mx-auto w-64"></div>
                <div className="h-12 bg-gray-300 rounded mb-6 mx-auto w-96"></div>
                <div className="h-4 bg-gray-300 rounded mb-8 mx-auto w-48"></div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-3">Complete Your Donation</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4">
              Choose a Payment Method
            </h1>
            <p className="text-muted-foreground text-lg">
              Total payable amount
              <span className="font-semibold text-primary"> ₹{amount}</span>
              {donationId && (
                <span className="ml-2 text-sm text-muted-foreground">(Ref: {donationId})</span>
              )}
            </p>
            <div className="mt-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* UPI / QR */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Pay via UPI</h3>
                </div>

                <div className="flex flex-col items-center text-center">
                  <img src={qrUrl} alt="UPI QR Code" className="w-60 h-60 rounded-lg border mb-4" />
                  <a href={upiLink} className="text-primary underline mb-2" target="_blank" rel="noopener noreferrer">
                    Open in your UPI app
                  </a>
                  <div className="flex items-center space-x-2 bg-muted/50 rounded px-3 py-2">
                    <span className="font-mono text-sm">{org.upiId}</span>
                    <button onClick={() => copyToClipboard(org.upiId)} className="text-xs text-primary flex items-center">
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Transfer */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Banknote className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Bank Transfer</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Account Name</div>
                      <div className="font-medium">{org.accountName}</div>
                    </div>
                    <button onClick={() => copyToClipboard(org.accountName)} className="text-xs text-primary flex items-center">
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Account Number</div>
                      <div className="font-medium">{org.accountNumber}</div>
                    </div>
                    <button onClick={() => copyToClipboard(org.accountNumber)} className="text-xs text-primary flex items-center">
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">IFSC Code</div>
                      <div className="font-medium">{org.ifsc}</div>
                    </div>
                    <button onClick={() => copyToClipboard(org.ifsc)} className="text-xs text-primary flex items-center">
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Bank & Branch</div>
                      <div className="font-medium">{org.bank} • {org.branch}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                  <p className="text-sm text-muted-foreground">
                    After making the payment, please keep a screenshot or transaction reference. Our team will contact you shortly to confirm your donation and share an acknowledgment. If needed, you can reply to our confirmation email with the proof of payment.
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => router.push("/")}>Go to Home</Button>
                  <Button variant="outline" onClick={() => router.push("/donate")}>Make Another Donation</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

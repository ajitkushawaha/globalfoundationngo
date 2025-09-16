"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Heart, CheckCircle, Shield } from "lucide-react"

export function DonationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [donationType, setDonationType] = useState("one-time")
  const [selectedAmount, setSelectedAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")

  const predefinedAmounts = ["1000", "2000", "4000", "10000", "20000", "50000"]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h3>
          <p className="text-muted-foreground mb-6">
            Your generous contribution of ₹{selectedAmount || customAmount} has been processed successfully. You&apos;ll
            receive a confirmation email shortly with your donation receipt.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Your donation will help us continue our mission of education, animal welfare, and community development.
              Every dollar makes a difference!
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setSelectedAmount("")
              setCustomAmount("")
            }}
          >
            Make Another Donation
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs value={donationType} onValueChange={setDonationType} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Giving</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">
                {donationType === "monthly" ? "Monthly Donation Amount" : "Donation Amount"}
              </Label>

              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount("")
                    }}
                    className="h-12"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
 
              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="customAmount"
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    className="pl-8"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount("")
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Fund Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Choose Fund</Label>
              <Select name="fund" defaultValue="general">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Fund - Where needed most</SelectItem>
                  <SelectItem value="education">Education Fund</SelectItem>
                  <SelectItem value="animal">Animal Welfare Fund</SelectItem>
                  <SelectItem value="environment">Environmental Fund</SelectItem>
                  <SelectItem value="elderly">Elderly Care Fund</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Donor Information</Label>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </Label>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiry">Expiry Date *</Label>
                  <Input id="expiry" name="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input id="cvv" name="cvv" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input id="cardName" name="cardName" required />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="anonymous" name="anonymous" />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="updates" name="updates" defaultChecked />
                <Label htmlFor="updates" className="text-sm">
                  Send me updates about how my donation is being used
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" name="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and privacy policy *
                </Label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Secure Donation</p>
                <p className="text-muted-foreground">
                  Your payment information is encrypted and secure. We never store your credit card details.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={isLoading || (!selectedAmount && !customAmount)}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing Donation...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Donate ₹{selectedAmount || customAmount || "0"}
                  {donationType === "monthly" && "/month"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

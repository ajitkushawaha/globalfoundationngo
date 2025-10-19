"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Heart, Loader2 } from "lucide-react"

interface DonationItem {
  categoryId: string
  categoryName: string
  unit: string
  quantity: number
  unitPrice: number
  total: number
}

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  donationItems: DonationItem[]
  totalAmount: number
  onDonate: (donorData: DonorData) => void
  loading: boolean
}

interface DonorData {
  name: string
  email: string
  phone: string
  instagram: string
  message: string
  anonymous: boolean
}

export function DonationModal({ 
  isOpen, 
  onClose, 
  donationItems, 
  totalAmount, 
  onDonate, 
  loading 
}: DonationModalProps) {
  const [formData, setFormData] = useState<DonorData>({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    message: "",
    anonymous: false
  })

  // Debug: Log formData changes
  React.useEffect(() => {
    console.log('Form data changed:', formData)
  }, [formData])

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }


  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onDonate(formData)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Complete Your Donation</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Donation Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Your Donation Summary</h3>
            <div className="space-y-2">
              {donationItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.categoryName} x{item.quantity} {item.unit}s</span>
                  <span className="font-medium">₹{item.total}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="instagram">Instagram Username (Optional)</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Enter your Instagram username (without @)"
                className={errors.instagram ? "border-red-500" : ""}
              />
              {errors.instagram && (
                <p className="text-sm text-red-500 mt-1">{errors.instagram}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                We'll tag you in our social media posts about your donation impact
              </p>
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Add a personal message for the beneficiaries"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={formData.anonymous}
                onCheckedChange={(checked) => {
                  console.log('Checkbox changed:', checked)
                  setFormData(prev => ({
                    ...prev,
                    anonymous: checked as boolean
                  }))
                }}
              />
              <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                Donate anonymously (your name won't be shown publicly)
                <span className="ml-2 text-xs text-muted-foreground">
                  {formData.anonymous ? '(✓ Selected)' : '(Not selected)'}
                </span>
              </Label>
            </div>
            
            {formData.anonymous && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <p className="text-sm text-blue-700">
                  ✓ Your donation will be processed anonymously. Your name will not appear in public donor lists.
                </p>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Donate ₹{totalAmount}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

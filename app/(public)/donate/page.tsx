"use client"

import { useState, useEffect } from "react"
import { PublicLayout } from "@/components/public-layout"
import { DonationModal } from "@/components/donation-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  BookOpen,
  Utensils,
  GraduationCap,
  PawPrint,
  Users,
  Target,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  Stethoscope,
  Baby,
  Camera,
  Gift,
  PartyPopper,
  X,
  Sparkles
} from "lucide-react"
import Image from "next/image"

interface DonationCategory {
  id: string
  name: string
  description: string
  unitPrice: number
  unit: string
  icon: any
  color: string
  bgColor: string
  currentFunded: number
  targetGoal: number
  donors: number
}

interface DonorData {
  name: string
  email: string
  phone: string
  message: string
  anonymous: boolean
}

export default function DonatePage() {
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [donationCategories, setDonationCategories] = useState<DonationCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [recentDonors, setRecentDonors] = useState<string[] | null>(null)
  const [congratulations, setCongratulations] = useState<{[key: string]: boolean}>({})
  const [congratulationsTimeout, setCongratulationsTimeout] = useState<{[key: string]: NodeJS.Timeout}>({})
  const [fireworks, setFireworks] = useState<{[key: string]: boolean}>({})
  const [particles, setParticles] = useState<{[key: string]: Array<{id: number, x: number, y: number, vx: number, vy: number, life: number}>}>({})

  // Load donation categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/donation-categories?active=true')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setDonationCategories(data.data)
          }
        }
      } catch (error) {
        console.error('Error loading donation categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Load recent donors (approved). Falls back to static list if API fails
  useEffect(() => {
    const loadDonors = async () => {
      try {
        const res = await fetch('/api/recent-donors?limit=12', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (data?.success && Array.isArray(data.data)) {
          setRecentDonors(data.data.map((d: any) => d.name))
        }
      } catch (e) {
        // ignore
      }
    }
    loadDonors()
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(congratulationsTimeout).forEach(timeout => {
        clearTimeout(timeout)
      })
    }
  }, [congratulationsTimeout])

  // Fallback categories if API fails
  const fallbackCategories: DonationCategory[] = [
    {
      id: "food-for-needy",
      name: "Food for Needy",
      description: "Provide nutritious meals to hungry families",
      unitPrice: 50,
      unit: "meal",
      icon: Utensils,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      currentFunded: 72,
      targetGoal: 100,
      donors: 15
    },
    {
      id: "books-for-children",
      name: "Books for Children",
      description: "Educational books for underprivileged students",
      unitPrice: 200,
      unit: "book",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      currentFunded: 45,
      targetGoal: 100,
      donors: 12
    },
    {
      id: "animal-care",
      name: "Animal Care",
      description: "Vaccination and medical care for stray animals",
      unitPrice: 300,
      unit: "vaccination",
      icon: PawPrint,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      currentFunded: 28,
      targetGoal: 50,
      donors: 8
    },
    {
      id: "school-support",
      name: "School Support",
      description: "Complete student kit with supplies and uniform",
      unitPrice: 500,
      unit: "student kit",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
      currentFunded: 15,
      targetGoal: 30,
      donors: 5
    },
    {
      id: "girl-education",
      name: "Girl Education Support",
      description: "Monthly education support for girl students",
      unitPrice: 1000,
      unit: "month",
      icon: Baby,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      currentFunded: 8,
      targetGoal: 20,
      donors: 3
    },
    {
      id: "elderly-care",
      name: "Elderly Care Package",
      description: "Monthly care package for elderly citizens",
      unitPrice: 800,
      unit: "package",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      currentFunded: 12,
      targetGoal: 25,
      donors: 4
    }
  ]

  // Use dynamic categories or fallback, and normalize IDs to avoid undefined keys causing all items to increment together
  const categoriesToUseRaw = donationCategories.length > 0 ? donationCategories : fallbackCategories
  const categoriesToUse = categoriesToUseRaw.map((c, idx) => {
    const slugFromName = c.name ? c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''
    const safeId = (c as any).slug?.trim?.()
      || (c.id && String(c.id).trim().length > 0 && String(c.id))
      || slugFromName
      || `cat-${idx}`
    return { ...c, id: safeId }
  })

  const updateQuantity = (categoryId: string, change: number) => {
    setSelectedItems(prev => {
      const newQuantity = Math.max(0, (prev[categoryId] || 0) + change)
      const newItems = { ...prev }
      if (newQuantity === 0) {
        delete newItems[categoryId]
      } else {
        newItems[categoryId] = newQuantity
      }
      
      // Calculate total amount
      let total = 0
      Object.entries(newItems).forEach(([id, quantity]) => {
        const category = categoriesToUse.find(c => c.id === id)
        if (category) {
          total += category.unitPrice * quantity
        }
      })
      setTotalAmount(total)
      
      // Check for congratulations (temporary progress)
      const category = categoriesToUse.find(c => c.id === categoryId)
      if (category && newQuantity > 0) {
        const tempProgress = (category.currentFunded + newQuantity) / category.targetGoal
        if (tempProgress >= 1) {
          // Show congratulations
          setCongratulations(prev => ({ ...prev, [categoryId]: true }))
          
          // Create fireworks and particles
          createFireworks(categoryId)
          
          // Play success sound
          try {
            // Create a more celebratory sound using Web Audio API
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            
            // Create a chord progression for celebration
            const frequencies = [523.25, 659.25, 783.99] // C, E, G
            frequencies.forEach((freq, index) => {
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()
              
              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)
              
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1)
              oscillator.frequency.setValueAtTime(freq * 1.2, audioContext.currentTime + index * 0.1 + 0.1)
              
              gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.5)
              
              oscillator.start(audioContext.currentTime + index * 0.1)
              oscillator.stop(audioContext.currentTime + index * 0.1 + 0.5)
            })
          } catch (e) {
            // Ignore audio errors
          }
          
          // Clear any existing timeout for this category
          if (congratulationsTimeout[categoryId]) {
            clearTimeout(congratulationsTimeout[categoryId])
          }
          
          // Set timeout to hide congratulations after 5 minutes
          const timeout = setTimeout(() => {
            setCongratulations(prev => ({ ...prev, [categoryId]: false }))
            setFireworks(prev => ({ ...prev, [categoryId]: false }))
            setParticles(prev => ({ ...prev, [categoryId]: [] }))
          }, 300000) // 5 minutes
          
          setCongratulationsTimeout(prev => ({ ...prev, [categoryId]: timeout }))
        }
      }
      
      return newItems
    })
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const hideCongratulations = (categoryId: string) => {
    setCongratulations(prev => ({ ...prev, [categoryId]: false }))
    setFireworks(prev => ({ ...prev, [categoryId]: false }))
    setParticles(prev => ({ ...prev, [categoryId]: [] }))
    if (congratulationsTimeout[categoryId]) {
      clearTimeout(congratulationsTimeout[categoryId])
      setCongratulationsTimeout(prev => {
        const newTimeouts = { ...prev }
        delete newTimeouts[categoryId]
        return newTimeouts
      })
    }
  }

  const createFireworks = (categoryId: string) => {
    // Show fireworks
    setFireworks(prev => ({ ...prev, [categoryId]: true }))
    
    // Create particles
    const newParticles: Array<{id: number, x: number, y: number, vx: number, vy: number, life: number}> = []
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50
      const velocity = 2 + Math.random() * 3
      newParticles.push({
        id: i,
        x: 50, // Center of the card
        y: 50,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1.0
      })
    }
    setParticles(prev => ({ ...prev, [categoryId]: newParticles }))
    
    // Animate particles
    const animateParticles = () => {
      setParticles(prev => {
        const currentParticles = prev[categoryId] || []
        const updatedParticles = currentParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // Gravity
            life: particle.life - 0.02
          }))
          .filter(particle => particle.life > 0)
        
        if (updatedParticles.length > 0) {
          setTimeout(animateParticles, 50)
        }
        
        return { ...prev, [categoryId]: updatedParticles }
      })
    }
    
    setTimeout(animateParticles, 50)
    
    // Hide fireworks after 3 seconds
    setTimeout(() => {
      setFireworks(prev => ({ ...prev, [categoryId]: false }))
    }, 3000)
  }

  const handleProceedToDonate = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert('Please select at least one donation item.')
      return
    }
    setShowDonationModal(true)
  }

  const handleDonate = async (donorData: DonorData) => {
    setIsProcessing(true)
    
    try {
      // Prepare donation data
      const donationItems = Object.entries(selectedItems).map(([categoryId, quantity]) => {
        const category = categoriesToUse.find(c => c.id === categoryId)
        return {
          categoryId,
          categoryName: category?.name || '',
          unit: category?.unit || '',
          quantity,
          unitPrice: category?.unitPrice || 0,
          total: (category?.unitPrice || 0) * quantity
        }
      })

      // Submit donation data to API
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donor: donorData,
          items: donationItems,
          totalAmount,
          status: 'pending'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Redirect to payment page with amount and donationId
          const donationId = encodeURIComponent(result.donationId || '')
          const amount = encodeURIComponent(String(totalAmount))
          window.location.href = `/donate/payment?amount=${amount}&donationId=${donationId}`
          return
        } else {
          throw new Error(result.error || 'Failed to submit donation')
        }
      } else {
        throw new Error('Failed to submit donation')
      }

    } catch (error) {
      console.error('Donation error:', error)
      // Hide congratulations on donation failure
      Object.keys(selectedItems).forEach(categoryId => {
        hideCongratulations(categoryId)
      })
      alert('Failed to submit donation. Please try again or contact us directly.')
    } finally {
      setIsProcessing(false)
      setShowDonationModal(false)
    }
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Smart Donation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Donate with
              <span className="text-primary"> Purpose & Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Choose exactly what you want to donate. See your impact in real-time. 
              Every donation is tracked and delivered with your name to those in need.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                How Smart Donation Works
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Choose Your Impact</h3>
                  <p className="text-muted-foreground">
                    Select specific items you want to donate - meals, books, medical care, or education support.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Submit Your Donation</h3>
                  <p className="text-muted-foreground">
                    Fill in your details and submit your donation. We'll contact you for payment details.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. See Results</h3>
                  <p className="text-muted-foreground">
                    Get updates with photos and stories showing how your donation made a difference.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Choose Your Donation Category
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the cause you want to support. Each donation is tracked and delivered with transparency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                categoriesToUse.map((category) => {
                const IconComponent = category.icon
                const progress = getProgressPercentage(category.currentFunded, category.targetGoal)
                const quantity = selectedItems[category.id] || 0
                
                return (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow relative overflow-hidden">
                    {/* Fireworks Overlay */}
                    {fireworks[category.id] && (
                      <div className="absolute inset-0 pointer-events-none z-10">
                        {/* Main firework burst */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full firework-burst"></div>
                          <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full absolute top-1 left-1 firework-burst animation-delay-100"></div>
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full absolute top-2 left-2 firework-burst animation-delay-200"></div>
                        </div>
                        
                        {/* Secondary bursts */}
                        <div className="absolute top-1/4 left-1/4">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full firework-burst animation-delay-300"></div>
                        </div>
                        <div className="absolute top-3/4 right-1/4">
                          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full firework-burst animation-delay-400"></div>
                        </div>
                        <div className="absolute top-1/3 right-1/3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full firework-burst animation-delay-500"></div>
                        </div>
                        <div className="absolute bottom-1/4 left-1/3">
                          <div className="w-7 h-7 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full firework-burst animation-delay-200"></div>
                        </div>
                        <div className="absolute top-1/2 right-1/2">
                          <div className="w-5 h-5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full firework-burst animation-delay-400"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Particle Effects */}
                    {particles[category.id] && particles[category.id].length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-20">
                        {particles[category.id].map((particle) => (
                          <div
                            key={particle.id}
                            className="absolute w-2 h-2 rounded-full sparkle-twinkle"
                            style={{
                              left: `${particle.x}%`,
                              top: `${particle.y}%`,
                              opacity: particle.life,
                              transform: `scale(${particle.life}) rotate(${particle.id * 10}deg)`,
                              background: `linear-gradient(45deg, 
                                hsl(${particle.id * 36}, 70%, 60%), 
                                hsl(${(particle.id * 36 + 60) % 360}, 70%, 60%))`,
                              animationDelay: `${particle.id * 0.05}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    <CardContent className="p-6 relative z-30">
                      <div className="text-center mb-4">
                        <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className={`w-8 h-8 ${category.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="text-2xl font-bold text-primary mb-2">₹{category.unitPrice}</div>
                        <div className="text-sm text-muted-foreground">per {category.unit}</div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{category.currentFunded}/{category.targetGoal} {category.unit}s</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-center text-xs text-muted-foreground mt-1">
                          {Math.round(progress)}% funded • {category.donors} donors
                        </div>
                      </div>

                      {/* Congratulations Banner */}
                      {congratulations[category.id] && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-300 rounded-lg animate-pulse relative overflow-hidden">
                          {/* Sparkle effects */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-2 left-2">
                              <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" />
                            </div>
                            <div className="absolute top-3 right-3">
                              <Sparkles className="w-2 h-2 text-orange-400 animate-bounce" />
                            </div>
                            <div className="absolute bottom-2 left-4">
                              <Sparkles className="w-2 h-2 text-pink-400 animate-ping" />
                            </div>
                            <div className="absolute bottom-3 right-2">
                              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center space-x-2 relative z-10">
                            <div className="flex space-x-1">
                              <PartyPopper className="w-5 h-5 text-green-600 animate-bounce" />
                              <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                            </div>
                            <span className="text-green-800 font-bold text-sm bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              🎉 TARGET REACHED! Pending payment...
                            </span>
                            <button
                              onClick={() => hideCongratulations(category.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <button
                          onClick={() => updateQuantity(category.id, -1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                          disabled={quantity === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(category.id, 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {quantity > 0 && (
                        <div className="text-center text-sm font-medium text-primary mb-3">
                          Total: ₹{category.unitPrice * quantity}
                        </div>
                      )}

                      <Button 
                        className="w-full" 
                        variant={quantity > 0 ? "default" : "outline"}
                        onClick={() => updateQuantity(category.id, 1)}
                      >
                        {quantity > 0 ? `Add More ${category.unit}s` : `Donate ${category.unit}s`}
                      </Button>
                    </CardContent>
                  </Card>
                )
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {Object.keys(selectedItems).length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="sticky top-4 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Your Donation Cart</h3>
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {Object.entries(selectedItems).map(([categoryId, quantity]) => {
                      const category = categoriesToUse.find(c => c.id === categoryId)
                      if (!category) return null
                      
                      return (
                        <div key={categoryId} className="flex justify-between items-center py-3 border-b">
                          <div>
                            <span className="font-medium">{category.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">x{quantity} {category.unit}s</span>
                          </div>
                          <span className="font-semibold">₹{category.unitPrice * quantity}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold mb-6">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{totalAmount}</span>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleProceedToDonate}
                      disabled={isProcessing}
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      {isProcessing ? 'Processing...' : 'Submit Donation'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedItems({})
                        setTotalAmount(0)
                      }}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Recent Impact Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Recent Impact Stories
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground">
                See how your donations are making a real difference in people's lives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <Utensils className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Food Distribution Drive</h3>
                      <p className="text-sm text-muted-foreground">Last Week • Ahmedabad</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Thanks to 25 donors, we provided 150 meals to families in need. 
                    Each meal was delivered with the donor's name and a message of hope."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-primary">
                      ₹7,500 raised • 150 meals provided
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Camera className="w-3 h-3 mr-1" />
                      View Photos
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">School Book Drive</h3>
                      <p className="text-sm text-muted-foreground">This Month • Vadodara</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "15 donors contributed to provide 50 educational books to students. 
                    Each book has a sticker with the donor's name and encouragement message."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-primary">
                      ₹10,000 raised • 50 books donated
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Camera className="w-3 h-3 mr-1" />
                      View Photos
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Donor Wall */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Generous Donors
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground">
                Thank you to all our donors who are making a difference
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {(recentDonors || [
                "Rajesh Patel", "Priya Sharma", "Amit Kumar", "Sunita Devi", 
                "Vikram Singh", "Anita Joshi", "Rahul Mehta", "Kavita Patel",
                "Anonymous", "Suresh Gupta", "Meera Shah", "Anonymous"
              ]).map((name, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-sm font-medium">{name}</div>
                    <div className="text-xs text-muted-foreground">Recent Donor</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal (reusable) */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        donationItems={Object.entries(selectedItems).map(([categoryId, quantity]) => {
          const category = categoriesToUse.find(c => c.id === categoryId)
          return {
            categoryId,
            categoryName: category?.name || '',
            unit: category?.unit || '',
            quantity,
            unitPrice: category?.unitPrice || 0,
            total: (category?.unitPrice || 0) * quantity
          }
        })}
        totalAmount={totalAmount}
        onDonate={handleDonate}
        loading={isProcessing}
      />
    </PublicLayout>
  )
}
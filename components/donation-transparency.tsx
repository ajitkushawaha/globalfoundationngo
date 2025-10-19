"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DonutChart } from "@/components/ui/donut-chart"
import { useEffect, useState } from "react"

interface DonationCategory {
  _id: string
  name: string
  slug: string
  description: string
  unitPrice: number
  unit: string
  currentFunded: number
  targetGoal: number
  donors: number
  color?: string
  bgColor?: string
}

export function DonationTransparency() {
  const [categories, setCategories] = useState<DonationCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/donation-categories')
        if (response.ok) {
          const data = await response.json()
          if (data?.success && Array.isArray(data.data)) {
            setCategories(data.data)
          }
        }
      } catch (error) {
        console.error('Error fetching donation categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  function generateDonutData(categories: DonationCategory[]) {
    if (categories.length === 0) {
      return []
    }

    // Calculate total donations
    const totalDonations = categories.reduce((sum, cat) => sum + (cat.currentFunded * cat.unitPrice), 0)

    if (totalDonations === 0) {
      return []
    }

    // Create donut chart data
    return categories.map(cat => {
      const value = cat.currentFunded * cat.unitPrice
      const percentage = totalDonations > 0 ? (value / totalDonations) * 100 : 0
      return {
        category: cat.name.length > 20 ? cat.name.substring(0, 20) + "..." : cat.name,
        percentage: Math.round(percentage * 100) / 100,
        color: cat.color || "#3B82F6"
      }
    }).filter(item => item.percentage > 0) // Only show categories with donations
  }

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Transparency in Action
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See exactly how your donations are making a difference across our various programs and initiatives.
              </p>
            </div>
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="h-64 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  const donutData = generateDonutData(categories)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Transparency in Action
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See exactly how your donations are making a difference across our various programs and initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donut Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Donation Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {donutData.length > 0 ? (
                  <DonutChart data={donutData} size={300} strokeWidth={25} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-4">💰</div>
                    <p className="text-lg font-medium mb-2">No donations yet</p>
                    <p className="text-sm">Be the first to make a difference!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Impact Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {donutData.length > 0 ? (
                  <div className="space-y-6">
                    {donutData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{item.percentage}%</div>
                          <div className="text-sm text-muted-foreground">of total</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Categories:</span>
                        <span className="text-lg font-bold">{categories.length}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold">Active Categories:</span>
                        <span className="text-lg font-bold text-green-600">{donutData.length}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-lg font-medium mb-2">No data to display</p>
                    <p className="text-sm">Statistics will appear when donations are made</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Description and CTA */}
          <div className="text-center mt-12 pt-8">
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Every rupee donated goes directly to the cause you choose. We maintain complete transparency 
              in our financial reporting and provide regular updates on how your contributions are being used.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View Financial Reports
              </Button>
              <Button variant="outline" size="lg">
                Download Annual Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
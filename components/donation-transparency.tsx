"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SankeyChart } from "@/components/ui/sankey-chart"
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

  function generateSankeyData(categories: DonationCategory[]) {
    if (categories.length === 0) {
      return { nodes: [], links: [] }
    }

    // Calculate total donations
    const totalDonations = categories.reduce((sum, cat) => sum + (cat.currentFunded * cat.unitPrice), 0)

    // Create nodes with required properties
    const nodes = [
      { 
        id: "Donations", 
        name: "Total Donations", 
        color: "#FF8C00",
        percentage: 100
      },
      ...categories.map(cat => {
        const value = cat.currentFunded * cat.unitPrice
        const percentage = totalDonations > 0 ? (value / totalDonations) * 100 : 0
        return {
          id: cat.slug,
          name: cat.name.length > 12 ? cat.name.substring(0, 12) + "..." : cat.name,
          color: cat.color || "#3B82F6",
          percentage: Math.round(percentage * 100) / 100
        }
      })
    ]

    // Create links with required properties
    const links = categories.map(cat => ({
      source: "Donations",
      target: cat.slug,
      value: cat.currentFunded * cat.unitPrice,
      color: cat.color || "#3B82F6"
    }))

    return { nodes, links }
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

  const sankeyData = generateSankeyData(categories)

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

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Donation Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {sankeyData.nodes.length > 0 ? (
                <SankeyChart data={sankeyData} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No donation data available
                </div>
              )}
            </CardContent>
          </Card>

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
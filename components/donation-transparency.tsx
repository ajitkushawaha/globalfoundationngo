import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SankeyChart } from "@/components/ui/sankey-chart"

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

async function getDonationCategories(): Promise<DonationCategory[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const url = `${baseUrl}/api/donation-categories`

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 120 }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    if (data?.success && Array.isArray(data.data)) {
      return data.data
    }
    return []
  } catch (error) {
    console.error('Error fetching donation categories:', error)
    return []
  }
}

function generateSankeyData(categories: DonationCategory[]) {
  if (categories.length === 0) {
    return { nodes: [], links: [] }
  }

  // Calculate total donations
  const totalDonations = categories.reduce((sum, cat) => sum + (cat.currentFunded * cat.unitPrice), 0)
  
  // Generate colors for categories
  const colors = [
    "#f97316", "#0891b2", "#1f2937", "#6b7280", 
    "#ea580c", "#f59e0b", "#10b981", "#8b5cf6"
  ]

  const nodes = categories.map((category, index) => {
    const donationAmount = category.currentFunded * category.unitPrice
    const percentage = totalDonations > 0 ? (donationAmount / totalDonations) * 100 : 0
    
    return {
      id: category.slug || category._id,
      name: category.name.length > 12 ? category.name.substring(0, 12) + "..." : category.name,
      color: colors[index % colors.length],
      percentage: Math.round(percentage * 10) / 10
    }
  })

  const links = categories.map((category, index) => {
    const donationAmount = category.currentFunded * category.unitPrice
    const percentage = totalDonations > 0 ? (donationAmount / totalDonations) * 100 : 0
    
    return {
      source: category.slug || category._id,
      target: "impact",
      value: Math.round(percentage * 10) / 10,
      color: colors[index % colors.length]
    }
  })

  return { nodes, links }
}

export async function DonationTransparency() {
  const categories = await getDonationCategories()
  const sankeyData = generateSankeyData(categories)
  
  if (categories.length === 0) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600" style={{ fontFamily: "var(--font-playfair)" }}>
              Error Loading Donation Data
            </h2>
            <p className="text-lg text-muted-foreground">
              Unable to load donation categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            How We Spend Your Donations
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We understand that when you make a donation, you want to know exactly where your money is going, and we
            pledge to be transparent.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Donation Flow & Impact</CardTitle>
              <p className="text-center text-muted-foreground">
                See exactly how your donations flow into our initiatives and create maximum impact
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-12">
                {/* Sankey Chart */}
                <div className="flex justify-center">
                  <SankeyChart 
                    data={sankeyData} 
                    width={1000}
                    height={800}
                  />
                </div>
                
                {/* Description and CTA */}
                <div className="text-center space-y-6 pt-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                      Transparency in Action
                    </h3>
                    <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                      Every donation flows directly into our initiatives, creating measurable impact across education, 
                      animal rescue, elderly care, and community support. Our commitment to transparency ensures 
                      you can trust that your contributions are being used effectively.
                    </p>
                  </div>

                  <Button size="lg" className="px-8 py-4 text-lg">
                    Make a Donation Today
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

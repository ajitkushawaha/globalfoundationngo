import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, GraduationCap, TreePine } from "lucide-react"

interface Statistic {
  _id: string
  type: string
  value: string
  label: string
  description: string
  icon: string
  color: string
  bgColor: string
  order: number
  isActive: boolean
}

const iconMap: { [key: string]: any } = {
  Users,
  Heart,
  GraduationCap,
  TreePine,
  "👥": Users, // Fallback for emoji icons
  "📊": Users,
  "🎓": GraduationCap,
  "🌳": TreePine,
  "❤️": Heart
}

async function getStats(): Promise<Statistic[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/statistics`, {
      cache: 'no-store'
    })
    const data = await response.json()
    if (data.success) {
      return data.data.filter((stat: Statistic) => stat.isActive).sort((a: Statistic, b: Statistic) => a.order - b.order)
    }
    return []
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
}

export async function Stats() {
  const stats = await getStats()

  return (
    <section className="py-20 bg-primary text-primary-foreground p-4">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white/90 mb-4">
            Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Making a Real Difference
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Numbers that reflect our commitment to creating lasting positive change in our community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Users
            return (
              <Card key={stat._id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/90 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-white/70">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

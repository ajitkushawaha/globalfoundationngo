import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, TreePine, GraduationCap } from "lucide-react"

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
  "👥": Users,
  "📊": Users,
  "🎓": GraduationCap,
  "🌳": TreePine,
  "❤️": Heart
}

async function getStats(): Promise<Statistic[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const url = `${baseUrl}/api/statistics`

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
        .filter((stat: Statistic) => stat.isActive)
        .sort((a: Statistic, b: Statistic) => a.order - b.order)
    }
    return []
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return []
  }
}

export async function Impact() {
  const stats = await getStats()

  if (!stats || stats.length === 0) {
    return (
      <section id="impact" className="py-20 bg-muted/30 p-4">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-600" style={{ fontFamily: "var(--font-playfair)" }}>
              Error Loading Statistics
            </h2>
            <p className="text-lg text-muted-foreground">
              Unable to load impact statistics. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="impact" className="py-20 bg-muted/30 p-4">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Milestones of Change
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our impact speaks through numbers, but behind each statistic is a life transformed, a future brightened, and
            hope restored.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Users
            
            return (
              <Card key={stat._id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor} mb-4`}>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    {stat.value}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

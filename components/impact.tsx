"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, TreePine, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"

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

export function Impact() {
  const [stats, setStats] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/statistics')
        if (response.ok) {
          const data = await response.json()
          if (data?.success && Array.isArray(data.data)) {
            setStats(data.data
              .filter((stat: Statistic) => stat.isActive)
              .sort((a: Statistic, b: Statistic) => a.order - b.order)
            )
          }
        }
      } catch (error) {
        console.error('Error fetching statistics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Impact in Numbers
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every donation, every volunteer hour, and every life touched contributes to our mission of creating positive change.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="text-center animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (stats.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Impact in Numbers
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every donation, every volunteer hour, and every life touched contributes to our mission of creating positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const IconComponent = iconMap[stat.icon] || iconMap["👥"]
              return (
                <Card key={stat._id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                    <p className="text-lg font-semibold mb-2">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
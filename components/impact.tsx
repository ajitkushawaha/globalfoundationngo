import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, TreePine, GraduationCap } from "lucide-react"

export function Impact() {
  const stats = [
    {
      icon: Heart,
      number: "350",
      label: "Animals Rescued",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: GraduationCap,
      number: "589",
      label: "Children Educated",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      number: "300",
      label: "Elderly Care Recipients",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: TreePine,
      number: "240",
      label: "Trees Planted",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ]

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
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${stat.bgColor} mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  {stat.number}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, GraduationCap, TreePine } from "lucide-react"

export function Stats() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Lives Impacted",
      description: "Families and individuals supported"
    },
    {
      icon: Heart,
      value: "200+",
      label: "Animals Rescued",
      description: "Stray and injured animals helped"
    },
    {
      icon: GraduationCap,
      value: "150+",
      label: "Children Educated",
      description: "Quality education provided"
    },
    {
      icon: TreePine,
      value: "1000+",
      label: "Trees Planted",
      description: "Environmental conservation efforts"
    }
  ]

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
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/90 font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-white/70">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

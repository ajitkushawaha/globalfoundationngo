import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target } from "lucide-react"

export function MissionVision() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Mission and Vision
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  Our Mission
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                We believe that education is essential for social progress and reform. It assures that education is the
                right of every girl child and has the power to transform individuals, enabling them to shape their own
                future and contribute positively to society.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  Our Vision
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                The trust is committed to spreading education across all areas of society, with a particular focus on
                underprivileged, poor, disadvantaged, and financially weaker sections. The organisation provides aid to
                aged individuals and promotes overall family well-being within the community, with the primary objective
                of operation include promoting against for the elderly specific initiatives related to environment and
                animal well-being are prominently detailed in the available sources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

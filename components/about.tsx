import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            About Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Making a Difference Together
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Since 2024, we've been dedicated to creating positive change through education, animal welfare, elderly care, and environmental conservation across Gujarat, India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Empowering communities through comprehensive programs in education, animal welfare, elderly care, and environmental conservation.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Impact
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Registered under the Bombay Public Trust Act of 1950, we're making a tangible difference in the lives of people and animals across Ahmedabad district.
              </p>
            </div>
          </div>
          
          <Link href="/about">
            <Button size="lg" className="px-8">
              Learn More About Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

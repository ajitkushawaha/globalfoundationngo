import { Metadata } from "next"
import { PublicLayout } from "@/components/public-layout"
import ParallaxScrollDemo from "@/components/ui/parallax-scroll-demo"
import LayoutGridDemo from "@/components/ui/layout-grid-demo"
import BentoGridDemo from "@/components/ui/bento-grid-demo"
import { Camera } from "lucide-react"

export const metadata: Metadata = {
  title: "Gallery - GEKCT",
  description: "Explore our gallery showcasing the impact of Global Education and Charitable Trust through photos of our programs, events, and community initiatives.",
  keywords: ["gallery", "photos", "impact", "programs", "events", "community", "GEKCT"],
}

export default function GalleryPage() {
  return (
    <PublicLayout>
      <div className="">
      

        {/* Bento Grid Gallery */}
        <section className="py-8">
          <BentoGridDemo />
        </section>

        {/* Interactive Gallery Grid */}
        <section className="py-8">
          <LayoutGridDemo />
        </section>

        {/* Parallax Gallery */}
        <section className="py-8">
          <ParallaxScrollDemo />
        </section>

        {/* Call to Action */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Be Part of Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                These images represent just a fraction of the positive change we're creating together. 
                Join us in making a difference in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/join"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Join Our Mission
                </a>
                <a
                  href="/donate"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Support Our Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}

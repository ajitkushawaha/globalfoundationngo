"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Heart, Users, TreePine } from "lucide-react"
import Image from "next/image"

export function Initiatives() {
  const initiatives = [
    {
      icon: GraduationCap,
      title: "Education Programs",
      description:
        "Providing quality education and learning opportunities to underprivileged children, focusing on girl child education and literacy programs.",
      image: "/children-studying-in-classroom-with-books-and-teac.jpg",
    },
    {
      icon: Heart,
      title: "Animal Welfare", 
      description:
        "Rescuing, rehabilitating, and providing shelter for stray and injured animals. Running adoption drives and awareness programs.",
      image: "/veterinarian-caring-for-rescued-animals-in-shelter.jpg",
    },
    {
      icon: Users,
      title: "Elderly Care",
      description:
        "Supporting elderly individuals with healthcare, companionship, and essential services to ensure their dignity and well-being.",
      image: "/elderly-people-being-cared-for-by-volunteers-in-co.jpg",
    },
    {
      icon: TreePine,
      title: "Environmental Conservation",
      description:
        "Promoting environmental awareness through tree plantation drives and sustainable practices for a greener future.",
      image: "/volunteers-planting-trees-in-community-environment.jpg",
    },
  ]

  return (
    <section id="initiatives" className="py-20 bg-muted/30 p-4">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            What We Do
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Impact Initiatives
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Through focused programs in education, animal welfare, elderly care, and environmental conservation, 
            we're building stronger communities across Gujarat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <initiative.icon className="h-16 w-16 text-primary/60" />
                </div>
                <Image
                  src={initiative.image || "/placeholder.svg"}
                  alt={initiative.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Hide the image if it fails to load, show the gradient background
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mr-4">
                    <initiative.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                    {initiative.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{initiative.description}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

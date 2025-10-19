"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Heart } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Fallback */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron/40 via-accent/20 to-saffron/50" />
        <Image
          src="/diverse-group-of-children-and-adults-in-colorful-t.jpg"
          alt="Community celebration"
          fill
          className="object-cover object-top"
          onError={(e) => {
            // Hide the image if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6">
            <Heart className="w-4 h-4 mr-2 text-saffron" />
            Making a Difference Since 2024
          </div>
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Creating Hope,
          <br />
          <span className="text-saffron bg-gradient-to-r from-saffron to-accent bg-clip-text text-transparent">Changing Lives</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-pretty leading-relaxed text-white/90">
          Empowering communities through education, caring for the elderly, protecting animals, and preserving our environment. 
          Join us in creating lasting positive change across Gujarat, India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8 py-6 gradient-saffron hover:opacity-90 transition-opacity">
            Join Our Mission
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 bg-black/30 border-white/40 text-white hover:bg-black/40 backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Our Story
          </Button>
        </div>
      </div>
    </section>
  )
}

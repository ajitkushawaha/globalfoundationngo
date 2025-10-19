import { PublicLayout } from "@/components/public-layout"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { MissionVision } from "@/components/mission-vision"
import { Impact } from "@/components/impact"
import { DonationTransparency } from "@/components/donation-transparency"
import { Initiatives } from "@/components/initiatives"
import { Blog } from "@/components/blog"
import GEKCTHeroParallaxDemo from "@/components/ui/gekct-hero-parallax-demo"

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <About />
      <Stats />
      <MissionVision />
      <Impact />
      <DonationTransparency />
      <GEKCTHeroParallaxDemo />
      <Blog />
    </PublicLayout>
  )
}
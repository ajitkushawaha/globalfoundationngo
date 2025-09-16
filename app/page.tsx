import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Stats } from "@/components/stats"
import { MissionVision } from "@/components/mission-vision"
import { Impact } from "@/components/impact"
import { DonationTransparency } from "@/components/donation-transparency"
import { Initiatives } from "@/components/initiatives"
import { Blog } from "@/components/blog"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Stats />
      <MissionVision />
      <Impact />
      <DonationTransparency />
      <Initiatives />
      <Blog />
      <Footer />
    </main>
  )
}

import { Blog } from "@/components/blog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Blog />
      </div>
      <Footer />
    </main>
  )
}

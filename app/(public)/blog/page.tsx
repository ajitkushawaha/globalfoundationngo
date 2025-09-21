import { PublicLayout } from "@/components/public-layout"
import { Blog } from "@/components/blog"

export default function BlogPage() {
  return (
    <PublicLayout>
      <div className="pt-16">
        <Blog />
      </div>
    </PublicLayout>
  )
}
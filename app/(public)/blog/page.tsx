import { PublicLayout } from "@/components/public-layout"
import { Blog } from "@/components/blog"

export default function BlogPage() {
  return (
    <PublicLayout>
      <div className="px-4" >
        <Blog />
      </div>
    </PublicLayout>
  )
}
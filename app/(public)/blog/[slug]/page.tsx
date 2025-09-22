import { PublicLayout } from "@/components/public-layout"
import { SingleBlogPost } from "@/components/single-blog-post"

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <PublicLayout>
      <div className="pt-16">
        <SingleBlogPost slug={params.slug} />
      </div>
    </PublicLayout>
  )
}

import { notFound } from 'next/navigation'
import connectToDatabase from '@/lib/mongodb'
import Page from '@/lib/models/Page'
import { PublicLayout } from '@/components/public-layout'

interface PageProps {
  params: {
    slug: string
  }
}

interface PageData {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  featuredImage?: string
  featuredImageAlt?: string
  pageType: 'static' | 'dynamic' | 'landing'
  status: 'draft' | 'published' | 'archived'
  author?: string
  createdAt: Date
  updatedAt: Date
}

export async function generateStaticParams() {
  try {
    await connectToDatabase()
    const pages = await Page.find({ status: 'published' }).select('slug').lean()
    return pages.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    await connectToDatabase()
    const page = await Page.findOne({ 
      slug: params.slug,
      status: 'published'
    }).lean() as PageData | null

    if (!page) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      }
    }

    return {
      title: page.seoTitle || page.title,
      description: page.seoDescription || page.excerpt,
      keywords: page.seoKeywords?.join(', '),
      openGraph: {
        title: page.seoTitle || page.title,
        description: page.seoDescription || page.excerpt,
        images: page.featuredImage ? [page.featuredImage] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    await connectToDatabase()
    
    const page = await Page.findOne({ 
      slug: params.slug,
      status: 'published'
    }).lean() as PageData | null

    if (!page) {
      notFound()
    }

    const formatContent = (content: string) => {
      return content
        .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold mb-6 text-gray-900">$1</h1>')
        .replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold mb-4 text-gray-800">$1</h2>')
        .replace(/^### (.+)$/gm, '<h3 class="text-2xl font-bold mb-3 text-gray-700">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="italic text-gray-700">$1</em>')
        .replace(/^\- (.+)$/gm, '<li class="ml-6 list-disc mb-2">$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal mb-2">$1</li>')
        .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 my-4 bg-blue-50 italic text-gray-700">$1</blockquote>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
        .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
        .replace(/^(?!<[h|b|u|l|d|c])/gm, '<p class="mb-4 text-gray-700 leading-relaxed">')
        .replace(/(<li[^>]*>.*?<\/li>)/g, '<ul class="mb-6">$1</ul>')
    }

    return (
      <PublicLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {page.title}
                </h1>
                {page.excerpt && (
                  <p className="text-xl text-gray-600 mb-6">
                    {page.excerpt}
                  </p>
                )}
                {page.featuredImage && (
                  <div className="mb-8">
                    <img
                      src={page.featuredImage}
                      alt={page.featuredImageAlt || page.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Page Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(page.content) 
                }}
                />
              </div>

              {/* Page Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <p>Last updated: {new Date(page.updatedAt).toLocaleDateString()}</p>
                    <p>Author: {page.author}</p>
                  </div>
                  <div>
                    <p>Page Type: {page.pageType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    )
  } catch (error) {
    console.error('Error rendering page:', error)
    notFound()
  }
}

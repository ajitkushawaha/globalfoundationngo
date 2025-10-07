"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Heart, GraduationCap, Users, TreePine, Loader2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "@/lib/youtube"
import { LatestBlog } from "./latest-blog"
import { Pagination } from "./pagination"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  readTime: string
  mediaType: 'image' | 'video'
  image: string
  imageAlt?: string
  videoUrl?: string
  videoTitle?: string
  featured: boolean
  slug: string
}

const categoryIcons: { [key: string]: any } = {
  'Education': GraduationCap,
  'Animal Welfare': Heart,
  'Elderly Care': Users,
  'Environmental Conservation': TreePine,
  'default': Heart
}

export function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 1
  })

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/blog?page=${currentPage}&limit=6`)
        const data = await response.json()
        
        if (data.success) {
          setBlogPosts(data.data)
          setPagination(data.pagination)
        } else {
          setError('Failed to fetch blog posts')
        }
      } catch (err) {
        setError('Failed to fetch blog posts')
        console.error('Error fetching blog posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [currentPage])

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await fetch('/api/blog?limit=1')
        const data = await response.json()
        
        if (data.success && data.data.length > 0) {
          setLatestPost(data.data[0])
        }
      } catch (err) {
        console.error('Error fetching latest post:', err)
      }
    }

    fetchLatestPost()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || categoryIcons.default
  }

  const handlePageChange = async (page: number) => {
    setPaginationLoading(true)
    setCurrentPage(page)
    
    // Scroll to the blog posts section instead of top of page
    const blogSection = document.getElementById('blog-posts-section')
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 300))
    setPaginationLoading(false)
  }

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-background p-4">
        <div className="container">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-background p-4">
        <div className="container">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Removed featured post logic - now using latest post at top and paginated posts below

  if (blogPosts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-background p-4">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Stories of Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              No blog posts available at the moment. Check back soon for our latest stories!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="bg-background">
      <div className="container p-4">
        {/* Latest Blog Section */}
        {latestPost && (
          <LatestBlog blogPost={latestPost} />
        )}

        {/* Blog Posts Section */}
        <div id="blog-posts-section" className="py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              All Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              More Stories
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore more of our inspiring stories and community impact.
            </p>
          </div>

          {/* Blog Posts Grid - 6 posts per page */}
          <div className="relative">
            {paginationLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Loading posts...</span>
                </div>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">   
            {blogPosts.map((post) => {
            const IconComponent = getCategoryIcon(post.category)
            return (
              <Card key={post._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video relative">
                  {post.mediaType === 'video' && post.videoUrl ? (
                    <img
                      src={getYouTubeThumbnailUrl(extractYouTubeVideoId(post.videoUrl) || '')}
                      alt={post.videoTitle || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <IconComponent className="h-12 w-12 text-primary/60" />
                      </div>
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold mb-3 leading-tight line-clamp-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center mb-1">
                        <User className="w-3 h-3 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
            loading={paginationLoading}
          />
        </div>
      </div>
    </section>
  )
}

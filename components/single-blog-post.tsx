"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from "@/lib/youtube"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, ArrowRight, Heart, GraduationCap, Users, TreePine, Loader2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
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
  views: number
  tags: string[]
}

const categoryIcons: { [key: string]: any } = {
  'Education': GraduationCap,
  'Animal Welfare': Heart,
  'Elderly Care': Users,
  'Environmental Conservation': TreePine,
  'default': Heart
}

interface SingleBlogPostProps {
  slug: string
}

export function SingleBlogPost({ slug }: SingleBlogPostProps) {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [recentLoading, setRecentLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true)
        console.log('Fetching blog post with slug:', slug)
        const response = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Response data:', data)
        
        if (data.success && data.data && data.data.length > 0) {
          setBlogPost(data.data[0])
          setError(null)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlogPost()
    }
  }, [slug])

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setRecentLoading(true)
        const res = await fetch(`/api/blog?limit=5`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (data.success) {
          const items: BlogPost[] = data.data || []
          const filtered = items.filter((p) => p.slug !== slug)
          setRecentPosts(filtered)
        }
      } catch (e) {
        console.error('Error fetching recent posts:', e)
      } finally {
        setRecentLoading(false)
      }
    }
    fetchRecent()
  }, [slug])

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

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Check if paragraph looks like a heading (short, ends with colon, or starts with number)
        const isHeading = paragraph.length < 100 && (
          paragraph.endsWith(':') || 
          paragraph.match(/^\d+\./) || 
          paragraph.match(/^[A-Z][^.!?]*$/) ||
          paragraph.match(/^(Introduction|Overview|Background|Conclusion|Summary|Key Points|Benefits|Challenges|Results|Impact|Next Steps|Call to Action)/i)
        )
        
        if (isHeading) {
          return `<h3 class="text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">${paragraph}</h3>`
        }
        
        // Check if paragraph looks like a subheading
        const isSubHeading = paragraph.length < 150 && (
          paragraph.match(/^[A-Z][^.!?]*:$/) ||
          paragraph.match(/^(What|How|Why|When|Where|Who|The|Our|This|These|That|Those)/i) && paragraph.length < 100
        )
        
        if (isSubHeading) {
          return `<h4 class="text-xl font-semibold text-foreground mb-3 mt-6">${paragraph}</h4>`
        }
        
        // Check if paragraph looks like a list
        const isList = paragraph.includes('\n-') || paragraph.includes('\n•') || paragraph.match(/^\d+\./)
        
        if (isList) {
          const listItems = paragraph.split('\n').filter(item => item.trim().length > 0)
          const listType = paragraph.match(/^\d+\./) ? 'ol' : 'ul'
          const listClass = listType === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside'
          
          const items = listItems.map(item => {
            const cleanItem = item.replace(/^[-•\d+\.]\s*/, '').trim()
            return `<li class="text-muted-foreground leading-relaxed mb-2">${cleanItem}</li>`
          }).join('')
          
          return `<${listType} class="${listClass} text-muted-foreground leading-relaxed mb-4 space-y-2">${items}</${listType}>`
        }
        
        // Check if paragraph looks like a quote
        const isQuote = paragraph.startsWith('"') && paragraph.endsWith('"') && paragraph.length > 50
        
        if (isQuote) {
          return `<blockquote class="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 italic text-lg text-foreground">${paragraph.slice(1, -1)}</blockquote>`
        }
        
        // Check if paragraph contains emphasis (bold/italic patterns)
        let formattedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-secondary px-2 py-1 rounded text-sm font-mono">$1</code>')
        
        // Regular paragraph
        return `<p class="text-muted-foreground leading-relaxed mb-4">${formattedParagraph.replace(/\n/g, '<br>')}</p>`
      })
      .join('')
  }

  if (loading) {
    return (
      <section className="py-20 bg-background p-4">
        <div className="container max-w-4xl">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !blogPost) {
    return (
      <section className="py-10 bg-background p-4">
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Blog post not found'}</p>
            <Button onClick={() => router.push('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const IconComponent = getCategoryIcon(blogPost.category)

  return (
    <section className="py-2 bg-background ">
      <div className="container max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/blog')}
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Blog Post Header */}
            <Card className="overflow-hidden mb-8">
              <div className="aspect-video relative">
                {blogPost.mediaType === 'video' && blogPost.videoUrl ? (
                  <iframe
                    src={getYouTubeEmbedUrl(extractYouTubeVideoId(blogPost.videoUrl) || '')}
                    title={blogPost.videoTitle || blogPost.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <IconComponent className="h-16 w-16 text-primary/60" />
                    </div>
                    <Image
                      src={blogPost.image}
                      alt={blogPost.imageAlt || blogPost.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </>
                )}
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {blogPost.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{blogPost.readTime}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{blogPost.views} Views</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  {blogPost.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {blogPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    <span>{blogPost.author}</span>
                    <Calendar className="w-4 h-4 ml-4 mr-2" />
                    <span>{formatDate(blogPost.publishedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blog Post Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-h3:text-2xl prose-h3:font-bold prose-h3:text-foreground prose-h3:mb-4 prose-h3:mt-8 prose-h4:text-xl prose-h4:font-semibold prose-h4:text-foreground prose-h4:mb-3 prose-h4:mt-6 prose-p:leading-relaxed prose-p:mb-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:bg-primary/5 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-foreground prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono"
                  dangerouslySetInnerHTML={{ 
                    __html: formatContent(blogPost.content)
                  }}
                />
              </CardContent>
            </Card>

            {/* Tags */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  Make a Difference Today
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join us in creating positive change in our community. Your support helps us continue our mission and reach more people in need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => router.push('/blog')}>
                    Read More Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            {/* Recent Stories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Recent Stories</h3>
                {recentLoading ? (
                  <div className="flex items-center text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin mr-2"/> Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {recentPosts.length === 0 && (
                      <p className="text-sm text-muted-foreground">No recent stories available.</p>
                    )}
                    {recentPosts.map((post) => (
                      <div key={post._id} className="flex items-center gap-3">
                        <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0">
                          {post.mediaType === 'video' && post.videoUrl ? (
                            <img
                              src={`https://img.youtube.com/vi/${extractYouTubeVideoId(post.videoUrl) || ''}/hqdefault.jpg`}
                              alt={post.videoTitle || post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                {getCategoryIcon(post.category) && (
                                  <span className="text-primary/60">
                                    {/* icon placeholder to avoid SSR issues */}
                                  </span>
                                )}
                              </div>
                              <Image
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/blog/${post.slug}`} className="block group">
                            <p className="font-medium leading-snug group-hover:text-primary line-clamp-2">{post.title}</p>
                          </Link>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{formatDate(post.publishedAt)}</span>
                            <span className="flex items-center"><Eye className="w-3 h-3 mr-1" />{post.views || 0} Views</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Link href="/blog">
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View all stories
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Donor Spotlight */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Donor Spotlight</h3>
                <div className="space-y-6">
                  {/* Recent Donors */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Recent Donors</h4>
                    <ul className="space-y-2">
                      {[{ name: 'Rajesh Patel', time: '2h ago' }, { name: 'Priya Sharma', time: '5h ago' }, { name: 'Anonymous', time: '1d ago' }, { name: 'Amit Kumar', time: '2d ago' }].map((d, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span className="truncate">{d.name}</span>
                          <span className="text-xs text-muted-foreground ml-3 flex-shrink-0">{d.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Most Frequent Donors */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Most Frequent Donors</h4>
                    <ul className="space-y-2">
                      {[{ name: 'Kavita Patel', count: 7 }, { name: 'Rahul Mehta', count: 5 }, { name: 'Anonymous', count: 4 }].map((d, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span className="truncate">{d.name}</span>
                          <span className="text-xs text-muted-foreground ml-3 flex-shrink-0">{d.count}x</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">View donors</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  )
}

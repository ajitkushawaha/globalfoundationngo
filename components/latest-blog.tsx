"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight, Heart, GraduationCap, Users, TreePine, Eye } from 'lucide-react'
import Image from 'next/image'
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from '@/lib/youtube'

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
  views?: number
}

interface LatestBlogProps {
  blogPost: BlogPost
}

const categoryIcons: { [key: string]: any } = {
  'Education': GraduationCap,
  'Animal Welfare': Heart,
  'Elderly Care': Users,
  'Environmental Conservation': TreePine,
  'default': Heart
}

export function LatestBlog({ blogPost }: LatestBlogProps) {
  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || categoryIcons.default
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const IconComponent = getCategoryIcon(blogPost.category)

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Latest Story
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Latest Impact
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most recent impact story and see how we're making a difference in the community.
          </p>
        </div>

        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="aspect-video lg:aspect-square relative">
              {blogPost.mediaType === 'video' && blogPost.videoUrl && blogPost.videoUrl.trim() !== '' ? (
                <img
                  src={getYouTubeThumbnailUrl(extractYouTubeVideoId(blogPost.videoUrl) || '')}
                  alt={blogPost.videoTitle || blogPost.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <IconComponent className="h-20 w-20 text-primary/60" />
                  </div>
                  {blogPost.image && blogPost.image.trim() !== '' ? (
                    <Image
                      src={blogPost.image}
                      alt={blogPost.imageAlt || blogPost.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                </>
              )}
            </div>
            
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {blogPost.category}
                </span>
                <span className="text-sm text-muted-foreground">{blogPost.readTime}</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{blogPost.views || 0} Views</span>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                {blogPost.title}
              </h3>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {blogPost.excerpt}
              </p>

              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <User className="w-4 h-4 mr-2" />
                <span className="mr-6">{blogPost.author}</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(blogPost.publishedAt)}</span>
              </div>

              <Link href={`/blog/${blogPost.slug}`}>
                <Button size="lg" className="px-8">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}

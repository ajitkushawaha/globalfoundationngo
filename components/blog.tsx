"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Heart, GraduationCap, Users, TreePine } from "lucide-react"
import Image from "next/image"

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Success Story: How We Helped 50 Children Access Quality Education",
      excerpt: "Read about our recent education initiative that provided school supplies, books, and learning materials to underprivileged children in rural Gujarat.",
      author: "Dr. Priya Sharma",
      date: "March 15, 2024",
      category: "Education",
      readTime: "5 min read",
      image: "/children-studying-in-classroom-with-books-and-teac.jpg",
      icon: GraduationCap,
      featured: true
    },
    {
      id: 2,
      title: "Animal Rescue Mission: Saving 20 Stray Dogs from the Streets",
      excerpt: "Our dedicated team recently conducted a rescue operation, providing medical care and finding loving homes for abandoned dogs in Ahmedabad.",
      author: "Rajesh Patel",
      date: "March 10, 2024",
      category: "Animal Welfare",
      readTime: "4 min read",
      image: "/veterinarian-caring-for-rescued-animals-in-shelter.jpg",
      icon: Heart,
      featured: false
    },
    {
      id: 3,
      title: "Elderly Care Program: Bringing Joy to Senior Citizens",
      excerpt: "Learn about our monthly visits to elderly care centers, where we provide companionship, healthcare support, and essential supplies.",
      author: "Meera Desai",
      date: "March 5, 2024",
      category: "Elderly Care",
      readTime: "6 min read",
      image: "/elderly-people-being-cared-for-by-volunteers-in-co.jpg",
      icon: Users,
      featured: false
    },
    {
      id: 4,
      title: "Green Initiative: Planting 1000 Trees for a Sustainable Future",
      excerpt: "Join us in celebrating our environmental conservation efforts as we work towards a greener, more sustainable Gujarat.",
      author: "Amit Kumar",
      date: "February 28, 2024",
      category: "Environment",
      readTime: "3 min read",
      image: "/volunteers-planting-trees-in-community-environment.jpg",
      icon: TreePine,
      featured: false
    }
  ]

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <section id="blog" className="py-20 bg-background p-4">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Latest News
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Stories of Impact
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our latest initiatives, success stories, and community impact. 
            Read about the lives we're changing and the difference we're making together.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="text-sm font-medium text-primary mb-4 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Featured Story
            </div>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-square relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <featuredPost.icon className="h-16 w-16 text-primary/60" />
                  </div>
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      <span>{featuredPost.author}</span>
                      <Calendar className="w-4 h-4 ml-4 mr-2" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <post.icon className="h-12 w-12 text-primary/60" />
                </div>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
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
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Stories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

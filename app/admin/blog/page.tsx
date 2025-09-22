'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface BlogPost {
  _id: string
  title: string
  author: string
  category: string
  published: boolean
  featured: boolean
  views: number
  excerpt: string
  publishedAt: string
  createdAt: string
  mediaType: 'image' | 'video'
  image?: string
  videoUrl?: string
  tags: string[]
}

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setBlogPosts(data.data)
          setFilteredPosts(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Filter posts based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(blogPosts)
    } else {
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredPosts(filtered)
    }
  }, [searchTerm, blogPosts])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSearchBlur = () => {
    setIsSearchFocused(false)
  }

  const deleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setBlogPosts(blogPosts.filter(post => post._id !== id))
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
    }
  }

  const toggleBlogPostStatus = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ published: !published })
      })
      
      if (response.ok) {
        setBlogPosts(blogPosts.map(post => 
          post._id === id ? { ...post, published: !published } : post
        ))
      }
    } catch (error) {
      console.error('Error updating blog post:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <AdminLayout title="Blog Posts" subtitle="Blog Management">
      <div className="mb-6 flex justify-end space-x-3">
        <button
          onClick={loadData}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
        <Link
          href="/admin/blog/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className={`relative max-w-md transition-all duration-200 ${
          isSearchFocused ? 'scale-105' : 'scale-100'
        }`}>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            isSearchFocused ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className={`pl-10 pr-10 transition-all duration-200 ${
              isSearchFocused 
                ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg bg-white' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        )}
      </div>

      {blogPosts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📝</div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new blog post.</p>
            <div className="mt-6">
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">🔍</div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-sm text-gray-500">No blog posts match your search criteria.</p>
            <div className="mt-6">
              <Button onClick={clearSearch} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Clear Search
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post._id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  </div>
                  {post.featured && (
                    <Badge variant="secondary" className="ml-2 flex-shrink-0">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <button
                    onClick={() => toggleBlogPostStatus(post._id, post.published)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Media Preview */}
                  {post.mediaType === 'video' && post.videoUrl ? (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-xs">▶</span>
                        </div>
                        <p className="text-xs text-gray-500">YouTube Video</p>
                      </div>
                    </div>
                  ) : post.image ? (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-xs">📷</span>
                        </div>
                        <p className="text-xs text-gray-500">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <Link href={`/admin/blog/${post._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteBlogPost(post._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
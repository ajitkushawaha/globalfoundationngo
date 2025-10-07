'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Edit, 
  Eye, 
  EyeOff,
  Search, 
  X, 
  FileText, 
  Globe,
  Calendar,
  User,
  Settings,
} from 'lucide-react'

interface Page {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  pageType: 'static' | 'dynamic' | 'landing'
  status: 'draft' | 'published' | 'archived'
  seoTitle?: string
  seoDescription?: string
  showInNavigation: boolean
  navigationOrder: number
  featuredImage?: string
  author: string
  createdAt: string
  updatedAt: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pages')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setPages(data.data)
          setFilteredPages(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = pages

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(page => page.status === statusFilter)
    }

    setFilteredPages(filtered)
  }, [pages, searchTerm, statusFilter])

  const togglePageStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    
    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setPages(pages.map(page => 
            page._id === id ? { ...page, status: newStatus } : page
          ))
          alert(`Page ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`)
        }
      }
    } catch (error) {
      console.error('Error updating page status:', error)
      alert('Failed to update page status')
    }
  }



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPageTypeIcon = (pageType: string) => {
    switch (pageType) {
      case 'static':
        return <FileText className="h-4 w-4" />
      case 'dynamic':
        return <Settings className="h-4 w-4" />
      case 'landing':
        return <Globe className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <AdminLayout title="Pages" subtitle="Page Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Pages" subtitle="Manage your website pages">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Manage existing pages - Edit and toggle status only
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search */}
          <div className={`relative transition-all duration-200 ${
            isSearchFocused ? 'scale-105' : 'scale-100'
          }`}>
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
              isSearchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <Input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`pl-10 pr-10 transition-all duration-200 ${
                isSearchFocused 
                  ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg bg-white' 
                  : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Pages Grid */}
      {filteredPages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <Card key={page._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getPageTypeIcon(page.pageType)}
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Link href={`/admin/pages/${page._id}/edit`}>
                      <Button variant="ghost" size="sm" title="Edit Page">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePageStatus(page._id, page.status)}
                      className={`${
                        page.status === 'published' 
                          ? 'text-orange-600 hover:text-orange-800' 
                          : 'text-green-600 hover:text-green-800'
                      }`}
                      title={page.status === 'published' ? 'Unpublish Page' : 'Publish Page'}
                    >
                      {page.status === 'published' ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </h3>
                
                {page.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {page.excerpt}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span>{page.author}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Updated {formatDate(page.updatedAt)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Globe className="h-3 w-3 mr-1" />
                    <span>/{page.slug}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {page.showInNavigation && (
                      <Badge variant="outline" className="text-xs">
                        In Nav
                      </Badge>
                    )}
                    {page.seoTitle && (
                      <Badge variant="outline" className="text-xs">
                        SEO
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {page.status === 'published' && (
                      <Link href={`/${page.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No pages found' : 'No pages available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search terms or filters.'
              : 'No pages are available for management at this time.'
            }
          </p>
        </div>
      )}

    </AdminLayout>
  )
}

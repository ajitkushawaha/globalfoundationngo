'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin-layout'
import { PageEditor } from '@/components/page-editor'

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
  seoKeywords?: string[]
  showInNavigation: boolean
  navigationOrder: number
  featuredImage?: string
  featuredImageAlt?: string
  author: string
  createdAt: string
  updatedAt: string
}

export default function EditPagePage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setPageLoading(true)
        const response = await fetch(`/api/pages/${params.id}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setPage(data.data)
          } else {
            alert('Page not found')
            router.push('/admin/pages')
          }
        } else {
          alert('Failed to load page')
          router.push('/admin/pages')
        }
      } catch (error) {
        console.error('Error fetching page:', error)
        alert('Failed to load page')
        router.push('/admin/pages')
      } finally {
        setPageLoading(false)
      }
    }

    fetchPage()
  }, [params.id, router])

  const handleSave = async (pageData: any) => {
    try {
      setLoading(true)
      
      const response = await fetch(`/api/pages/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Page updated successfully!')
        router.push('/admin/pages')
      } else {
        alert(data.error || 'Failed to update page')
      }
    } catch (error) {
      console.error('Error updating page:', error)
      alert('Failed to update page')
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <AdminLayout title="Edit Page" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!page) {
    return (
      <AdminLayout title="Edit Page" subtitle="Page not found">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Page not found</h3>
          <p className="text-gray-500">The page you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Edit Page" subtitle={`Editing: ${page.title}`}>
      <PageEditor
        page={page}
        onSave={handleSave}
        loading={loading}
      />
    </AdminLayout>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Plus } from 'lucide-react'

interface BlogPost {
  _id: string
  title: string
  author: string
  category: string
  published: boolean
  views: number
}

interface Statistic {
  _id: string
  value: string
  label: string
  description: string
}

export default function AdminDashboard() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Load blog posts
      const blogResponse = await fetch('/api/blog')
      if (blogResponse.ok) {
        const blogData = await blogResponse.json()
        if (blogData.success) {
          setBlogPosts(blogData.data)
        }
      }
      
      // Load statistics
      const statsResponse = await fetch('/api/statistics')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        if (statsData.success) {
          setStatistics(statsData.data)
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
      <div className="mb-6 flex justify-end">
        <button
          onClick={loadData}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-blue-600">{blogPosts.length}</div>
          <div className="text-gray-600">Blog Posts</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-green-600">{statistics.length}</div>
          <div className="text-gray-600">Statistics</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-purple-600">
            {blogPosts.filter(post => post.published).length}
          </div>
          <div className="text-gray-600">Published Posts</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-3xl font-bold text-orange-600">
            {blogPosts.reduce((sum, post) => sum + post.views, 0)}
          </div>
          <div className="text-gray-600">Total Views</div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h3>
            <Link 
              href="/admin/blog"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {blogPosts.length > 0 ? (
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-600">{post.author} • {post.category}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-sm text-gray-500">{post.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No blog posts found. Click "Refresh Data" to load.</p>
          )}
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Statistics Overview</h3>
            <Link 
              href="/admin/statistics"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {statistics.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statistics.slice(0, 4).map((stat) => (
                <div key={stat._id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No statistics found. Click "Refresh Data" to load.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
'use client'

import { useState, useEffect } from 'react'

export default function MinimalAdmin() {
  const [blogPosts, setBlogPosts] = useState([])
  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch blog posts
        const blogResponse = await fetch('/api/blog')
        const blogData = await blogResponse.json()
        if (blogData.success) {
          setBlogPosts(blogData.data)
        }
        
        // Fetch statistics
        const statsResponse = await fetch('/api/statistics')
        const statsData = await statsResponse.json()
        if (statsData.success) {
          setStatistics(statsData.data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">Loading...</div>
          <div className="text-gray-600">Please wait while we load the data</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">GEKCT Admin Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-3xl font-bold text-blue-600">{blogPosts.length}</p>
            <p className="text-gray-600">Total posts</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <p className="text-3xl font-bold text-green-600">{statistics.length}</p>
            <p className="text-gray-600">Total statistics</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Blog Posts</h2>
            {blogPosts.length > 0 ? (
              <div className="space-y-3">
                {blogPosts.slice(0, 3).map((post: any) => (
                  <div key={post._id} className="p-3 bg-gray-50 rounded">
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.author} • {post.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No blog posts found</p>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            {statistics.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statistics.map((stat: any) => (
                  <div key={stat._id} className="text-center p-4 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No statistics found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export default function NewBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Education',
    tags: '',
    featured: false,
    published: false,
    image: '',
    imageAlt: '',
    seoTitle: '',
    seoDescription: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${window.location.origin}/api/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      })

      if (response.ok) {
        router.push('/admin?tab=blog')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create blog post')
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      alert('Failed to create blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog Posts
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>
              
              <div>
                <label className="admin-label">Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="admin-label">Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="admin-textarea"
                rows={3}
                required
              />
            </div>

            <div className="mt-6">
              <label className="admin-label">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="admin-textarea"
                rows={10}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="admin-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="admin-select"
                  required
                >
                  <option value="Education">Education</option>
                  <option value="Animal Welfare">Animal Welfare</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Environmental Conservation">Environmental Conservation</option>
                  <option value="General">General</option>
                </select>
              </div>
              
              <div>
                <label className="admin-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="education, children, success-story"
                />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Media</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Featured Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
              
              <div>
                <label className="admin-label">Image Alt Text</label>
                <input
                  type="text"
                  name="imageAlt"
                  value={formData.imageAlt}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="admin-label">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  className="admin-input"
                  maxLength={60}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 characters
                </p>
              </div>
              
              <div>
                <label className="admin-label">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  className="admin-textarea"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-700">Featured Post</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="mr-3"
                />
                <span className="text-gray-700">Publish Immediately</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="admin-button admin-button-secondary"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="admin-button admin-button-primary"
            >
              {loading ? 'Saving...' : 'Save Post'}
              <Save className="h-4 w-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { RichTextEditor } from '@/components/rich-text-editor'
import { MediaUpload } from '@/components/media-upload'

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  mediaType: 'image' | 'video'
  image: string
  imageAlt: string
  videoUrl: string
  videoTitle: string
  seoTitle: string
  seoDescription: string
  featured: boolean
  published: boolean
  slug: string
}

interface EditBlogPostClientProps {
  initialData: BlogPost
}

export function EditBlogPostClient({ initialData }: EditBlogPostClientProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    content: initialData.content || '',
    author: initialData.author || '',
    category: initialData.category || 'Education',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
    mediaType: initialData.mediaType || 'image' as 'image' | 'video',
    image: initialData.image || '',
    imageAlt: initialData.imageAlt || '',
    videoUrl: initialData.videoUrl || '',
    videoTitle: initialData.videoTitle || '',
    seoTitle: initialData.seoTitle || '',
    seoDescription: initialData.seoDescription || '',
    featured: initialData.featured || false,
    published: initialData.published || false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      setError(null)

      // Convert tags string to array
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)

      const postData = {
        ...formData,
        tags: tagsArray
      }

      const response = await fetch(`/api/blog/${initialData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/blog')
      } else {
        setError(data.error || 'Failed to update blog post')
      }
    } catch (err) {
      console.error('Error updating blog post:', err)
      setError('Failed to update blog post')
    } finally {
      setSaving(false)
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">
            Update your blog post using the rich text editor below. All fields with * are required.
          </p>
          
          {/* Quick Reference Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">📝 Quick Reference Guide</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Title:</strong> Make it descriptive and engaging (e.g., "Success Story: How We Helped 50 Children")</p>
              <p><strong>Excerpt:</strong> 1-2 sentences summarizing your post for the blog listing</p>
              <p><strong>Content:</strong> Use the toolbar buttons to add headings, lists, and formatting</p>
              <p><strong>Category:</strong> Choose the most relevant category for your post</p>
              <p><strong>Tags:</strong> Add keywords separated by commas to help people find your post</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

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
                  placeholder="e.g., Success Story: How We Helped 50 Children Access Education"
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
                  placeholder="e.g., Admin Team, John Smith, or GEKCT Staff"
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
                placeholder="Write a brief summary (1-2 sentences) that will appear on the blog listing page. This helps readers understand what the post is about."
                required
              />
            </div>

            <div className="mt-6">
              <label className="admin-label">Content *</label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                placeholder="Start writing your blog post... Use the toolbar above to add headings, lists, and formatting."
              />
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorization</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="admin-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="admin-input"
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
                  placeholder="e.g., education, children, success-story, community, impact"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Add relevant keywords separated by commas to help people find your post
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Media</h2>
            
            <MediaUpload
              mediaType={formData.mediaType}
              onMediaTypeChange={(type) => setFormData(prev => ({ ...prev, mediaType: type }))}
              imageUrl={formData.image}
              onImageUrlChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              imageAlt={formData.imageAlt}
              onImageAltChange={(alt) => setFormData(prev => ({ ...prev, imageAlt: alt }))}
              videoUrl={formData.videoUrl}
              onVideoUrlChange={(url) => setFormData(prev => ({ ...prev, videoUrl: url }))}
              videoTitle={formData.videoTitle}
              onVideoTitleChange={(title) => setFormData(prev => ({ ...prev, videoTitle: title }))}
            />
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
                  placeholder="e.g., Success Story: 50 Children Get Education - GEKCT"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 characters - This appears in search results and browser tabs
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
                  placeholder="e.g., Discover how GEKCT helped 50 children access quality education through our community programs. Read their inspiring success stories and learn how you can make a difference."
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 characters - This appears under your title in search results
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
                <div>
                  <span className="text-gray-700 font-medium">Featured Post</span>
                  <p className="text-sm text-gray-500">This post will be highlighted on the homepage and blog listing</p>
                </div>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <span className="text-gray-700 font-medium">Publish Immediately</span>
                  <p className="text-sm text-gray-500">If unchecked, the post will be saved as a draft for later publishing</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

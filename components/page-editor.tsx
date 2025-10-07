'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Save, 
  Eye, 
  EyeOff, 
  FileText, 
  Settings, 
  Search,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image,
  Code,
  RefreshCw,
  ExternalLink,
  Badge
} from 'lucide-react'

interface PageEditorProps {
  page?: any
  onSave: (pageData: any) => void
  onPreview?: () => void
  loading?: boolean
}

export function PageEditor({ page, onSave, onPreview, loading = false }: PageEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    pageType: 'static',
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    showInNavigation: true,
    navigationOrder: 0,
    featuredImage: '',
    featuredImageAlt: '',
    author: 'Admin'
  })

  const [activeTab, setActiveTab] = useState('content')
  const [previewKey, setPreviewKey] = useState(0)
  const [showLivePreview, setShowLivePreview] = useState(true)

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        excerpt: page.excerpt || '',
        pageType: page.pageType || 'static',
        status: page.status || 'draft',
        seoTitle: page.seoTitle || '',
        seoDescription: page.seoDescription || '',
        seoKeywords: page.seoKeywords?.join(', ') || '',
        showInNavigation: page.showInNavigation ?? true,
        navigationOrder: page.navigationOrder || 0,
        featuredImage: page.featuredImage || '',
        featuredImageAlt: page.featuredImageAlt || '',
        author: page.author || 'Admin'
      })
    }
  }, [page])

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-refresh preview when content changes
    if (field === 'content' || field === 'title' || field === 'excerpt') {
      setTimeout(() => {
        setPreviewKey(prev => prev + 1)
      }, 1000)
    }
  }

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1)
  }

  const openInNewTab = () => {
    window.open(`http://localhost:3000/${formData.slug}`, '_blank')
  }

  const handleSlugChange = (value: string) => {
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    handleChange('slug', slug)
  }

  const handleContentChange = (value: string) => {
    handleChange('content', value)
  }

  const formatContent = (content: string) => {
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|b|u|l|d])/gm, '<p class="mb-4">')
      .replace(/(<li[^>]*>.*?<\/li>)/g, '<ul class="list-disc list-inside mb-4">$1</ul>')
  }

  const insertFormatting = (type: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let newText = ''

    switch (type) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`
        break
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`
        break
      case 'h1':
        newText = `# ${selectedText || 'Heading 1'}`
        break
      case 'h2':
        newText = `## ${selectedText || 'Heading 2'}`
        break
      case 'h3':
        newText = `### ${selectedText || 'Heading 3'}`
        break
      case 'ul':
        newText = `- ${selectedText || 'List item'}`
        break
      case 'ol':
        newText = `1. ${selectedText || 'List item'}`
        break
      case 'quote':
        newText = `> ${selectedText || 'Quote text'}`
        break
      case 'code':
        newText = `\`${selectedText || 'code'}\``
        break
    }

    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    handleContentChange(newContent)
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + newText.length, start + newText.length)
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const pageData = {
      ...formData,
      seoKeywords: formData.seoKeywords.split(',').map(k => k.trim()).filter(k => k)
    }
    
    onSave(pageData)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Live Preview Section - Top */}
      {showLivePreview && formData.slug && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Page Preview</h3>
                  </div>
                  <Badge className="text-blue-600 border border-blue-300">
                    {formData.slug}
                  </Badge>
                  <Badge className={formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {formData.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLivePreview(!showLivePreview)}
                  >
                    {showLivePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showLivePreview ? 'Hide' : 'Show'} Preview
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 border-t overflow-y-auto">
                <div className="p-6">
                  {/* Dummy Preview - Shows how page will look */}
                  <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                        {formData.slug}
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                        {formData.title || 'Page Title'}
                      </h1>
                      {formData.excerpt && (
                        <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                          {formData.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Page Content */}
                    <div className="prose prose-lg max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: formatContent(formData.content || 'Start writing your content...')
                        }}
                      />
                    </div>

                    {/* Preview Notice */}
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Preview Mode</p>
                          <p className="text-xs text-blue-600">This is how your page will look. Click "Save Page" to apply changes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Edit Page
            </h1>
            <p className="text-gray-600">
              Update your page content and settings. You can edit content, SEO, and toggle status.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLivePreview(!showLivePreview)}
            >
              {showLivePreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showLivePreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Page'}
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Enter page title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        URL: /{formData.slug} (Cannot be changed)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleChange('excerpt', e.target.value)}
                        placeholder="Brief description of the page"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      
                      {/* Formatting Toolbar */}
                      <div className="flex flex-wrap gap-1 mb-2 p-2 border rounded-md bg-gray-50">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('h1')}
                          title="Heading 1"
                        >
                          <Heading1 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('h2')}
                          title="Heading 2"
                        >
                          <Heading2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('h3')}
                          title="Heading 3"
                        >
                          <Heading3 className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('bold')}
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('italic')}
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('ul')}
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('ol')}
                          title="Numbered List"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('quote')}
                          title="Quote"
                        >
                          <Quote className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting('code')}
                          title="Code"
                        >
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>

                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="Write your page content here..."
                        rows={15}
                        className="font-mono text-sm"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Use markdown-style formatting. Select text and click toolbar buttons for quick formatting.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input
                        id="seoTitle"
                        value={formData.seoTitle}
                        onChange={(e) => handleChange('seoTitle', e.target.value)}
                        placeholder="SEO optimized title"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.seoTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seoDescription">SEO Description</Label>
                      <Textarea
                        id="seoDescription"
                        value={formData.seoDescription}
                        onChange={(e) => handleChange('seoDescription', e.target.value)}
                        placeholder="Meta description for search engines"
                        rows={3}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.seoDescription.length}/160 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="seoKeywords">Keywords</Label>
                      <Input
                        id="seoKeywords"
                        value={formData.seoKeywords}
                        onChange={(e) => handleChange('seoKeywords', e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Separate keywords with commas
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pageType">Page Type</Label>
                        <Input
                          id="pageType"
                          value={formData.pageType}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Cannot be changed
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          value={formData.status}
                          onChange={(e) => handleChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="showInNavigation"
                        checked={formData.showInNavigation}
                        onChange={(e) => handleChange('showInNavigation', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="showInNavigation">Show in navigation menu</Label>
                    </div>

                    {formData.showInNavigation && (
                      <div>
                        <Label htmlFor="navigationOrder">Navigation Order</Label>
                        <Input
                          id="navigationOrder"
                          type="number"
                          value={formData.navigationOrder}
                          onChange={(e) => handleChange('navigationOrder', parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="featuredImage">Featured Image URL</Label>
                      <Input
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) => handleChange('featuredImage', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="featuredImageAlt">Image Alt Text</Label>
                      <Input
                        id="featuredImageAlt"
                        value={formData.featuredImageAlt}
                        onChange={(e) => handleChange('featuredImageAlt', e.target.value)}
                        placeholder="Description of the image"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

        </div>
      </form>
    </div>
  )
}

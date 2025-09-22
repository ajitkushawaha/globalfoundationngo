"use client"

import React, { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Video, Youtube, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { extractYouTubeVideoId, getYouTubeThumbnailUrl, isValidYouTubeUrl } from '@/lib/youtube'

interface MediaUploadProps {
  mediaType: 'image' | 'video'
  onMediaTypeChange: (type: 'image' | 'video') => void
  imageUrl: string
  onImageUrlChange: (url: string) => void
  imageAlt: string
  onImageAltChange: (alt: string) => void
  videoUrl: string
  onVideoUrlChange: (url: string) => void
  videoTitle: string
  onVideoTitleChange: (title: string) => void
}

export function MediaUpload({
  mediaType,
  onMediaTypeChange,
  imageUrl,
  onImageUrlChange,
  imageAlt,
  onImageAltChange,
  videoUrl,
  onVideoUrlChange,
  videoTitle,
  onVideoTitleChange
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        onImageUrlChange(data.data.url)
        // Auto-generate alt text from filename
        const filename = file.name.split('.')[0]
        onImageAltChange(filename.replace(/[-_]/g, ' '))
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleYouTubeUrlChange = (url: string) => {
    onVideoUrlChange(url)
    
    if (isValidYouTubeUrl(url)) {
      const videoId = extractYouTubeVideoId(url)
      if (videoId) {
        // Auto-generate video title from YouTube URL
        onVideoTitleChange(`YouTube Video - ${videoId}`)
      }
    }
  }

  const getYouTubeThumbnail = () => {
    if (!videoUrl || !isValidYouTubeUrl(videoUrl)) return null
    
    const videoId = extractYouTubeVideoId(videoUrl)
    return videoId ? getYouTubeThumbnailUrl(videoId) : null
  }

  return (
    <div className="space-y-6">
      {/* Media Type Selector */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant={mediaType === 'image' ? 'default' : 'outline'}
          onClick={() => onMediaTypeChange('image')}
          className="flex items-center"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Image
        </Button>
        <Button
          type="button"
          variant={mediaType === 'video' ? 'default' : 'outline'}
          onClick={() => onMediaTypeChange('video')}
          className="flex items-center"
        >
          <Video className="h-4 w-4 mr-2" />
          YouTube Video
        </Button>
      </div>

      {/* Image Upload Section */}
      {mediaType === 'image' && (
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
                <div className="flex justify-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Change Image
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onImageUrlChange('')}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium">Upload an image</p>
                  <p className="text-sm text-gray-500">
                    Drag and drop an image here, or click to select
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Choose File
                </Button>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {/* Image Alt Text */}
          <div>
            <label className="admin-label">Image Alt Text</label>
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => onImageAltChange(e.target.value)}
              className="admin-input"
              placeholder="e.g., Children studying in a classroom with books and teacher"
            />
            <p className="text-sm text-gray-500 mt-1">
              Describe what's in the image for accessibility. This helps screen readers understand the image.
            </p>
          </div>
        </div>
      )}

      {/* YouTube Video Section */}
      {mediaType === 'video' && (
        <div className="space-y-4">
          {/* YouTube URL Input */}
          <div>
            <label className="admin-label">YouTube Video URL</label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                className="admin-input flex-1"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
              />
              <Youtube className="h-5 w-5 text-red-500 mt-3" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Paste a YouTube video URL. The video will be embedded in your blog post.
            </p>
          </div>

          {/* Video Preview */}
          {videoUrl && isValidYouTubeUrl(videoUrl) && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Video Preview</span>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={getYouTubeThumbnail() || ''}
                      alt="YouTube video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    This video will be embedded in your blog post
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video Title */}
          <div>
            <label className="admin-label">Video Title</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => onVideoTitleChange(e.target.value)}
              className="admin-input"
              placeholder="e.g., Educational Video: How to Help Children Learn"
            />
            <p className="text-sm text-gray-500 mt-1">
              A descriptive title for the video (used for accessibility)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

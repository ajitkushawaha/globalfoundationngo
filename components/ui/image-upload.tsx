'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  className?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
  showPreview?: boolean
  previewSize?: 'sm' | 'md' | 'lg'
}

export function ImageUpload({
  value = '',
  onChange,
  label = 'Image',
  placeholder = 'Upload an image or enter URL',
  className = '',
  maxSize = 5, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  showPreview = true,
  previewSize = 'md'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previewSizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  const handleFileSelect = async (file: File) => {
    setError(null)
    setIsUploading(true)

    try {
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        throw new Error(`Invalid file type. Please upload: ${acceptedTypes.join(', ')}`)
      }

      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > maxSize) {
        throw new Error(`File size must be less than ${maxSize}MB`)
      }

      // Convert to base64
      const base64 = await fileToBase64(file)
      onChange(base64)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image')
    } finally {
      setIsUploading(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
    })
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleUrlChange = (url: string) => {
    setError(null)
    onChange(url)
  }

  const clearImage = () => {
    onChange('')
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isBase64 = (str: string) => {
    return str.startsWith('data:image/')
  }

  const isUrl = (str: string) => {
    return str.startsWith('http://') || str.startsWith('https://')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>{label}</Label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            ) : (
              <Upload className="h-12 w-12 mx-auto" />
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            {isUploading ? 'Processing image...' : 'Drag & drop an image here, or click to select'}
          </p>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4 mr-2" />
            Choose File
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      </div>

      {/* URL Input */}
      <div>
        <Label htmlFor="image-url">Or enter image URL</Label>
        <Input
          id="image-url"
          value={isUrl(value) ? value : ''}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isUploading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {/* Preview */}
      {showPreview && value && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Preview</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearImage}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`${previewSizes[previewSize]} rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-50`}>
                {isBase64(value) || isUrl(value) ? (
                  <Image
                    src={value}
                    alt="Preview"
                    width={previewSize === 'sm' ? 64 : previewSize === 'md' ? 96 : 128}
                    height={previewSize === 'sm' ? 64 : previewSize === 'md' ? 96 : 128}
                    className="w-full h-full object-cover"
                    onError={() => setError('Failed to load image')}
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600">
                  {isBase64(value) ? 'Base64 Image' : isUrl(value) ? 'URL Image' : 'Invalid Image'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isBase64(value) 
                    ? `${Math.round(value.length / 1024)}KB` 
                    : value.length > 50 
                      ? `${value.substring(0, 50)}...` 
                      : value
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

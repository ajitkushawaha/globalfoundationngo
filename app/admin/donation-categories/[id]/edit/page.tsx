'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  name: string
  slug: string
  description: string
  unitPrice: number
  unit: string
  icon: string
  color: string
  bgColor: string
  currentFunded: number
  targetGoal: number
  donors: number
  isActive: boolean
  sortOrder: number
  image: string
  seoTitle: string
  seoDescription: string
}

const iconOptions = [
  { value: 'Utensils', label: 'Utensils (Food)' },
  { value: 'BookOpen', label: 'BookOpen (Education)' },
  { value: 'PawPrint', label: 'PawPrint (Animals)' },
  { value: 'GraduationCap', label: 'GraduationCap (School)' },
  { value: 'Baby', label: 'Baby (Children)' },
  { value: 'Heart', label: 'Heart (Care)' },
  { value: 'Stethoscope', label: 'Stethoscope (Medical)' },
  { value: 'Users', label: 'Users (Community)' },
  { value: 'Target', label: 'Target (Goals)' },
  { value: 'Gift', label: 'Gift (General)' }
]

const colorOptions = [
  { value: 'text-orange-600', label: 'Orange', bg: 'bg-orange-100' },
  { value: 'text-blue-600', label: 'Blue', bg: 'bg-blue-100' },
  { value: 'text-pink-600', label: 'Pink', bg: 'bg-pink-100' },
  { value: 'text-green-600', label: 'Green', bg: 'bg-green-100' },
  { value: 'text-purple-600', label: 'Purple', bg: 'bg-purple-100' },
  { value: 'text-red-600', label: 'Red', bg: 'bg-red-100' },
  { value: 'text-yellow-600', label: 'Yellow', bg: 'bg-yellow-100' },
  { value: 'text-indigo-600', label: 'Indigo', bg: 'bg-indigo-100' },
  { value: 'text-teal-600', label: 'Teal', bg: 'bg-teal-100' },
  { value: 'text-cyan-600', label: 'Cyan', bg: 'bg-cyan-100' }
]

export default function EditDonationCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string

  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    unitPrice: 0,
    unit: '',
    icon: 'Heart',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    currentFunded: 0,
    targetGoal: 100,
    donors: 0,
    isActive: true,
    sortOrder: 0,
    image: '',
    seoTitle: '',
    seoDescription: '',
  })
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoadingData(true)
        const response = await fetch(`/api/donation-categories/${categoryId}`)
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setFormData(result.data)
          } else {
            toast.error('Failed to load category data')
            router.push('/admin/donation-categories')
          }
        } else {
          toast.error('Failed to load category data')
          router.push('/admin/donation-categories')
        }
      } catch (error) {
        console.error('Error loading category:', error)
        toast.error('Failed to load category data')
        router.push('/admin/donation-categories')
      } finally {
        setLoadingData(false)
      }
    }

    if (categoryId) {
      loadCategory()
    }
  }, [categoryId, router])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug when name changes
    if (field === 'name') {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: generateSlug(value)
      }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.unitPrice <= 0) newErrors.unitPrice = 'Unit price must be greater than 0'
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required'
    if (formData.targetGoal <= 0) newErrors.targetGoal = 'Target goal must be greater than 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch(`/api/donation-categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Donation category updated successfully!')
        router.push('/admin/donation-categories')
      } else {
        toast.error(result.error || 'Failed to update donation category')
      }
    } catch (error) {
      console.error('Error updating donation category:', error)
      toast.error('Failed to update donation category')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <AdminLayout title="Edit Donation Category" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Edit Donation Category" subtitle="Update donation category details">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Donation Category</h1>
              <p className="text-muted-foreground">Update the donation category details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Food for Needy"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="e.g., food-for-needy"
                    className={errors.slug ? 'border-red-500' : ''}
                  />
                  {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of what this category supports"
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price (₹) *</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    min="1"
                    value={formData.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', parseInt(e.target.value) || 0)}
                    placeholder="50"
                    className={errors.unitPrice ? 'border-red-500' : ''}
                  />
                  {errors.unitPrice && <p className="text-sm text-red-500">{errors.unitPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    placeholder="e.g., meal, book, vaccination"
                    className={errors.unit ? 'border-red-500' : ''}
                  />
                  {errors.unit && <p className="text-sm text-red-500">{errors.unit}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetGoal">Target Goal *</Label>
                  <Input
                    id="targetGoal"
                    type="number"
                    min="1"
                    value={formData.targetGoal}
                    onChange={(e) => handleInputChange('targetGoal', parseInt(e.target.value) || 0)}
                    placeholder="100"
                    className={errors.targetGoal ? 'border-red-500' : ''}
                  />
                  {errors.targetGoal && <p className="text-sm text-red-500">{errors.targetGoal}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentFunded">Current Funded</Label>
                  <Input
                    id="currentFunded"
                    type="number"
                    min="0"
                    value={formData.currentFunded}
                    onChange={(e) => handleInputChange('currentFunded', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donors">Number of Donors</Label>
                  <Input
                    id="donors"
                    type="number"
                    min="0"
                    value={formData.donors}
                    onChange={(e) => handleInputChange('donors', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => handleInputChange('icon', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color Theme</Label>
                  <Select value={formData.color} onValueChange={(value) => {
                    const colorOption = colorOptions.find(opt => opt.value === value)
                    handleInputChange('color', value)
                    if (colorOption) {
                      handleInputChange('bgColor', colorOption.bg)
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${option.bg} mr-2`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-muted-foreground">Lower numbers appear first</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="Custom title for search engines"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="Custom description for search engines"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Category
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

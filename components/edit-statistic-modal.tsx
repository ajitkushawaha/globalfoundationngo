'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Save, Loader2 } from 'lucide-react'
import { IStatistic } from '@/lib/models/Statistic'
import { Document } from 'mongoose'

// Create a plain object type for API responses
type Statistic = Omit<IStatistic, keyof Document> & {
  _id: string
  createdAt: string
  updatedAt: string
}

interface EditStatisticModalProps {
  isOpen: boolean
  onClose: () => void
  statistic: Statistic | null
  onSave: (updatedStatistic: Statistic) => void
}

const colorOptions = [
  { value: 'text-blue-600', label: 'Blue' },
  { value: 'text-green-600', label: 'Green' },
  { value: 'text-red-600', label: 'Red' },
  { value: 'text-yellow-600', label: 'Yellow' },
  { value: 'text-purple-600', label: 'Purple' },
  { value: 'text-pink-600', label: 'Pink' },
  { value: 'text-indigo-600', label: 'Indigo' },
  { value: 'text-gray-600', label: 'Gray' }
]

const bgColorOptions = [
  { value: 'bg-blue-100', label: 'Blue' },
  { value: 'bg-green-100', label: 'Green' },
  { value: 'bg-red-100', label: 'Red' },
  { value: 'bg-yellow-100', label: 'Yellow' },
  { value: 'bg-purple-100', label: 'Purple' },
  { value: 'bg-pink-100', label: 'Pink' },
  { value: 'bg-indigo-100', label: 'Indigo' },
  { value: 'bg-gray-100', label: 'Gray' }
]

const iconOptions = [
  { value: '📊', label: 'Chart' },
  { value: '👥', label: 'People' },
  { value: '🎯', label: 'Target' },
  { value: '💡', label: 'Lightbulb' },
  { value: '🌟', label: 'Star' },
  { value: '🏆', label: 'Trophy' },
  { value: '❤️', label: 'Heart' },
  { value: '🌱', label: 'Plant' },
  { value: '📚', label: 'Books' },
  { value: '🏠', label: 'Home' }
]

export function EditStatisticModal({ isOpen, onClose, statistic, onSave }: EditStatisticModalProps) {
  const [formData, setFormData] = useState({
    type: 'impact' as 'impact' | 'achievement' | 'milestone',
    value: '',
    label: '',
    description: '',
    icon: '📊',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    order: 0,
    isActive: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (statistic) {
      console.log('Loading statistic data:', statistic)
      const newFormData = {
        type: statistic.type,
        value: statistic.value,
        label: statistic.label,
        description: statistic.description,
        icon: statistic.icon || '📊', // Ensure icon has a fallback
        color: statistic.color,
        bgColor: statistic.bgColor,
        order: statistic.order,
        isActive: statistic.isActive
      }
      console.log('Setting form data to:', newFormData)
      setFormData(newFormData)
    }
  }, [statistic])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!statistic) return

    // Debug: Log form data to see what's being sent
    console.log('Form data being submitted:', formData)
    console.log('Icon value:', formData.icon, 'Type:', typeof formData.icon)
    console.log('Value:', formData.value, 'Label:', formData.label, 'Description:', formData.description)

    // Ensure required fields are not empty
    const missingFields = []
    if (!formData.icon || formData.icon.trim() === '') missingFields.push('Icon')
    if (!formData.value || formData.value.trim() === '') missingFields.push('Value')
    if (!formData.label || formData.label.trim() === '') missingFields.push('Label')
    if (!formData.description || formData.description.trim() === '') missingFields.push('Description')
    
    if (missingFields.length > 0) {
      console.log('Validation failed - missing required fields:', missingFields)
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return
    }

    // Double-check icon is not empty
    if (!formData.icon || formData.icon.trim() === '') {
      console.log('Icon is empty, setting default')
      formData.icon = '📊'
    }

    setLoading(true)
    try {
      // Ensure icon has a fallback value and all required fields are present
      const dataToSend = {
        ...formData,
        icon: formData.icon || '📊',
        value: formData.value.trim(),
        label: formData.label.trim(),
        description: formData.description.trim()
      }
      console.log('Sending data to API:', dataToSend)
      
      // Final validation before sending
      if (!dataToSend.icon || dataToSend.icon.trim() === '') {
        console.error('Icon is still empty after all checks!')
        alert('Please select an icon')
        setLoading(false)
        return
      }
      
      const response = await fetch(`/api/statistics/${statistic._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          onSave(data.data)
          onClose()
        } else {
          alert(`Error: ${data.error || 'Failed to update statistic'}`)
        }
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error || 'Failed to update statistic'}`)
      }
    } catch (error) {
      console.error('Error updating statistic:', error)
      alert('An error occurred while updating the statistic')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    console.log(`Updating field ${field} with value:`, value)
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      }
      console.log('New form data:', newData)
      return newData
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Edit Statistic
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                {/* Type */}
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="impact">Impact</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Value */}
                <div>
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    type="text"
                    value={formData.value}
                    onChange={(e) => handleChange('value', e.target.value)}
                    placeholder="e.g., 1000+, 50%, 25"
                    required
                  />
                </div>

                {/* Label */}
                <div>
                  <Label htmlFor="label">Label *</Label>
                  <Input
                    id="label"
                    type="text"
                    value={formData.label}
                    onChange={(e) => handleChange('label', e.target.value)}
                    placeholder="e.g., Lives Impacted"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief description of the statistic"
                    rows={3}
                    required
                  />
                </div>

                {/* Icon */}
                <div>
                  <Label htmlFor="icon">Icon *</Label>
                  <Select 
                    value={formData.icon || '📊'} 
                    defaultValue="📊"
                    onValueChange={(value) => {
                      console.log('Icon select changed to:', value)
                      if (value && value.trim() !== '') {
                        handleChange('icon', value)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center">
                            <span className="mr-2">{option.value}</span>
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color and Background Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color">Text Color</Label>
                    <Select value={formData.color} onValueChange={(value) => handleChange('color', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bgColor">Background Color</Label>
                    <Select value={formData.bgColor} onValueChange={(value) => handleChange('bgColor', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bgColorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Order */}
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="isActive" className="ml-2">
                    Active
                  </Label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewStatistic() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: 'impact',
    value: '',
    label: '',
    description: '',
    icon: 'Users',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    order: 0,
    isActive: true
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${window.location.origin}/api/statistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin?tab=statistics')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create statistic')
      }
    } catch (error) {
      console.error('Error creating statistic:', error)
      alert('Failed to create statistic')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const iconOptions = [
    'Users', 'Heart', 'GraduationCap', 'TreePine', 'Target', 'Lightbulb',
    'Shield', 'Star', 'Award', 'TrendingUp', 'Globe', 'Home'
  ]

  const colorOptions = [
    { value: 'text-blue-600', bg: 'bg-blue-100', label: 'Blue' },
    { value: 'text-green-600', bg: 'bg-green-100', label: 'Green' },
    { value: 'text-red-600', bg: 'bg-red-100', label: 'Red' },
    { value: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Yellow' },
    { value: 'text-purple-600', bg: 'bg-purple-100', label: 'Purple' },
    { value: 'text-pink-600', bg: 'bg-pink-100', label: 'Pink' },
    { value: 'text-indigo-600', bg: 'bg-indigo-100', label: 'Indigo' },
    { value: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Emerald' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Statistics
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Statistic</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="admin-label">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="admin-select"
                  required
                >
                  <option value="impact">Impact</option>
                  <option value="achievement">Achievement</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Value *</label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="500+"
                    required
                  />
                </div>
                
                <div>
                  <label className="admin-label">Label *</label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="admin-input"
                    placeholder="Lives Impacted"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="admin-textarea"
                  rows={3}
                  placeholder="Families and individuals supported"
                  required
                />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
            
            <div className="space-y-6">
              <div>
                <label className="admin-label">Icon *</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="admin-select"
                  required
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="admin-label">Color Scheme *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colorOptions.map(color => (
                    <label key={color.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.color === color.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-full ${color.bg} flex items-center justify-center ${
                        formData.color === color.value ? 'ring-2 ring-blue-500' : ''
                      }`}>
                        <div className={`w-4 h-4 rounded-full ${color.value.replace('text-', 'bg-').replace('-600', '-500')}`}></div>
                      </div>
                      <span className="text-sm text-gray-700">{color.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="admin-label">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="admin-input"
                  min="0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Lower numbers appear first
                </p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-3"
              />
              <span className="text-gray-700">Active (visible on website)</span>
            </label>
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
              {loading ? 'Saving...' : 'Save Statistic'}
              <Save className="h-4 w-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

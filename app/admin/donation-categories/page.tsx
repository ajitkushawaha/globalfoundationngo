'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  Heart,
  DollarSign,
  Users,
  Target,
  Eye,
  EyeOff,
  RotateCcw,
  TrendingUp,
  Calendar
} from 'lucide-react'

interface DonationCategory {
  _id: string
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
  progressPercentage: number
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  currentCycle: {
    totalDonations: number
    allTargetsReached: boolean
    canReset: boolean
  }
  historical: {
    totalDonations: number
    completedCycles: number
    averagePerCycle: number
  }
  overall: {
    grandTotalDonations: number
    totalDonors: number
    totalCategories: number
  }
  cycle: {
    currentCycle: number
    completedCycles: number
    lastResetDate: string | null
    nextResetAvailable: boolean
  }
}

export default function DonationCategoriesPage() {
  const [categories, setCategories] = useState<DonationCategory[]>([])
  const [filteredCategories, setFilteredCategories] = useState<DonationCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [resetLoading, setResetLoading] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/donation-categories')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setCategories(data.data)
          setFilteredCategories(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading donation categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setDashboardStats(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    }
  }

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all donation categories? This will reset all progress to 0 and create a new cycle.')) {
      return
    }

    try {
      setResetLoading(true)
      const response = await fetch('/api/donation-categories/reset', {
        method: 'POST'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          alert(`Reset successful! Cycle #${data.cycleNumber} completed with ₹${data.totalDonations} total donations.`)
          loadData()
          loadDashboardStats()
        }
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Failed to reset categories')
      }
    } catch (error) {
      console.error('Error resetting categories:', error)
      alert('Error resetting categories')
    } finally {
      setResetLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    loadDashboardStats()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories)
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.unit.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCategories(filtered)
    }
  }, [searchTerm, categories])

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donation category?')) return
    
    try {
      const response = await fetch(`/api/donation-categories/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCategories(categories.filter(category => category._id !== id))
      }
    } catch (error) {
      console.error('Error deleting donation category:', error)
    }
  }

  const toggleCategoryStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/donation-categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        setCategories(categories.map(category => 
          category._id === id ? { ...category, isActive: !isActive } : category
        ))
      }
    } catch (error) {
      console.error('Error updating category status:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <AdminLayout title="Donation Categories" subtitle="Manage donation categories">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Manage donation categories that appear on the donation page
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          {dashboardStats?.currentCycle.canReset && (
            <button
              onClick={handleReset}
              disabled={resetLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {resetLoading ? 'Resetting...' : 'Reset All Categories'}
            </button>
          )}
          <Link
            href="/admin/donation-categories/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Link>
        </div>
      </div>

      {/* Dashboard Stats */}
      {dashboardStats && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Current Cycle</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(dashboardStats.currentCycle.totalDonations)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Historical</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(dashboardStats.historical.totalDonations)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Grand Total</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatCurrency(dashboardStats.overall.grandTotalDonations)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Completed Cycles</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {dashboardStats.cycle.completedCycles}
                  </p>
                  <p className="text-xs text-orange-600">
                    Cycle #{dashboardStats.cycle.currentCycle}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reset Status */}
      {dashboardStats?.currentCycle.allTargetsReached && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Heart className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                All targets reached! Ready for reset.
              </h3>
              <p className="text-sm text-green-700 mt-1">
                All donation categories have reached their target goals. You can now reset all categories to start a new cycle.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className={`relative max-w-md transition-all duration-200 ${
          isSearchFocused ? 'scale-105' : 'scale-100'
        }`}>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            isSearchFocused ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`pl-10 pr-10 transition-all duration-200 ${
              isSearchFocused 
                ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg bg-white' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'} matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <Badge className={category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Link href={`/admin/donation-categories/${category._id}/edit`}>
                      <Button variant="ghost" size="sm" title="Edit Category">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCategoryStatus(category._id, category.isActive)}
                      className="text-blue-600 hover:text-blue-800"
                      title={category.isActive ? 'Deactivate Category' : 'Activate Category'}
                    >
                      {category.isActive ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>

                {/* Price and Unit */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(category.unitPrice)}
                  </div>
                  <div className="text-sm text-gray-500">per {category.unit}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{category.currentFunded}/{category.targetGoal} {category.unit}s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    {category.progressPercentage}% funded • {category.donors} donors
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span>Total: {formatCurrency(category.currentFunded * category.unitPrice)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{category.donors} donors</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Target className="h-3 w-3 mr-1" />
                    <span>Goal: {category.targetGoal} {category.unit}s</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <Link href={`/admin/donation-categories/${category._id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteCategory(category._id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No categories found' : 'No donation categories available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search terms.'
              : 'Get started by creating your first donation category.'
            }
          </p>
          <div className="mt-6">
            <Link href="/admin/donation-categories/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

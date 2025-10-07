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
  Eye, 
  Search, 
  X, 
  Heart,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Target,
  TrendingUp
} from 'lucide-react'

interface Initiative {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  status: 'active' | 'completed' | 'paused' | 'planning'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  startDate: string
  endDate?: string
  targetAmount: number
  currentAmount: number
  featured: boolean
  image?: string
  location?: string
  beneficiaries: string
  impact: string
  tags: string[]
  progressPercentage: number
  daysRemaining?: number
  createdAt: string
  updatedAt: string
}

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([])
  const [filteredInitiatives, setFilteredInitiatives] = useState<Initiative[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/initiatives')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setInitiatives(data.data)
          setFilteredInitiatives(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading initiatives:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = initiatives

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(initiative =>
        initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(initiative => initiative.status === statusFilter)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(initiative => initiative.category === categoryFilter)
    }

    setFilteredInitiatives(filtered)
  }, [initiatives, searchTerm, statusFilter, categoryFilter])

  const deleteInitiative = async (id: string) => {
    if (!confirm('Are you sure you want to delete this initiative?')) return
    
    try {
      const response = await fetch(`/api/initiatives/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setInitiatives(initiatives.filter(initiative => initiative._id !== id))
      }
    } catch (error) {
      console.error('Error deleting initiative:', error)
    }
  }

  const toggleInitiativeStatus = async (id: string, currentStatus: string) => {
    const statusMap: { [key: string]: string } = {
      'planning': 'active',
      'active': 'paused',
      'paused': 'active',
      'completed': 'active'
    }
    const newStatus = statusMap[currentStatus] || 'active'
    
    try {
      const response = await fetch(`/api/initiatives/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setInitiatives(initiatives.map(initiative => 
          initiative._id === id ? { ...initiative, status: newStatus as any } : initiative
        ))
      }
    } catch (error) {
      console.error('Error updating initiative status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'planning':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <AdminLayout title="Initiatives" subtitle="Initiatives Management">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Manage your organization's initiatives and projects
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
          <Link
            href="/admin/initiatives/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Initiative
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className={`relative flex-1 max-w-md transition-all duration-200 ${
          isSearchFocused ? 'scale-105' : 'scale-100'
        }`}>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            isSearchFocused ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <Input
            type="text"
            placeholder="Search initiatives..."
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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
          <option value="planning">Planning</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
          <option value="Animal Welfare">Animal Welfare</option>
          <option value="Elderly Care">Elderly Care</option>
          <option value="Children">Children</option>
          <option value="Women Empowerment">Women Empowerment</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Community Development">Community Development</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found {filteredInitiatives.length} initiative{filteredInitiatives.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Initiatives Grid */}
      {filteredInitiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((initiative) => (
            <Card key={initiative._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <Badge className={getStatusColor(initiative.status)}>
                      {initiative.status}
                    </Badge>
                    <Badge className={getPriorityColor(initiative.priority)}>
                      {initiative.priority}
                    </Badge>
                  </div>
                  {initiative.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {initiative.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {initiative.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{initiative.progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${initiative.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <DollarSign className="h-3 w-3 mr-1" />
                    <span>{formatCurrency(initiative.currentAmount)} / {formatCurrency(initiative.targetAmount)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Started {formatDate(initiative.startDate)}</span>
                  </div>
                  {initiative.location && (
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{initiative.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{initiative.beneficiaries}</span>
                  </div>
                </div>

                {/* Tags */}
                {initiative.tags && initiative.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {initiative.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {initiative.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{initiative.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <Link href={`/admin/initiatives/${initiative._id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleInitiativeStatus(initiative._id, initiative.status)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {initiative.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteInitiative(initiative._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No initiatives found' : 'No initiatives available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search terms or filters.'
              : 'Get started by creating your first initiative.'
            }
          </p>
          <div className="mt-6">
            <Link href="/admin/initiatives/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Initiative
              </Button>
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
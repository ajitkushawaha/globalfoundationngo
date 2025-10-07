'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { EditStatisticModal } from '@/components/edit-statistic-modal'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { IStatistic } from '@/lib/models/Statistic'
import { Document } from 'mongoose'

// Create a plain object type for API responses
type Statistic = Omit<IStatistic, keyof Document> & {
  _id: string
  createdAt: string
  updatedAt: string
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedStatistic, setSelectedStatistic] = useState<Statistic | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/statistics')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStatistics(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const deleteStatistic = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return
    
    try {
      const response = await fetch(`/api/statistics/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setStatistics(statistics.filter(stat => stat._id !== id))
      }
    } catch (error) {
      console.error('Error deleting statistic:', error)
    }
  }

  const toggleStatisticStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/statistics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      })
      
      if (response.ok) {
        setStatistics(statistics.map(stat => 
          stat._id === id ? { ...stat, isActive: !isActive } : stat
        ))
      }
    } catch (error) {
      console.error('Error updating statistic:', error)
    }
  }

  const handleEditClick = (statistic: Statistic) => {
    setSelectedStatistic(statistic)
    setEditModalOpen(true)
  }

  const handleModalClose = () => {
    setEditModalOpen(false)
    setSelectedStatistic(null)
  }

  const handleStatisticUpdate = (updatedStatistic: Statistic) => {
    setStatistics(statistics.map(stat => 
      stat._id === updatedStatistic._id ? updatedStatistic : stat
    ))
  }

  return (
    <AdminLayout title="Statistics" subtitle="Statistics Management">
      <div className="mb-6 flex justify-end space-x-3">
        <button
          onClick={loadData}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
        <Link
          href="/admin/statistics/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Statistic
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statistics.map((stat) => (
          <div key={stat._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <div className={`text-2xl ${stat.color}`}>
                  📊
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleStatisticStatus(stat._id, stat.isActive)}
                  className={`px-2 py-1 text-xs rounded-full ${
                    stat.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stat.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-lg font-medium text-gray-700 mb-1">{stat.label}</div>
            <div className="text-sm text-gray-500 mb-4">{stat.description}</div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Type: {stat.type}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditClick(stat)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteStatistic(stat._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {statistics.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📊</div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No statistics</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new statistic.</p>
          <div className="mt-6">
            <Link
              href="/admin/statistics/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Statistic
            </Link>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditStatisticModal
        isOpen={editModalOpen}
        onClose={handleModalClose}
        statistic={selectedStatistic}
        onSave={handleStatisticUpdate}
      />
    </AdminLayout>
  )
}
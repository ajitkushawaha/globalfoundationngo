'use client'

import { AdminLayout } from '@/components/admin-layout'
import { Plus, Heart } from 'lucide-react'

export default function InitiativesPage() {
  return (
    <AdminLayout title="Initiatives" subtitle="Initiatives Management">
      <div className="mb-6 flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </button>
      </div>

      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Heart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Initiatives Management</h3>
        <p className="mt-1 text-sm text-gray-500">This section is coming soon. You'll be able to manage your initiatives here.</p>
      </div>
    </AdminLayout>
  )
}
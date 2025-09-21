'use client'

import { AdminLayout } from '@/components/admin-layout'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <AdminLayout title="Settings" subtitle="Settings">
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Settings className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Settings</h3>
        <p className="mt-1 text-sm text-gray-500">This section is coming soon. You'll be able to manage your settings here.</p>
      </div>
    </AdminLayout>
  )
}
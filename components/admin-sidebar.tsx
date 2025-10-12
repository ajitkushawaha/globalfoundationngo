'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  FileText, 
  Heart, 
  Settings, 
  X,
  Globe,
  Users
} from 'lucide-react'

interface AdminSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3, current: pathname === '/admin' },
    { name: 'Donations', href: '/admin/donations', icon: Heart, current: pathname.startsWith('/admin/donations') },
    { name: 'Pages', href: '/admin/pages', icon: Globe, current: pathname.startsWith('/admin/pages') },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText, current: pathname.startsWith('/admin/blog') },
    { name: 'Team Members', href: '/admin/team-members', icon: Users, current: pathname.startsWith('/admin/team-members') },
    { name: 'Donation Categories', href: '/admin/donation-categories', icon: Heart, current: pathname.startsWith('/admin/donation-categories') },
    { name: 'Statistics', href: '/admin/statistics', icon: BarChart3, current: pathname.startsWith('/admin/statistics') },
    { name: 'Initiatives', href: '/admin/initiatives', icon: Heart, current: pathname.startsWith('/admin/initiatives') },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: pathname.startsWith('/admin/settings') },
  ]

  return (
    <>
      {/* Desktop Sidebar - Fixed on desktop */}
      <div className="hidden lg:block fixed left-0 top-0 z-50 h-screen w-64 bg-white shadow-lg">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">GEKCT Admin</h1>
        </div>
        
        <nav className="mt-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:hidden`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">GEKCT Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

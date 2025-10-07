'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, LogOut } from 'lucide-react'
import { AdminSidebar } from './admin-sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
      const userString = localStorage.getItem('adminUser') || ''
      
      if (loggedIn && userString) {
        try {
          const user = JSON.parse(userString)
          setIsAuthenticated(true)
          setAdminUser(user)
        } catch (error) {
          console.error('Error parsing user data:', error)
          // Clear invalid data and redirect to login
          localStorage.removeItem('adminLoggedIn')
          localStorage.removeItem('adminUser')
          router.push('/admin/login')
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminUser')
    
    // Clear cookies
    document.cookie = 'adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'adminUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Redirect to login page
    router.push('/admin/login')
  }

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar - Sticky */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

       
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header - Sticky */}
          <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{subtitle || 'Admin Panel'}</span>
                <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                  View Site
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {adminUser?.name || 'Admin'}
                  {adminUser?.role && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {adminUser.role}
                    </span>
                  )}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-800 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </header>

          {/* Page Content - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

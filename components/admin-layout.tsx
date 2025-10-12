'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Bell, UserCircle2, LogOut, ChevronDown } from 'lucide-react'
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
  const [pendingCount, setPendingCount] = useState<number>(0)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement | null>(null)
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

  const fetchPendingCount = useCallback(async () => {
    try {
      const res = await fetch('/api/donations?status=pending&limit=1', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      if (data?.success && Array.isArray(data.data)) {
        setPendingCount(data.data.length)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    fetchPendingCount()
    const id = setInterval(fetchPendingCount, 10000)
    const handler = () => fetchPendingCount()
    window.addEventListener('donations:updated', handler as EventListener)
    return () => {
      clearInterval(id)
      window.removeEventListener('donations:updated', handler as EventListener)
    }
  }, [isAuthenticated, fetchPendingCount])

  useEffect(() => {
    // Close profile dropdown on outside click
    function onDocClick(e: MouseEvent) {
      if (!profileRef.current) return
      if (e.target instanceof Node && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

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

  const goToDonations = () => router.push('/admin/donations')

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
      {/* Sidebar (desktop fixed + mobile overlay) */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex h-screen lg:pl-64">
        
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
                {/* Notification bell */}
                <button
                  onClick={goToDonations}
                  className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5 text-gray-700" />
                  {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 h-5 min-w-[20px] text-[10px] font-semibold leading-none text-white bg-red-600 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>

                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border hover:bg-gray-50"
                  >
                    <UserCircle2 className="h-5 w-5 text-gray-700" />
                    <span className="text-sm text-gray-700 hidden sm:inline">{adminUser?.name || 'Admin'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b">
                        <div className="text-sm font-medium text-gray-900 truncate">{adminUser?.name || 'Admin'}</div>
                      </div>
                      <button
                        onClick={goToDonations}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>Notifications</span>
                        {pendingCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-white bg-red-600 rounded-full">
                            {pendingCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={goToDonations}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Donations
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

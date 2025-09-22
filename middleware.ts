import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (excluding login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // Check for admin login status in cookies or headers
    const adminLoggedIn = request.cookies.get('adminLoggedIn')?.value === 'true'
    
    if (!adminLoggedIn) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // If accessing login page while already logged in, redirect to admin dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    const adminLoggedIn = request.cookies.get('adminLoggedIn')?.value === 'true'
    
    if (adminLoggedIn) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}

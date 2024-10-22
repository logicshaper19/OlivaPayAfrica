import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/signup']

  // If the user is not authenticated and trying to access a protected route
  if (!session && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If the user is authenticated but hasn't completed onboarding
  if (session && !session.user.user_metadata.onboarding_completed && path !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  // If the user is authenticated and has completed onboarding, but tries to access onboarding again
  if (session && session.user.user_metadata.onboarding_completed && path === '/onboarding') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
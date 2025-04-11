import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.ip ||
    'unknown'
  const userAgent = req.headers.get('user-agent')
  // Remove geolocation since getGeolocation is not defined
  
  console.log(`🔗 Incoming request from IP: ${ip} - ${req.nextUrl.pathname} - ${userAgent}`)

  return NextResponse.next()
}

// ✅ This part must be outside the middleware function
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  }
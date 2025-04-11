import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||'unknown'
  const userAgent = req.headers.get('user-agent')
  
  console.log(`🔗 Incoming request from IP: ${ip} - ${req.nextUrl.pathname} - ${userAgent}`)

  return NextResponse.next()
}

// ✅ This part must be outside the middleware function
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
  }
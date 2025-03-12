import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const role = req.cookies.get('role')?.value

  const isLoginPage = req.nextUrl.pathname === '/control/login'
  const isControlRoute = req.nextUrl.pathname.startsWith('/control')

  if (!token || !role) {
    if (isControlRoute && !isLoginPage) {
      return NextResponse.redirect(
        new URL('/control/login?error=unauthenticated', req.url)
      )
    }
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== role) {
      return NextResponse.redirect(
        new URL('/control/login?error=true', req.url)
      )
    }

    if (isLoginPage) {
      return NextResponse.redirect(new URL('/control', req.url))
    }
  } catch (error) {
    console.error('JWT Verification Failed:', error)

    const res = NextResponse.redirect(new URL('/control/login', req.url))
    res.cookies.delete('token')
    res.cookies.delete('role')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/control/:path*', '/control/login'],
}

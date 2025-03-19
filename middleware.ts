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
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined')
    }

    const secret = new TextEncoder().encode(secretKey)
    const { payload } = await jwtVerify(token, secret)

    if (payload.role !== role) {
      const res = NextResponse.redirect(
        new URL('/control/login?error=role_mismatch', req.url)
      )
      res.cookies.set('token', '', { maxAge: -1 })
      res.cookies.set('role', '', { maxAge: -1 })
      return res
    }

    if (isLoginPage) {
      return NextResponse.redirect(new URL('/control', req.url))
    }
  } catch (error) {
    console.error('JWT Verification Failed:', error)

    const res = NextResponse.redirect(
      new URL('/control/login?error=invalid_token', req.url)
    )
    res.cookies.set('token', '', { maxAge: -1 })
    res.cookies.set('role', '', { maxAge: -1 })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/control/:path*', '/control/login'],
}

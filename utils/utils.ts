'use server'

import prisma from '@/prisma/script'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
export const getSessionUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('userToken')?.value

  if (!token || !process.env.JWT_SECRET) return null

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )

    const userId = payload.id as string

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })

    return user
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export const getUserId = async () => {
  const user = await getSessionUser()
  return user?.id ?? null
}

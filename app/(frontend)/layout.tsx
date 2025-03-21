import HomeNavbar from '@/components/HomerNavbar'
import React, { Suspense } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Suspense fallback={<p className='loading-spinner'></p>}>
        <HomeNavbar />
      </Suspense>
      <div
        className='max-w-7xl mx-auto
      py-10'
      >
        {children}
      </div>
    </div>
  )
}

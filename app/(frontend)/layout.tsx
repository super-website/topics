import HomeNavbar from '@/components/HomerNavbar'
import React, { Suspense } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Suspense fallback={<p>Loading Navbar...</p>}>
        <HomeNavbar />
      </Suspense>
      <div
        className='max-w-7xl mx-auto
      pt-10'
      >
        {children}
      </div>
    </div>
  )
}

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HomeNavbar from '@/components/HomerNavbar'
import React, { Suspense } from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white'>
      <Suspense fallback={<p className='loading-spinner'></p>}>
        <HomeNavbar />
        <Header />
      </Suspense>
      <div>{children}</div>
      <Footer />
    </div>
  )
}

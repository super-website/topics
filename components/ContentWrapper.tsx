'use client'

import React, { Suspense } from 'react'
import Content from '@/components/Content'
import Sidebar from '@/components/Sidebar'

export default function ContentWrapper({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''

  return (
    <div className='flex gap-4'>
      <div>
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className='max-w-2xl w-full'>
        <Suspense fallback={<div>Loading Content...</div>}>
          <Content query={query} />
        </Suspense>
      </div>
      <h2 className='hidden md:flex'>Ads</h2>
    </div>
  )
}

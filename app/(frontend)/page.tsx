import React from 'react'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''
  return (
    <div className='flex gap-4'>
      <div>
        <Sidebar />
      </div>
      <div className='max-w-2xl w-full'>
        <Content query={query} />
      </div>
      <h2 className='hidden md:flex'>Ads</h2>
    </div>
  )
}

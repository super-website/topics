import React from 'react'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'
import adsImg from '../../public/images/ads.jpg'
import Image from 'next/image'
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
      <div className='max-w-sm md:max-w-2xl '>
        <Content query={query} />
      </div>
      <div className='hidden md:block'>
        <h2 className='text-xl font-bold mb-3'>Advertisement</h2>
        <Image
          src={adsImg}
          alt='ads'
          height={800}
          width={250}
          className='object-cover'
        />
      </div>
    </div>
  )
}

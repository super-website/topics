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
      <div className='max-w-2xl w-full'>
        <Content query={query} />
      </div>
      <div>
        <Image
          src={adsImg}
          alt='ads'
          layout='fill'
          objectFit='cover'
          className='object-cover'
        />
      </div>
    </div>
  )
}

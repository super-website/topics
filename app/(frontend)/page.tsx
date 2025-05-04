import React from 'react'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'
import adsImg from '../../public/images/ads.jpg'
import Image from 'next/image'
import Link from 'next/link'
export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''
  return (
    <>
      <div className='flex gap-4'>
        <div>
          <Sidebar />
        </div>
        <div className='max-w-2xl '>
          <Content query={query} />
        </div>
        <div className='hidden md:block'>
          <Link
            href='https://www.youtube.com/@EducationWithHamza-g8v'
            target='_blank'
          >
            <h1 className='text-xl font-bold mb-3'>Advertisement</h1>
            <Image
              src={adsImg}
              alt='ads'
              height={600}
              width={250}
              className='object-cover'
              priority
            />
          </Link>
        </div>
      </div>
    </>
  )
}

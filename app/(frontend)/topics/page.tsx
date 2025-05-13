import React from 'react'

import adsImg from '../../../public/images/ads.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Topics',
  description:
    'Discover comprehensive, free educational resources tailored for students in Pakistan. Education With Hamza offers expertly crafted notes and learning materials for FSC, 1st year, and 2nd year students to help them succeed in board exams.',
  keywords: [
    'Education With Hamza',
    'FSC notes Pakistan',
    '1st year notes',
    '2nd year notes',
    'free board exam preparation',
    'Pakistani curriculum resources',
    'education with hamza pdf',
    'free study material',
    'FSc English notes',
  ],
}

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

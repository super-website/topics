import React from 'react'

import adsImg from '../../../public/images/ads.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import Content from '@/components/Content'
import { Metadata } from 'next'
import AdSlot from '@/components/AdsComponent'

export const metadata: Metadata = {
  title: 'Explore Topics',
  description:
    'Discover comprehensive, free educational resources tailored for students in Pakistan. Education With Hamza offers expertly crafted notes and learning materials for FSC, 1st year, and 2nd year students to help them succeed in board exams.',
  keywords: [
    'education with hamza',
    'fsc notes pakistan',
    '1st year notes',
    '2nd year notes',
    'free board exam preparation',
    'pakistani curriculum resources',
    'education with hamza pdf',
    'free study material',
    'fsc English notes',
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
          <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
          <AdSlot adClient='ca-pub-7339717436236652' adSlot='7306166999' />
        </div>
      </div>
    </>
  )
}

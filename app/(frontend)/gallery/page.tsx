import GalleryPage from '@/components/GalleryPage'
import { getAllGallery } from '@/utils/actions'
import Image from 'next/image'
import React from 'react'

export default async function Page() {
  const data = await getAllGallery()

  return <GalleryPage data={data} />
}

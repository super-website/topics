'use client'

import { useEffect, useState } from 'react'
import GalleryPage from '@/components/GalleryPage'
import { getAllGallery } from '@/utils/actions'

export default function GalleryWrapper() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchGallery() {
      try {
        const galleryData = await getAllGallery()
        setData(galleryData)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
      }
    }
    fetchGallery()
  }, [])

  return <GalleryPage data={data} />
}

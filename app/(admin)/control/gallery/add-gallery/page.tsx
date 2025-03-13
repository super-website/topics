import GalleryForm from '@/components/AddGalleryForm'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <GalleryForm />
      </Suspense>
    </div>
  )
}

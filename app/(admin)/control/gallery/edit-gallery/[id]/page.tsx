import EditGalleryForm from '@/components/EditGalleryForm'
import { getSingleGallery } from '@/utils/actions'
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await getSingleGallery(id)

  if (!data) {
    return <p>Gallery not found.</p>
  }
  return <EditGalleryForm data={data} />
}

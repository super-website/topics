import GalleryPage from '@/components/GalleryPage'
import { getAllGallery } from '@/utils/actions'
import Image from 'next/image'

export const revalidate = 0

export default async function Page() {
  const data = await getAllGallery()
  return <GalleryPage data={data} />
}

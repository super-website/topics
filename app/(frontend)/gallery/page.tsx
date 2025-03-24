import GalleryPage from '@/components/GalleryPage'
import { getAllGallery } from '@/utils/actions'

export const revalidate = 0

export const metadata = {
  title: 'Notes Gallery',
  description:
    'View the gallery of notes and images shared by students and teachers.',
  keywords:
    'notes, images, gallery, study resources, online education, learning',
  author: 'Ameer Muhavia',
}

export default async function Page() {
  const data = await getAllGallery()
  return <GalleryPage data={data} />
}

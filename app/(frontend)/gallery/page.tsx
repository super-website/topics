import { getAllGallery } from '@/utils/actions'
import Image from 'next/image'

interface Gallery {
  images: { public_id: string; secure_url: string }[] | string
}

export default function Page({ data }: { data: Gallery[] }) {
  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>📸 Notes Gallery</h1>
      {data.length === 0 ? (
        <p className='text-gray-500 text-center'>No images available.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2'>
          {data.map((gallery) => {
            let images: { public_id: string; secure_url: string }[] = []

            try {
              if (typeof gallery.images === 'string') {
                images = JSON.parse(gallery.images)
              } else if (Array.isArray(gallery.images)) {
                images = gallery.images as {
                  public_id: string
                  secure_url: string
                }[]
              }
            } catch (error) {
              console.error('Error parsing images:', error)
            }

            return images.map((image) => (
              <div key={image.public_id} className='relative group'>
                <Image
                  src={image.secure_url}
                  alt='Gallery Image'
                  width={300}
                  height={300}
                  className='w-full h-36 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-105'
                />
              </div>
            ))
          })}
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const data = await getAllGallery()
    return { props: { data } }
  } catch (error) {
    console.error('Error fetching gallery data:', error)
    return { props: { data: [] } }
  }
}

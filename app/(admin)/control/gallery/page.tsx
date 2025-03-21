import { getAllGallery, deleteGallery } from '@/utils/actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const galleries = await getAllGallery()

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='flex justify-between items-center flex-wrap mb-6'>
        <h1 className='text-2xl font-extrabold text-gray-800'>Gallery</h1>
        <Link
          href='/control/gallery/add-gallery'
          className='btn btn-primary px-6 py-2 rounded-lg text-white'
        >
          Add New
        </Link>
      </div>

      {/* Empty State */}
      {galleries.length === 0 ? (
        <p className='text-gray-500 text-center mt-4 text-lg'>
          No galleries available.
        </p>
      ) : (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {galleries.map((gallery) => {
            let images: { public_id: string; secure_url: string }[] = []

            // Safely parse gallery images
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

            return (
              <li
                key={gallery.id}
                className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              >
                {/* Gallery Title */}
                <h2 className='text-xl font-semibold text-center text-gray-800 mb-4'>
                  {gallery.title}
                </h2>

                {/* Images */}
                <div className='flex flex-wrap gap-4 justify-center'>
                  {images.length > 0 ? (
                    images.map((image) => (
                      <div
                        key={image.public_id}
                        className='w-24 h-24 overflow-hidden rounded-md shadow-sm'
                      >
                        <Image
                          src={image.secure_url}
                          alt={gallery.title}
                          width={96}
                          height={96}
                          className='object-cover w-full h-full'
                        />
                      </div>
                    ))
                  ) : (
                    <p className='text-gray-500 text-sm text-center mt-4'>
                      No images available.
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <div className='mt-6 flex justify-center'>
                  <form action={deleteGallery} method='POST'>
                    <input type='hidden' name='galleryId' value={gallery?.id} />
                    <button
                      type='submit'
                      className='px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition duration-200'
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

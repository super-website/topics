'use client'
import Image from 'next/image'
import React from 'react'

export default function GalleryPage({ data }: { data: any[] }) {
  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>📸 Notes Gallery</h1>
      {data.length === 0 ? (
        <p className='text-gray-500 text-center'>No images available.</p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
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
              <div
                key={image.public_id}
                className='relative group bg-gray-100 rounded-lg overflow-hidden shadow-md'
              >
                <Image
                  src={image.secure_url}
                  alt='Gallery Image'
                  width={300}
                  height={300}
                  className='w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105'
                />

                <button
                  onClick={async () => {
                    try {
                      const response = await fetch(image.secure_url)
                      const blob = await response.blob()
                      const blobUrl = URL.createObjectURL(blob)

                      const a = document.createElement('a')
                      a.href = blobUrl
                      a.download = 'image.jpg'
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)

                      URL.revokeObjectURL(blobUrl)
                    } catch (error) {
                      console.error('Error downloading image:', error)
                    }
                  }}
                >
                  Download Image
                </button>
              </div>
            ))
          })}
        </div>
      )}
    </div>
  )
}

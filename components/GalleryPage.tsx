'use client'
import Image from 'next/image'
import React from 'react'

export default function GalleryPage({ data }: { data: any[] }) {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>Gallery</h1>

      <div className='columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4'>
        {data.map((gallery) => (
          <div key={gallery.id} className='break-inside-avoid mb-4'>
            {gallery.images.map((image: any, index: number) => (
              <div
                key={index}
                className='relative group mb-4 rounded-lg overflow-hidden shadow-md bg-gray-100'
              >
                <Image
                  src={image.secure_url}
                  alt='Gallery Image'
                  width={300}
                  height={300}
                  className='w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105'
                />

                {/* Download Button on Hover */}
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
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >
                  Download Image
                </button>
              </div>
            ))}
            <p className='text-sm font-semibold px-2'>{gallery.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

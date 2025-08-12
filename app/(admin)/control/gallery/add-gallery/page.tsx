import GalleryForm from '@/components/AddGalleryForm'
import SubmitBtn from '@/components/SubmitBtn'
import { createGallery } from '@/utils/actions'
import React, { Suspense } from 'react'

export default function page({ params }: { params: { success: string } }) {
  const success = params.success
  return (
    <div>
      <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-4'>Add Gallery</h1>
        {success && (
          <p className='my-4 alert text-green-400'>
            Gallery Added Successfully
          </p>
        )}
        <form action={createGallery} className='space-y-4'>
          <label className='block'>
            <span className='font-medium text-gray-700'>Banner Title</span>
            <input
              name='title'
              required
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter Banner Title'
            />
          </label>

          <label className='block'>
            <span className='font-medium text-gray-700'>
              Text to Show (optional)
            </span>
            <input
              name='text'
              required
              className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter Text (one to two line)'
            />
          </label>

          <div className='mb-4'>
            <label
              htmlFor='file-upload'
              className='border-2 border-dashed border-blue-400 h-48 w-full flex items-center justify-center text-center text-lg text-gray-700 cursor-pointer'
            >
              Drop files here to upload
              <input
                id='file-upload'
                name='file'
                type='file'
                className='hidden'
              />
            </label>
          </div>

          <SubmitBtn />
        </form>
      </div>
    </div>
  )
}

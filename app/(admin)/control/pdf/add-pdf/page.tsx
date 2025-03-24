import { createPdf } from '@/utils/actions'
import React from 'react'

export default function page() {
  return (
    <div>
      <form action={createPdf} method='post'>
        <h1 className='text-2xl font-semibold'>Add Pdf</h1>

        <label className='block'>
          <span className='font-medium text-gray-700'>Title</span>
          <input
            name='title'
            required
            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter pdf title'
          />
        </label>

        <label className='block'>
          <span className='font-medium text-gray-700'>Pdf</span>
          <input
            name='pdf'
            type='file'
            required
            className='w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>

        <button
          type='submit'
          className='w-full px-3 py-2 mt-1 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Pdf
        </button>
      </form>
    </div>
  )
}

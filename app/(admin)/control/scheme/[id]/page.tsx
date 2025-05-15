import SubmitBtn from '@/components/SubmitBtn'
import { getSingleScheme, updateScheme } from '@/utils/actions'
import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const scheme = await getSingleScheme(id)

  return (
    <div>
      <h2>Edit Scheme</h2>

      <form
        method='POST'
        encType='multipart/form-data'
        action={updateScheme}
        className='space-y-4'
      >
        <input type='hidden' name='schemeId' value={id} />
        <input type='hidden' name='existingFile' value={scheme?.url || ''} />

        <div className='form-control'>
          <label htmlFor='title' className='block text-sm font-medium'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter Your Title'
            className='input input-bordered w-full mt-1'
            required
            defaultValue={scheme?.title}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='file-upload'
            className='border-2 border-dashed border-blue-400 h-48 w-full flex items-center justify-center text-center text-lg text-gray-700 cursor-pointer'
          >
            Click here to upload PDF
            <input
              id='file-upload'
              name='url'
              type='file'
              accept='application/pdf'
              className='hidden'
            />
          </label>
        </div>

        <div>
          <span className='text-sm text-gray-500'>
            Current file: {scheme?.url}
          </span>
        </div>

        <SubmitBtn />
      </form>
    </div>
  )
}

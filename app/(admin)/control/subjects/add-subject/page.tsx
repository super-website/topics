import { createSubject } from '@/utils/actions'
import React from 'react'

export default function page() {

  

  return (
    <div className='p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm'>
      <h1 className='text-3xl font-semibold mb-4'>Add Subject</h1>

      <form action={createSubject} method='POST' className='space-y-4'>
        <div className='form-control'>
          <label htmlFor='name' className='block text-sm font-medium'>
            Subject Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Enter Subject Name'
            className='input input-bordered w-full mt-1'
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='short_name' className='block text-sm font-medium'>
            Short Name
          </label>
          <input
            type='text'
            id='short_name'
            name='short_name'
            placeholder='Enter Short Name'
            className='input input-bordered w-full mt-1'
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor='short_desc' className='block text-sm font-medium'>
            Short Description
          </label>
          <textarea
            id='short_desc'
            name='short_desc'
            placeholder='Enter Some Info About Subject'
            className='textarea textarea-bordered w-full mt-1'
            required
          ></textarea>
        </div>

        <div className='form-control'>
          <label htmlFor='long_desc' className='block text-sm font-medium'>
            Tags
          </label>
          <input
            type='text'
            id='tags'
            name='tags'
            placeholder='Enter Tags'
            className='input input-bordered w-full mt-1'
            required
          />
        </div>

        <button type='submit' className='btn btn-primary w-full'>
          Submit
        </button>
      </form>
    </div>
  )
}

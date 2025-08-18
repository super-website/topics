import SubmitBtn from '@/components/SubmitBtn'
import { createGrade } from '@/utils/actions'
import React from 'react'

export default function page() {
  return (
    <div>
      <h2>Add Grade Form</h2>

      <form action={createGrade} className='form-control space-y-4'>
        <input
          type='text'
          name='title'
          placeholder='Enter Grade Title'
          className='input input-bordered'
        />
        <SubmitBtn text='submit' />
      </form>
    </div>
  )
}

import React from 'react'

export default function page() {
  return (
    <div>
      <div>
        <h2>Leave a Message</h2>
        <div className='form-label'>
          <input
            type='text'
            placeholder='Enter Your Name'
            className='input input-bordered focus:ring-blue-600'
            name='name'
          />
        </div>
        <div className='form-label'>
          <input
            type='email'
            placeholder='Enter Your Email'
            className='input input-bordered focus:ring-blue-600'
            name='email'
          />
        </div>
        <div className='form-label'>
          <textarea
            placeholder='Enter Your Message'
            className='textarea textarea-bordered focus:ring-blue-600'
            name='message'
          ></textarea>
        </div>
        <div className='form-label'>
          <button className='btn btn-primary'>Submit</button>
        </div>
      </div>

      <div></div>
    </div>
  )
}

import React from 'react'

export default function Page() {
  return (
    <div className='max-w-4xl mx-auto p-5 '>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='space-y-5'>
          <h2 className='text-2xl font-bold'>Leave a Message</h2>
          <div className='form-label'>
            <input
              type='text'
              placeholder='Enter Your Name'
              className='input input-bordered focus:ring-blue-600 w-full p-2'
              name='name'
            />
          </div>
          <div className='form-label'>
            <input
              type='email'
              placeholder='Enter Your Email'
              className='input input-bordered focus:ring-blue-600 w-full p-2'
              name='email'
            />
          </div>
          <div className='form-label'>
            <textarea
              placeholder='Enter Your Message'
              className='textarea textarea-bordered focus:ring-blue-600 w-full p-2'
              name='message'
            ></textarea>
          </div>
          <div className='form-label'>
            <button className='btn btn-primary px-6 py-2'>Submit</button>
          </div>
        </div>

        <div className='space-y-5'>
          <h2 className='text-2xl font-bold'>Reach Us</h2>
          <p className='text-gray-700'>
            Email:{' '}
            <a href='mailto:kamoffical@notes.com' className='text-blue-600'>
              kamoffical@notes.com
            </a>
          </p>
          <p className='text-gray-700'>
            Phone:{' '}
            <a href='tel:+000000000' className='text-blue-600'>
              +00 000000000
            </a>
          </p>
          <p className='text-gray-700'>
            Address:{' '}
            <span className='text-blue-600'>
              1234, Main Street, City, Country
            </span>
          </p>

          <h3>Social Media</h3>

          <div>
            <a
              href='https://facebook.com'
              className='text-blue-600 hover:underline'
            >
              Facebook
            </a>

            <a
              href='https://twitter.com'
              className='text-blue-600 hover:underline'
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

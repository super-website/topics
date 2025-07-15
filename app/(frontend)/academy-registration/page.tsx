import React from 'react'

export default function Page() {
  return (
    <div className=' py-6'>
      <div className='w-full max-w-5xl mx-auto  shadow-xl rounded-xl p-10'>
        <h1 className='text-4xl font-bold text-center text-primary mb-8'>
          Join Education With Hamza
        </h1>

        <form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Full Name */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='Enter your full name'
              className='input input-bordered'
              required
            />
          </div>

          {/* Email */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email Address</span>
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              className='input input-bordered'
              required
            />
          </div>

          {/* Phone Number */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Phone Number</span>
            </label>
            <input
              type='tel'
              placeholder='03XX-XXXXXXX'
              className='input input-bordered'
              required
            />
          </div>

          {/* Course Selection */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'> Course</span>
            </label>
            <input
              type='text'
              placeholder='e.g., English, Computer Science, Mathematics'
              className='input input-bordered'
              required
            />
          </div>

          <div className='form-control md:col-span-2'>
            <label className='label'>
              <span className='label-text'>Class</span>
            </label>
            <select className='select select-bordered'>
              <option disabled selected>
                Class
              </option>
              <option>9th</option>
              <option>10th</option>
              <option>1st Year</option>
              <option>2nd Year</option>
            </select>
          </div>

          {/* City */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>City</span>
            </label>
            <input
              type='text'
              placeholder='e.g., Lahore, Karachi'
              className='input input-bordered'
            />
          </div>

          {/* Preferred Time */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Preferred Time</span>
            </label>
            <select className='select select-bordered'>
              <option disabled selected>
                Morning / Evening
              </option>
              <option>Morning</option>
              <option>Evening</option>
            </select>
          </div>

          <div className='form-control md:col-span-2'>
            <label className='label'>
              <span className='label-text'>Additional Message</span>
            </label>
            <textarea
              className='textarea textarea-bordered'
              placeholder='Any specific requirements or questions?'
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button (Centered full width) */}
          <div className='form-control md:col-span-2 flex justify-center mt-4'>
            <button type='submit' className='btn btn-primary px-12'>
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

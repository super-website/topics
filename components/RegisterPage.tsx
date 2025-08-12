'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import SubmitBtn from './SubmitBtn'
import { createUser, userLogin } from '@/utils/actions'

export default function RegisterPage() {
  const [isMember, setIsMember] = useState(true)
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const success = searchParams.get('success')
  const path = searchParams.get('path')

  useEffect(() => {
    if (path === 'register') {
      setIsMember(false)
    }
  }, [path])

  return (
    <div className='min-h-screen bg-gradient-to-r from-green-100 via-white to-blue-100 px-4 w-full flex items-center justify-center'>
      <div className='flex w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white flex-col md:flex-row'>
        <div className='md:w-1/2 w-full p-10 bg-gradient-to-br from-green-50 to-white'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            🎓 Welcome to{' '}
            <span className='text-green-600'>Hamza Education</span>
          </h1>
          <p className='text-lg text-gray-600 mb-8'>
            Unlock your learning journey with high-quality educational resources
            curated by Hamza.
          </p>
          <button
            className='btn btn-success rounded-full px-8 py-3 text-white shadow-md hover:scale-105 transition'
            onClick={() => setIsMember(!isMember)}
          >
            {isMember
              ? 'Need an account? Register'
              : 'Already have an account? Login'}
          </button>

          <ul className='mt-6 space-y-2'>
            <li className='text-sm text-gray-600 mt-4'>
              <span className='font-semibold'>Why Join?</span>
            </li>
            <li className='text-sm text-gray-600'>
              📚 Access expert-led courses and study materials
            </li>
            <li className='text-sm text-gray-600'>
              🧠 Learn at your own pace with self-guided modules
            </li>
            <li className='text-sm text-gray-600'>
              🌍 Join a community of passionate learners
            </li>
          </ul>
        </div>

        <div className='md:w-1/2 w-full p-10 bg-white border-l border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            {isMember ? '🔐 Login to Your Account' : '📝 Create an Account'}
          </h2>

          {error && (
            <div className='mb-4 bg-red-100 text-red-800 p-3 rounded-md shadow-md'>
              <p className='text-sm font-medium'>Error: {error}</p>
            </div>
          )}

          {success && (
            <div className='mb-4 bg-green-100 text-green-800 p-3 rounded-md shadow-md'>
              <p className='text-sm font-medium'>Success: {success}</p>
            </div>
          )}

          <form action={isMember ? userLogin : createUser}>
            {!isMember && (
              <input
                type='text'
                name='name'
                placeholder='Full Name'
                className='input input-bordered w-full mb-4'
                required
              />
            )}

            <input
              type='email'
              name='email'
              placeholder='Email'
              className='input input-bordered w-full mb-4'
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='input input-bordered w-full mb-6'
              required
            />

            <SubmitBtn text={isMember ? 'Login' : 'Register'} />
          </form>
        </div>
      </div>
    </div>
  )
}

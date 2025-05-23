'use client'
import { subscribeEmail } from '@/utils/actions'
import React, { useRef, useState, useEffect } from 'react'

export default function NewsLetter() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const formRef = useRef<HTMLFormElement>(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formRef.current!)

    try {
      await subscribeEmail(formData)
      setSuccess(true)
      setError(false)
      formRef.current?.reset()
    } catch (err: any) {
      console.error('Error submitting email:', err)

      setErrorMsg('Something went wrong. Please try again.')

      setSuccess(false)
      setError(true)
    }
  }

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false)
        setError(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success, error])

  return (
    <section className='mt-24 py-16 bg-base-200 text-center rounded-xl px-10 md:px-4'>
      <h2 className='text-2xl font-bold mb-4'>Stay in the loop</h2>
      <p className='mb-6'>
        Subscribe to get the latest topics, schemes, and resources.
      </p>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto'
        ref={formRef}
        method='post'
      >
        <input
          type='email'
          name='email'
          required
          placeholder='Enter your email'
          className='input input-bordered w-full'
        />
        <button type='submit' className='btn btn-primary'>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {success && (
        <div className='mt-6 bg-green-100 text-green-700 p-4 rounded'>
          <p className='font-bold'>Success</p>
          <p>You have successfully subscribed to the newsletter.</p>
        </div>
      )}

      {error && (
        <div className='mt-6 bg-red-100 text-red-700 p-4 rounded'>
          <p className='font-bold'>Error</p>
          <p>{errorMsg}</p>
        </div>
      )}
    </section>
  )
}

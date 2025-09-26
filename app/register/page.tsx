import RegisterPage from '@/components/RegisterPage'
import SubmitBtn from '@/components/SubmitBtn'
import { createUser, userLogin } from '@/utils/actions'
import { Metadata } from 'next'
import Link from 'next/link'
import React, { Suspense } from 'react'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const error =
    typeof (await searchParams).error === 'string'
      ? (await searchParams).error
      : undefined

  if (!error) {
    return {
      title: 'Register',
      description:
        'Create an account to start learning with Hamza’s educational resources.',
      keywords: [
        'register',
        'signup',
        'create account',
        'education',
        'learning',
        'Hamza',
      ],
    }
  }

  return {
    title: `${error} - Register | Education with Hamza`,
    description: `Registration error: ${error}. Please correct and try again.`,
    keywords: ['registration error', 'signup', 'education', 'Hamza'],
  }
}

export default async function Page({ searchParams }: Props) {
  const { success } = await searchParams

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 md:px-0 md:py-0'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl p-8'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Create an account
        </h2>
        <p className='text-center text-sm text-gray-500 mb-4'>
          Register to create your account
        </p>

        <div className='divider text-xs'>Continue with</div>

        {success && (
          <p className='text-green-600 text-center mb-4'>
            Registration successful! Please log in.
          </p>
        )}

        <form action={createUser}>
          <label className='form-control w-full mb-2'>
            <div className='label'>
              <span className='label-text'>Name</span>
            </div>
            <input
              type='text'
              placeholder='Hamza Ali'
              name='name'
              required
              className='input input-bordered w-full'
            />
          </label>

          <label className='form-control w-full mb-2'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='email'
              placeholder='m@example.com'
              name='email'
              required
              className='input input-bordered w-full'
            />
          </label>

          <div className='flex justify-between items-center'>
            <label className='label label-text'>Password</label>
            {/* <a href='#' className='label-text-alt link link-hover text-sm'>
              Forgot your password?
            </a> */}
          </div>
          <input
            type='password'
            placeholder='••••••••'
            name='password'
            required
            className='input input-bordered w-full mb-4'
          />

          <SubmitBtn
            text='Register'
            className='btn btn-neutral w-full capitalize'
          />
        </form>

        <p className='text-center text-sm mt-4'>
          Already have an account?
          <Link href='/login' className='link link-hover'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

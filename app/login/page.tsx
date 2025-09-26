import RegisterPage from '@/components/RegisterPage'
import SubmitBtn from '@/components/SubmitBtn'
import { userLogin } from '@/utils/actions'
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
      title: 'Login',
      description:
        'Access your account to continue learning with Hamza’s educational resources.',
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
    title: `${error} - Login `,
    description: `Registration error: ${error}. Please correct and try again.`,
    keywords: ['registration error', 'signup', 'education', 'Hamza'],
  }
}

export default async function Page({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 md:px-0 md:py-0'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl p-8'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Welcome back
        </h2>
        <p className='text-center text-sm text-gray-500 mb-4'>
          Please login to your account
        </p>

        <div className='divider text-xs'>Continue with</div>

        {error && (
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'>
            {error}
          </div>
        )}

        <form action={userLogin}>
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
          </div>
          <input
            type='password'
            placeholder='••••••••'
            name='password'
            required
            className='input input-bordered w-full mb-4'
          />

          <SubmitBtn
            text='login'
            className='btn btn-neutral w-full capitalize'
          />
        </form>

        <p className='text-center text-sm mt-4'>
          Don’t have an account?
          <Link href='/register' className='link link-hover'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

import RegisterPage from '@/components/RegisterPage'
import { Metadata } from 'next'
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { FileImage, Send } from 'lucide-react'
import Link from 'next/link'
import { createQuestion } from '@/utils/actions'
import { getUserId } from '@/utils/utils'

export const metadata = {
  title: 'Ask a Question ',
  description:
    'Have a question? Ask the community for help on various educational topics at Education With Hamza.',
  keywords: [
    'questions',
    'ask questions',
    'educational help',
    'community support',
    'learning resources',
    'FSC questions',
    '9th class questions',
    '10th class questions',
    'education with hamza',
  ],
  author: 'Education With Hamza Team',
  robots: 'index, follow',
}

export default async function AskPage() {
  const userId = await getUserId()

  if (!userId) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 text-center min-h-screen flex flex-col justify-center '>
        <h1 className='text-3xl font-bold mb-4'>401 - Unauthorized</h1>
        <p className='text-gray-500 mb-4'>
          You must be logged in to ask a question.
        </p>
        <Link href='/login' className='btn btn-primary'>
          Login
        </Link>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className='max-w-2xl mx-auto py-10 px-4 text-center'>
        <h1 className='text-3xl font-bold mb-4'>401 - Unauthorized</h1>
        <p className='text-gray-500 mb-4'>User not found in token.</p>
        <Link href='/login' className='btn btn-primary'>
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Ask a Question</h1>
        <p className='text-gray-500'>Submit your question to the community.</p>
      </div>

      <form action={createQuestion} className='space-y-6'>
        <input type='hidden' name='authorId' value={userId} />

        <div>
          <label className='label'>
            <span className='label-text font-semibold'>Title</span>
          </label>
          <input
            type='text'
            name='title'
            required
            placeholder='e.g., How to solve quadratic equations?'
            className='input input-bordered w-full'
          />
        </div>

        <div>
          <label className='label'>
            <span className='label-text font-semibold'>Question Details</span>
          </label>
          <textarea
            name='body'
            required
            placeholder="Provide more details about your question. You can include what you've tried and where you're stuck."
            className='textarea textarea-bordered w-full min-h-[120px]'
          ></textarea>
        </div>

        <div>
          <label className='label'>
            <span className='label-text font-semibold flex items-center gap-2'>
              <FileImage className='w-4 h-4' />
              Optional Image
            </span>
          </label>
          <input
            type='file'
            name='image'
            accept='image/*'
            className='file-input file-input-bordered w-full'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='btn btn-primary flex gap-2 items-center'
          >
            <Send className='w-4 h-4' />
            Submit Question
          </button>
        </div>
      </form>

      <div className='mt-6 text-sm text-gray-400'>
        <Link href='/questions' className='link link-hover'>
          ← Back to Questions
        </Link>
      </div>
    </div>
  )
}

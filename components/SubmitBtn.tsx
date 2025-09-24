'use client'

import { useFormStatus } from 'react-dom'

interface SubmitBtnProps {
  text?: string
  className?: string
}

export default function SubmitBtn({ text, className }: SubmitBtnProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={className ? className : 'btn btn-primary px-6 py-2 w-full'}
      disabled={pending}
    >
      {pending ? (
        <span className='loading loading-spinner' />
      ) : (
        text || 'Submit'
      )}
    </button>
  )
}

import React from 'react'

export default function DeleteBtn({
  id,
  deleteAction,
}: {
  id: string
  deleteAction: (formData: FormData) => Promise<void>
}) {
  return (
    <form action={deleteAction}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' className='btn btn-error'>
        Delete
      </button>
    </form>
  )
}

import SinglePdf from '@/components/SinglePdf'
import { getSinglePdf } from '@/utils/actions'
import React from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const pdf = await getSinglePdf(id)

  if (!pdf) {
    return <div className='p-4 text-red-500'>PDF not found.</div>
  }

  return <SinglePdf pdf={pdf} />
}

import SinglePdf from '@/components/SinglePdf'
import { getSinglePdf } from '@/utils/actions'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const pdf = await getSinglePdf(params.id)

  if (!pdf) {
    return {
      title: 'PDF Not Found',
      description: 'This PDF does not exist.',
      keywords: ['not found', 'error', 'missing pdf'],
    }
  }

  return {
    title: pdf.title,
    description: `Learn more about ${pdf.title}`,
    keywords: pdf.title.toLowerCase().split(' '),
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const pdf = await getSinglePdf(id)

  if (!pdf) {
    return <div className='p-4 text-red-500'>PDF not found.</div>
  }

  return <SinglePdf pdf={pdf} />
}

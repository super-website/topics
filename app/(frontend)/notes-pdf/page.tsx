import React from 'react'
import { getAllPdf } from '@/utils/actions'
import PDFCard from '@/components/PDFCard'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const pdfs = await getAllPdf('', 100)

  const allTags = pdfs.flatMap((pdf) => pdf.tags || [''])

  return {
    title: 'Educational Resources',
    description:
      'Browse and download comprehensive educational resources in PDF format.',
    keywords: allTags,
  }
}

export const revalidate = 0

export default async function Page() {
  const initialPdfs = await getAllPdf('', 25)

  return <PDFCard initialPdfs={initialPdfs} />
}

import React from 'react'

import { getAllPdf } from '@/utils/actions'
import PDFCard from '@/components/PDFCard'

interface Pdf {
  id: string
  title: string
  url: string
}

export const revalidate = 0

export default async function Page({ searchParams }: { searchParams: string }) {
  const urlParams = new URLSearchParams(searchParams)

  const query = urlParams.get('query') || ''

  const pdf: Pdf[] = await getAllPdf(query)
  return <PDFCard pdfs={pdf} query={query} />
}

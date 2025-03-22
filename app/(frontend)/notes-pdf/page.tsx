import React from 'react'

import { getAllPdf } from '@/utils/actions'
import PDFCard from '@/components/PDFCard'

interface Pdf {
  id: string
  title: string
  url: string
}

export const revalidate = 0

export default async function Page() {
  const pdf: Pdf[] = await getAllPdf()
  return <PDFCard pdfs={pdf} />
}

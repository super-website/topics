import React from 'react'
import { getAllPdf } from '@/utils/actions'
import PDFCard from '@/components/PDFCard'

export const metadata = {
  title: 'Educational Resources',
  description:
    'Explore a comprehensive gallery of student notes, study materials, and educational resources in PDF format, shared by students and educators.',
  keywords:
    'student notes, study resources, educational PDFs, online learning materials, classroom resources, notes gallery, teacher and student notes, study guides, education with hamza, notes pdf, education notes pdf , 1st class notes, 2nd yeay notes',
  author: 'Ameer Muhavia',
}

export const revalidate = 0

export default async function Page() {
  const initialPdfs = await getAllPdf('', 25)

  return <PDFCard initialPdfs={initialPdfs} />
}

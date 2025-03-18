import HomeSubject from '@/components/HomeSubject'
import { getAllSubject } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: 'Subjects - Education With US',
  description:
    'Explore various MBA subjects with detailed topics to enhance your learning experience.',
  keywords:
    'MBA, MBA subjects, online education, learning, study resources, business management',
  author: 'Ameer Muhavia',
}

interface Topic {
  id: string
  short_desc: string
  title: string
  long_desc: string
  createdAt: Date
  subjectId: string | null
}

interface Subject {
  id: string
  short_name: string
  name: string
  short_desc: string
  topics: Topic[]
}

export default async function Page() {
  let subjects: Subject[] = []

  try {
    subjects = await getAllSubject()
  } catch (error) {
    console.error('Error fetching subjects:', error)
  }

  if (subjects.length === 0) {
    return <p>No subjects found. Please try again later.</p>
  }

  return <HomeSubject subjects={subjects} />
}

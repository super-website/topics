import AddNewTopic from '@/components/AddNewTopic'
import { getAllSubject } from '@/utils/actions'
import { Suspense } from 'react'

interface Subject {
  id: string
  name: string
  short_name: string
  short_desc: string
}

export default async function AddTopic() {
  const subjects: Subject[] = (await getAllSubject()) || []

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNewTopic subjects={subjects} />;
    </Suspense>
  )
}

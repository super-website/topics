import AddNewTopic from '@/components/AddNewTopic'
import { getAllSubject } from '@/utils/actions'

interface Subject {
  id: string
  name: string
  short_name: string
  short_desc: string
}

export const revalidate = 0

export default async function AddTopic() {
  const subjects: Subject[] = await getAllSubject()

  return (
    <div>
      <AddNewTopic subjects={subjects} />
    </div>
  )
}

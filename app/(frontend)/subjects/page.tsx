import { getAllSubject } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: ' Top Subjects',
  description:
    'Explore various MBA subjects with detailed topics to enhance your learning experience.',
  keywords:
    'MBA, MBA subjects, online education, learning, study resources, business management',
  author: 'Ameer Muhavia',
}

export const revalidate = 0

export default async function Page() {
  const subjects = await getAllSubject()
  return (
    <div className='max-w-2xl mx-auto px-4 py-6'>
      <h1 className='text-2xl font-semibold mb-4'>Subjects</h1>
      <div className='space-y-10'>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='card border rounded-none p-4 bg-base-100'
          >
            <Link
              href={`/subject/${subject.id}`}
              className='text-blue-600 font-medium text-lg hover:underline cursor-pointer'
            >
              {subject.name}
            </Link>
            <p className='text-gray-500 text-sm'>
              Contains ({subject.topics.length}) topics.
            </p>
            <p className='text-sm mt-4 text-black'>{subject.short_desc}</p>
          </div>
        ))}
      </div>

      <div className='prose mx-auto px-6 md:px-10 py-10 max-w-4xl text-justify mt-10'>
        <h2 className='text-2xl font-bold mb-4 text-center'>
          Explore Subjects & Resources
        </h2>
        <p className='my-5'>
          This section offers a wide range of subjects to help you navigate your
          academic interests more effectively. Whether you're studying for
          exams, revising concepts, or diving deeper into a particular topic,
          each subject page connects you with curated study materials,
          topic-wise notes, and helpful resources.
        </p>
        <p className='my-5'>
          All subjects include organized collections of PDFs, summaries, and
          reference content created or shared by educators and learners. These
          materials are freely available for personal and educational use. If
          you encounter any content that may require proper attribution or
          removal, please reach out to us.
        </p>
        <p>
          We continuously update subjects with the latest and most relevant
          material. Bookmark your favorite subjects and check back regularly for
          new content. Whether you're in school, college, or just exploring a
          new topic, you'll find reliable and well-structured support here.
        </p>
      </div>
    </div>
  )
}

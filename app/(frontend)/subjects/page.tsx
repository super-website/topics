import { getAllSubject } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: ' Top Subjects',
  description:
    'Explore a variety of subjects with comprehensive study resources and online courses at Education With Hamza.',
  keywords:
    'online education, FSC notes, 1st year, 2nd year, board exam prep, education with hamza, study resources, e-learning, free study material',
  author: 'Ameer Muhavia',
}

export const revalidate = 0

export default async function Page() {
  const subjects = await getAllSubject()
  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <div className='breadcrumbs text-sm'>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>Subjects</li>
        </ul>
      </div>

      <h1 className='text-2xl font-semibold mb-4'>
        Subjects | Education With Hamza
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]'
          >
            <div>
              <Link
                href={`/subject/${subject.id}`}
                className='text-blue-500 text-xl font-semibold hover:underline'
              >
                {subject.name}
              </Link>
              <p className='text-sm text-black mt-1'>
                Contains ({subject.topics.length}) topics
              </p>
              <p className='text-gray-700 text-sm mt-4 text-justify'>
                {subject.short_desc.substring(0, 150) + '...'}
              </p>
            </div>

            <div className='mt-6 flex justify-between items-center'>
              <div>
                <span className='text-xs text-black/60 italic'>
                  {subject.class?.title}
                </span>
              </div>
              <Link
                href={`/subject/${subject.id}`}
                className='btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition'
              >
                Visit
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='prose  px-6 md:px-10 py-10 text-justify mt-10 '>
        <h2 className='text-2xl font-bold mb-4 '>
          Explore Subjects & Resources
        </h2>
        <p className='my-5'>
          This section offers a wide range of subjects to help you navigate your
          academic interests more effectively. Whether you &#39; re studying for
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
          new content. Whether you &#39; re in school, college, or just
          exploring a new topic, you &#39; ll find reliable and well-structured
          support here.
        </p>
      </div>
    </div>
  )
}

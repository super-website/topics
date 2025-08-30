import { getAllSubject, getClass } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: 'Explore Grades',
  description:
    'Discover a variety of academic grades with tailored study resources and online courses at Education With Hamza.',
  keywords:
    'online education, FSC notes, 1st year, 2nd year, board exam prep, education with hamza, study resources, e-learning, free study material',
  author: 'Ameer Muhavia',
}

export const revalidate = 0

export default async function Page() {
  const grades = await getClass()

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='md:text-3xl font-bold text-sm mb-8 text-center'>
        Explore Grades
      </h1>

      {grades.length === 0 ? (
        <p className='text-center text-gray-500'>
          No grades available at the moment.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {grades.map((grade) => (
            <div
              key={grade.id}
              className='bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]'
            >
              <div>
                <Link
                  href={`/grades/${grade.slug}`}
                  className='text-cyan-600 text-xl font-semibold hover:underline'
                >
                  {grade.title}
                </Link>
                <p className='text-gray-700 text-sm mt-4'>
                  {grade.short_desc &&
                    grade?.short_desc.substring(0, 100) + '...'}
                </p>
              </div>

              <div className='mt-6 flex justify-end'>
                <Link
                  href={`/grades/${grade.slug}`}
                  className='px-5 py-2 rounded-full bg-[#A8F1FF] text-black text-sm font-medium hover:bg-[#A8F1F0] transition-colors duration-200'
                >
                  Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='prose prose-sm sm:prose-base max-w-4xl mx-auto mt-14 text-justify text-gray-700'>
        <h2 className='text-[#4ED7F1]'>📖 Explore Subjects & Resources</h2>
        <p>
          This section offers a wide range of subjects to help you navigate your
          academic interests more effectively. Whether you&apose;re studying for
          exams, revising concepts, or diving deeper into a particular topic,
          each subject page connects you with curated study materials,
          topic-wise notes, and helpful resources.
        </p>
        <p>
          All subjects include organized collections of PDFs, summaries, and
          reference content created or shared by educators and learners. These
          materials are freely available for personal and educational use. If
          you encounter any content that may require proper attribution or
          removal, please reach out to us.
        </p>
        <p>
          We continuously update subjects with the latest and most relevant
          material. Bookmark your favorite subjects and check back regularly for
          new content. Whether you&apose;re in school, college, or just
          exploring a new topic, you&apose;ll find reliable and well-structured
          support here.
        </p>
      </div>
    </div>
  )
}

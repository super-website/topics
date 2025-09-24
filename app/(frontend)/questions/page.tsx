import { getAllQuestions } from '@/utils/actions'
import Link from 'next/link'

export const metadata = {
  title: 'All Questions',
  description:
    'Browse and ask questions on various educational topics. Get answers from experts and the community at Education With Hamza.',
  keywords: [
    'questions',
    'ask questions',
    'educational help',
    'community support',
    'learning resources',
    'FSC questions',
    '9th class questions',
    '10th class questions',
    'education with hamza',
  ],
  author: 'Education With Hamza Team',
  robots: 'index, follow',
}

export default async function Page() {
  const questions = await getAllQuestions()

  return (
    <div className='max-w-3xl mx-auto pt-16 pb-40 px-4 '>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Questions</h1>
        <Link href='/questions/ask' className='btn btn-primary'>
          Ask Question
        </Link>
      </div>
      {questions.length === 0 ? (
        <p className='text-gray-500'>No questions found.</p>
      ) : (
        <ul className='space-y-4'>
          {questions.map((question) => (
            <li key={question.id} className='border p-4 rounded-lg'>
              <Link href={`/questions/${question.id}`}>
                <h2 className='text-xl font-semibold text-blue-600 hover:underline'>
                  {question.title}
                </h2>
              </Link>
              <p className='text-gray-700 mt-2'>
                {question.body.length > 150
                  ? question.body.slice(0, 150) + '...'
                  : question.body}
              </p>
              <p className='text-sm text-gray-500 mt-2'>
                Asked on {new Date(question.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

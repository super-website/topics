import { createAnswer, getQuestion } from '@/utils/actions'
import Link from 'next/link'
import Image from 'next/image'
import { getUserId } from '@/utils/utils'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const question = await getQuestion(params.id)

  if (!question) {
    return {
      title: 'Question Not Found',
      description: 'This article does not exist.',
      keywords: ['not found', 'error', 'missing article'],
    }
  }

  return {
    title: question.title.toLocaleUpperCase() || 'Question',
    description:
      `${question.title} is written by ${
        question.author.name || 'an anonymous author'
      }` || 'Learn more about this question.',
    keywords: question.title || question.title?.split(' ') || [],
    authors: [
      {
        name: question.author.name || 'Anonymous',
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL ||
          'https://educationwithhamza.vercel.app/'
        }/questions/${question.id}`,
      },
    ],
  }
}

export default async function Page({ params }: Props) {
  const question = await getQuestion(params.id)
  const userId = await getUserId()

  if (!question) {
    return (
      <div className='p-6 text-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Question Not Found</h1>
        <p className='mt-4 text-gray-600'>
          The question with the provided ID does not exist.
        </p>
        <Link href='/questions' className='btn btn-primary mt-4'>
          Back to Questions
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto py-10 px-4'>
      <nav className='text-sm breadcrumbs mb-6'>
        <ul className='flex gap-1 text-gray-600'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/questions'>Questions</Link>
          </li>
          <li>
            <span className='text-gray-800 capitalize'>{question.title}</span>
          </li>
        </ul>
      </nav>

      <h1 className='text-3xl font-bold mb-2 capitalize'>
        {' '}
        Q: {question.title}
      </h1>

      <p className='text-sm text-gray-500 mb-6'>
        Asked on {new Date(question.createdAt).toLocaleDateString()} by{' '}
        {question.author.name || 'Anonymous'}
      </p>

      <div className='flex flex-col md:flex-row md:gap-6 justify-between '>
        <div className='prose max-w-none mb-6 md:mb-0 shadow-sm p-6 rounded-lg bg-white border'>
          <h3 className='text-xl font-semibold mb-4'>Details</h3>
          <p>{question.body}</p>
        </div>

        {question.imageUrl && (
          <div className='mb-6 md:mb-0'>
            <Image
              src={question.imageUrl}
              alt='Attached screenshot'
              width={400}
              height={200}
              className='rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out'
            />
          </div>
        )}
      </div>

      <hr className='my-10' />

      <section>
        <h2 className='text-2xl font-semibold mb-6'>
          {question.answers.length}{' '}
          {question.answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>

        {question.answers.length === 0 && (
          <p className='text-gray-600'>
            No answers yet. Be the first to answer!
          </p>
        )}

        <ul className='space-y-8'>
          {question.answers.map((answer) => (
            <li
              key={answer.id}
              className='border rounded-md p-6 shadow-lg bg-white hover:bg-gray-50 transition-all'
            >
              <div className='flex items-start space-x-4'>
                <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold'>
                  {answer.author.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>

                <div className='flex-1'>
                  <p className='prose max-w-none'>{answer.body}</p>
                  <p className='text-xs text-gray-400 mt-2'>
                    Answered on{' '}
                    {new Date(answer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {userId ? (
        <section className='mt-12'>
          <h3 className='text-xl font-semibold mb-4'>Your Answer</h3>
          <form className='flex flex-col gap-4' action={createAnswer}>
            <textarea
              name='body'
              rows={5}
              required
              placeholder='Write your answer here...'
              className='border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input type='hidden' name='questionId' value={question.id} />
            <input type='hidden' name='authorId' value={userId} />

            <button
              type='submit'
              className='btn btn-primary w-max px-6 py-2 rounded-md'
            >
              Submit Answer
            </button>
          </form>
        </section>
      ) : (
        <p className='mt-12 text-gray-600'>
          <Link href='/login' className='text-blue-600 hover:underline'>
            Log in
          </Link>{' '}
          to submit an answer.
        </p>
      )}
    </div>
  )
}

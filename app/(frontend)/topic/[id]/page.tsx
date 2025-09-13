import { getAllTopics, getSingleTopic } from '@/utils/actions'
import Link from 'next/link'
import { Metadata } from 'next'
import AdSlot from '@/components/AdsComponent'

interface Topic {
  id: string
  title: string
  short_desc: string
  createdAt: Date
  subject?: {
    id: string
    short_name: string
  } | null
}

type Props = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const topic = await getSingleTopic(params.id)

  if (!topic) {
    return {
      title: 'Topic Not Found',
      description: 'This topic does not exist.',
      keywords: ['not found', 'error', 'missing topic'],
    }
  }

  return {
    title: topic.title || 'Topic',
    description: topic.short_desc || 'Learn more about this topic.',
    keywords: topic.tags || [],
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const topic = await getSingleTopic(params.id)
  const topicsData = await getAllTopics('')

  if (!topic) {
    return (
      <p className='text-red-500 text-center mt-10 text-lg'>Topic not found.</p>
    )
  }

  const relatedTopics = (topicsData || []).filter(
    (t) => t?.subject?.id === topic.subject?.id && t.id !== topic.id
  )

  return (
    <div className='max-w-3xl mx-auto px-4 py-10 space-y-8'>
      {/* Breadcrumb */}
      <nav className='text-sm breadcrumbs'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          {topic.subject && (
            <li>
              <Link href={`/subject/${topic.subject.id}`}>
                {topic.subject.short_name}
              </Link>
            </li>
          )}
          <li>
            <span className='text-gray-800'>{topic.title}</span>
          </li>
        </ul>
      </nav>
      {/* Topic Title and Short Description */}{' '}
      <h1 className='text-3xl font-bold text-gray-900'>{topic.title}</h1>
      <div className=' p-4 rounded-md shadow-md border border-gray-200'>
        <p className='text-gray-700 text-sm'>{topic.short_desc}</p>
      </div>
      {/* Ad */}
      <div className='text-center'>
        <p className='text-xs text-gray-500 mb-1'>Advertisement</p>
        <AdSlot
          adClient='ca-pub-7339717436236652'
          adSlot='7306166999'
          style={{ display: 'block', minHeight: 100 }}
        />
      </div>
      {/* Topic Detail */}
      <div className='bg-white p-6 shadow-md rounded-md space-y-4'>
        <h1 className='text-2xl font-bold border-b pb-2'>{topic.title}</h1>
        <div className='prose prose-sm max-w-none text-gray-800'>
          <div dangerouslySetInnerHTML={{ __html: topic.long_desc || '' }} />
        </div>
        <div className='flex justify-between text-sm text-gray-600 pt-4 border-t'>
          <span>
            {topic.createdAt
              ? new Date(topic.createdAt).toLocaleDateString()
              : 'N/A'}
          </span>
          {topic.subject?.short_name && (
            <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full'>
              {topic.subject.short_name}
            </span>
          )}
        </div>
      </div>
      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-gray-800'>
            More from {topic.subject?.short_name}
          </h2>

          {relatedTopics.map((t) => (
            <div key={t.id} className='bg-white p-4 rounded-md shadow-sm'>
              <Link
                href={`/topic/${t.id}`}
                className='text-blue-600 font-semibold hover:underline'
              >
                {t.title}
              </Link>
              <p className='text-sm text-gray-700 mt-2'>
                {t.short_desc.length > 200 ? (
                  <>
                    {t.short_desc.slice(0, 200)}...
                    <Link
                      href={`/topic/${t.id}`}
                      className='text-primary font-medium ml-1'
                    >
                      Read more
                    </Link>
                  </>
                ) : (
                  t.short_desc
                )}
              </p>
              <div className='flex justify-between text-sm text-gray-500 mt-3'>
                <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                {t.subject && (
                  <Link
                    href={`/subject/${t.subject.id}`}
                    className='text-blue-600 hover:underline'
                  >
                    {t.subject.short_name}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

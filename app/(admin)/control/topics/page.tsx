import DeleteBtn from '@/components/DeleteBtn'
import { deleteTopic, getAllTopics } from '@/utils/actions'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Topic {
  id: string
  title: string
  short_desc: string
  long_desc: string
  createdAt: Date
  subject?: {
    id: string
    short_name: string
  } | null
  tags?: string[]
}

export default async function Page() {
  const topics: Topic[] = await getAllTopics('')

  return (
    <div>
      <nav className='text-sm breadcrumbs m-2'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/cms'>Dashboard</Link>
          </li>
          <li>
            <span className='text-gray-800'>Topics</span>
          </li>
        </ul>
      </nav>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-800'>
                Topics Table View
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  href='/control/topics/add-topic'
                  className='btn btn-primary btn-xs'
                >
                  Add New
                </Link>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Subject
                  </th>

                  <th className='px-4 py-4 text-left text-sm font-semibold text-slate-700'>
                    Created At
                  </th>
                  <th className='px-6 py-4 text-right text-sm font-semibold text-slate-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {topics.map((topic) => (
                  <tr
                    key={topic.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <div className='font-semibold text-slate-800'>
                            {topic.title}
                          </div>
                          <div className='text-sm text-slate-500'>Topic</div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      <code className='px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm'>
                        {topic.subject?.short_name || 'N/A'}
                      </code>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='font-semibold text-slate-800'>
                        {topic.createdAt
                          ? new Date(topic.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </div>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Link
                          href={`topics/edit-topic/${topic.id}`}
                          className='p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          title='Edit Artist'
                        >
                          <Edit className='w-4 h-4' />
                        </Link>

                        <form
                          action={deleteTopic}
                          method='POST'
                          className='inline-block'
                        >
                          <input type='hidden' name='slug' value={topic.id} />
                          <button
                            type='submit'
                            className='p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='Delete topic'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

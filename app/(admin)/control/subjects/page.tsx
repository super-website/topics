import DeleteBtn from '@/components/DeleteBtn'
import { deleteSubject, getAllSubject } from '@/utils/actions'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function page() {
  const data = await getAllSubject()

  return (
    <div>
      <nav className='text-sm breadcrumbs m-2'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/cms'>Dashboard</Link>
          </li>
          <li>
            <span className='text-gray-800'>Subjects</span>
          </li>
        </ul>
      </nav>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-800'>
                Subjects Table View
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  href='/control/subjects/add-subject'
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
                    Short Name
                  </th>

                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Topics
                  </th>
                  <th className='px-6 py-4 text-right text-sm font-semibold text-slate-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {data.map((subject) => (
                  <tr
                    key={subject.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <div className='font-semibold text-slate-800'>
                            {subject.name}
                          </div>
                          <div className='text-sm text-slate-500'>Subject</div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      <code className='px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm'>
                        {subject.short_name}
                      </code>
                    </td>
                    <td>
                      <div className='font-semibold text-slate-800'>
                        {subject.topics.length} Topics
                      </div>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Link
                          href={`subjects/edit-subject/${subject.id}`}
                          className='p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          title='Edit Artist'
                        >
                          <Edit className='w-4 h-4' />
                        </Link>

                        <form
                          action={deleteSubject}
                          method='POST'
                          className='inline-block'
                        >
                          <input type='hidden' name='slug' value={subject.id} />
                          <button
                            type='submit'
                            className='p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='Delete Subject'
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

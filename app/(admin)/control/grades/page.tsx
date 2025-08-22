import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { User, Edit, Trash2 } from 'lucide-react'
import { getClass } from '@/utils/actions'

export default async function Page() {
  const grades = await getClass()

  return (
    <div className=''>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-800'>
                Grades Table View
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  href='/control/grades/add-grade'
                  className='btn btn-primary'
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
                    Title
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Slug
                  </th>

                  <th className='px-6 py-4 text-right text-sm font-semibold text-slate-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {grades.map((grade) => (
                  <tr
                    key={grade.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <div className='font-semibold text-slate-800'>
                            {grade.title}
                          </div>
                          <div className='text-sm text-slate-500'>Grade</div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      <code className='px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm'>
                        {grade.slug}
                      </code>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <Link
                          href={`/control/grades/${grade.slug}`}
                          className='p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                          title='Edit Artist'
                        >
                          <Edit className='w-4 h-4' />
                        </Link>

                        <form
                          // action={deleteArtist}
                          method='POST'
                          className='inline-block'
                        >
                          <input type='hidden' name='slug' value={grade.slug} />
                          <button
                            type='submit'
                            className='p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='Delete Artist'
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

        {grades.length === 0 && (
          <div className='text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200'>
            <User className='w-16 h-16 text-slate-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-slate-800 mb-2'>
              No grades found
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

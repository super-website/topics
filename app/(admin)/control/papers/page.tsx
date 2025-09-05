import { deletePaper, getPapers } from '@/utils/actions'
import { Trash2, View } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const papers = await getPapers()
  return (
    <div>
      <nav className='text-sm breadcrumbs m-2'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/control'>Dashboard</Link>
          </li>
          <li>
            <span className='text-gray-800'>Papers</span>
          </li>
        </ul>
      </nav>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-800'>
                Modal Papers Table View
              </h2>
              <div className='flex items-center gap-2'>
                <Link
                  href='/control/papers/add-papers'
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
                    Visit
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
                {papers.map((paper) => (
                  <tr
                    key={paper.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <div className='font-semibold text-slate-800'>
                            {paper.title}
                          </div>
                          <div className='text-sm text-slate-500'>
                            {paper.pdf}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* <td className='px-6 py-4'>
                      <code className='px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm flex'>
                        <Download className='h-4 w-4' />
                        {paper.download}
                      </code>
                    </td> */}

                    <td className='px-6 py-4'>
                      <div className='font-semibold text-slate-800'>
                        <Link href={`/model-papers/${paper.pdf}`}>
                          <View className='h-4 w-4 inline mr-1' />
                        </Link>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='font-semibold text-slate-800'>
                        {paper.createdAt
                          ? new Date(paper.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </div>
                    </td>

                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        <form
                          action={deletePaper}
                          method='POST'
                          className='inline-block'
                        >
                          <input type='hidden' name='id' value={paper.id} />
                          <button
                            type='submit'
                            className='p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            title='Delete paper'
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

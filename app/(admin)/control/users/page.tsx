import { getAllUsers } from '@/utils/actions'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  const users = await getAllUsers()
  return (
    <div>
      <nav className='text-sm breadcrumbs m-2'>
        <ul className='flex flex-wrap gap-1 text-gray-600'>
          <li>
            <Link href='/cms'>Dashboard</Link>
          </li>
          <li>
            <span className='text-gray-800'>Users</span>
          </li>
        </ul>
      </nav>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <div className='px-6 py-4 border-b border-slate-200 bg-slate-50'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-slate-800'>
                Users Table View
              </h2>
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
                    Email
                  </th>

                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className='hover:bg-slate-50 transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <div className='font-semibold text-slate-800'>
                            {user.name}
                          </div>
                          <div className='text-sm text-slate-500'>user</div>
                        </div>
                      </div>
                    </td>

                    <td className='px-6 py-4'>
                      <code className='px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm'>
                        {user.email}
                      </code>
                    </td>
                    <td>
                      <div className='bg-green-400 badge  shadow-sm rounded-lg p-3 text-sm'>
                        Verified
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

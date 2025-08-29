import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/images/logo2.png'
import { cookies } from 'next/headers'
import { userLogout } from '@/utils/actions'

export default async function HomeNavbar() {
  const cookieStore = cookies()
  const token = cookieStore.get('userToken')?.value
  const name = cookieStore.get('name')?.value

  return (
    <nav className='bg-black border-b-8 border-yellow-300 py-3'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 relative'>
              <Image
                src={logo}
                alt='Education With Hamza logo'
                fill
                priority
                className='object-contain'
              />
            </div>
            <span className='text-white text-xs md:text-lg font-medium uppercase'>
              EducationWithHamza
            </span>
          </Link>
        </div>

        <div className='flex-1 mx-6 md:block hidden'>
          <form action='/search/' method='GET' className='w-full'>
            <div className='relative w-full max-w-xl mx-auto'>
              <input
                type='text'
                name='query'
                placeholder='Search "addition worksheets"'
                className='w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C4C9]'
              />
              <svg
                className='absolute left-3 top-2.5 h-4 w-4 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z'
                />
              </svg>
            </div>
          </form>
        </div>

        <div className='flex items-center gap-4'>
          {token ? (
            <>
              <span className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold'>
                {name?.slice(0, 2).toUpperCase()}
              </span>

              <form action={userLogout}>
                <button
                  type='submit'
                  className='bg-yellow-300 hover:bg-yellow-400 text-black md:text-sm font-medium rounded-full md:px-5 px-2 py-1 text-xs md:py-2 transition-colors'
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='bg-blue-500 hover:bg-blue-600 text-white md:text-sm font-medium rounded-full md:px-5 px-2 py-1 text-xs md:py-2 transition-colors '
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

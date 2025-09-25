import SubmitBtn from '@/components/SubmitBtn'
import { login } from '@/utils/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string | undefined }
}) {
  const error = searchParams?.error

  return (
    <div className='flex min-h-[80vh] items-center justify-center  px-4 py-8 md:px-0 md:py-0 '>
      <div className='card w-full max-w-md bg-base-100 shadow-2xl p-8'>
        <h2 className='text-2xl font-semibold text-center mb-2'>
          Welcome back
        </h2>
        <p className='text-center text-sm text-gray-500 mb-4'>
          Please login to your account
        </p>

        <div className='divider text-xs'>
          Continue with your email and password
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            {error}
          </div>
        )}

        <form action={login}>
          <label className='form-control w-full mb-2'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='text'
              placeholder='m@example.com'
              name='email'
              className='input input-bordered w-full'
            />
          </label>

          <div className='flex justify-between items-center'>
            <label className='label label-text'>Password</label>
          </div>
          <input
            type='password'
            placeholder='••••••••'
            name='password'
            className='input input-bordered w-full mb-4'
          />

          <SubmitBtn
            text='login'
            className='btn btn-neutral w-full capitalize'
          />
        </form>
      </div>
    </div>
  )
}

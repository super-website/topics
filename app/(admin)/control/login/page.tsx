import { login } from '@/utils/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string | undefined }
}) {
  
  const error = searchParams?.error

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='p-6 bg-white shadow-lg rounded-md w-96'>
        <h2 className='text-xl font-semibold text-center mb-4'>Admin Login</h2>
        {error && (
          <div className='alert text-red-600 capitalize my-5 alert-danger'>
            {error}
          </div>
        )}

        <form action={login} className='space-y-4'>
          <div className='form-control'>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              className='input input-bordered w-full mt-1'
              required
            />
          </div>

          <div className='form-control'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Your Password'
              className='input input-bordered w-full mt-1'
              required
            />
          </div>

          <button type='submit' className='btn btn-primary w-full'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

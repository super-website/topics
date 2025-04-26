import SubmitBtn from "@/components/SubmitBtn";
import { login } from "@/utils/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string | undefined };
}) {
  const error = searchParams?.error;

  return (
    <div className="flex justify-center  pt-10">
      <div className="p-6 bg-white shadow-lg rounded-md w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>

        {error && (
          <div
            role="alert"
            className="alert alert-error alert-soft text-white my-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form action={login} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="w-full">
            <SubmitBtn />
          </div>
        </form>
      </div>
    </div>
  );
}

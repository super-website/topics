import SubmitBtn from "@/components/SubmitBtn";
import { login } from "@/utils/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string | undefined };
}) {
  const error = searchParams?.error;

  return (
    <div className="flex justify-center pt-10">
      <div className="shadow-xl rounded-lg w-full sm:w-96 bg-white p-8">
        <form action={login} className="space-y-6">
          {error && (
            <div
              role="alert"
              className="alert alert-error alert-soft text-white mb-6 p-4 rounded-lg bg-red-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current mr-3"
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

          {/* Form Section */}
          <fieldset className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <legend className="text-xl font-medium text-gray-700 mb-4">
              Login
            </legend>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="w-full mt-6">
              <SubmitBtn />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

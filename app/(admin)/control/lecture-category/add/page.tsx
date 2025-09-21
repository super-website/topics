import SubmitBtn from "@/components/SubmitBtn";
import {
  createLectureCategory,
  getAllSubject,
  getClass,
} from "@/utils/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ success: string }>;
}) {
  const { success } = await searchParams;
  const subjects = await getAllSubject();
  const classes = await getClass();

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Add Lecture Category
        </h1>
        {success && (
          <p className="my-4 alert text-green-400">
            Lecture Category Added Successfully
          </p>
        )}
        <form action={createLectureCategory} className="space-y-4">
          {/* Title */}
          <label className="block">
            <span className="font-medium text-gray-700">Category Title</span>
            <input
              name="title"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Numericals, Errors and Uncertainties"
            />
          </label>

          {/* Description (optional) */}
          <label className="block">
            <span className="font-medium text-gray-700">
              Description (Optional)
            </span>
            <input
              name="description"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Practice problems, topic explanation"
            />
          </label>

          <div className="form-control">
            <label className="block text-sm font-medium">Class</label>
            <select
              name="classId"
              id="classId"
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="" disabled>
                Select a Class
              </option>
              {classes.map((cls) => (
                <option value={cls.id} key={cls.id}>
                  {cls.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="block text-sm font-medium">Subject</label>
            <select
              name="subjectId"
              id="subjectId"
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="" disabled>
                Select a Subject
              </option>
              {subjects?.map((subject) => (
                <option value={subject.id} key={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <SubmitBtn />
        </form>
      </div>
    </div>
  );
}

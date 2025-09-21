import SubmitBtn from "@/components/SubmitBtn";
import { createLecture, getLecturesCategories } from "@/utils/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ success: string }>;
}) {
  const { success } = await searchParams;
  const lectureCategory = await getLecturesCategories();

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Add Lecture</h1>
        {success && (
          <p className="my-4 alert text-green-400">
            Lecture Added Successfully
          </p>
        )}
        <form action={createLecture} className="space-y-4">
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

          <label className="block">
            <span className="font-medium text-gray-700">
              Duration (Optional)
            </span>
            <input
              name="duration"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Practice problems, topic explanation"
            />
          </label>

          <label className="block">
            <span className="font-medium text-gray-700">Youtube URL</span>
            <input
              name="youtubeUrl"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Practice problems, topic explanation"
            />
          </label>

          <div className="form-control">
            <label className="block text-sm font-medium">
              Lecture Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="" disabled>
                Select a Lecture Category
              </option>
              {lectureCategory?.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.title} | {category.class?.title} -{" "}
                  {category.subject?.name}
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

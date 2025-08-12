import SubmitBtn from "@/components/SubmitBtn";
import { getSingleClass, updateGrade } from "@/utils/actions";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ success: string }>;
};

export default async function page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { success } = await searchParams;

  const grade = await getSingleClass(slug);

  if (!grade) {
    return <div className="text-center py-10">Grade not found</div>;
  }

  return (
    <div className="py-6">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Update Grade
        </h1>

        {success && (
          <div className="flex items-center gap-2 p-4 mb-4 text-green-800 bg-green-100 rounded-lg shadow-md animate-fade-in">
            <Check />
            <span>Your information has been updated successfully.</span>
          </div>
        )}

        <form className="space-y-6" action={updateGrade}>
          <input type="hidden" name="id" value={grade.id} />
          <input type="hidden" name="slug" value={grade.slug} />

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="title"
              defaultValue={grade.title}
              className="input input-bordered w-full text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Short Desc
            </label>
            <input
              type="text"
              name="short_desc"
              defaultValue={grade.short_desc ?? ""}
              className="input input-bordered w-full text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              📝 Description
            </label>
            <textarea
              name="long_desc"
              defaultValue={grade.long_desc ?? ""}
              className="textarea textarea-bordered w-full text-black"
              rows={4}
            />
          </div>

          <SubmitBtn text="Update" />
        </form>
      </div>
    </div>
  );
}

import { getSinglSubject, updateSubject } from "@/utils/actions";
import React from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { id } = params;
  const subject = await getSinglSubject(id);
  const success = searchParams?.success;
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      {success && (
        <div className="alert alert-success text-white mb-4">
          Subject updated successfully!
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-4">Edit Subject</h1>

      <form action={updateSubject} method="POST" className="space-y-4">
        <input type="hidden" name="id" value={subject?.id} />
        <div className="form-control">
          <label htmlFor="name" className="block text-sm font-medium">
            Subject Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Subject Name"
            className="input input-bordered w-full mt-1"
            required
            defaultValue={subject?.name}
          />
        </div>

        <div className="form-control">
          <label htmlFor="short_name" className="block text-sm font-medium">
            Short Name
          </label>
          <input
            type="text"
            id="short_name"
            name="short_name"
            placeholder="Enter Short Name"
            className="input input-bordered w-full mt-1"
            required
            defaultValue={subject?.short_name}
          />
        </div>

        <div className="form-control">
          <label htmlFor="short_desc" className="block text-sm font-medium">
            Short Description
          </label>
          <textarea
            id="short_desc"
            name="short_desc"
            placeholder="Enter Some Info About Subject"
            className="textarea textarea-bordered w-full mt-1"
            required
            defaultValue={subject?.short_desc}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

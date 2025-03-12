"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { createTopic } from "@/utils/actions";

interface Subject {
  id: string;
  name: string;
}

export default function AddNewTopic({ subjects }: { subjects: Subject[] }) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold mb-4">Add Topic</h1>

      {success && (
        <div className="alert alert-success mb-4">
          Topic added successfully!
        </div>
      )}

      <form action={createTopic} method="POST" className="space-y-4">
        <div className="form-control">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Your Title"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="short_desc" className="block text-sm font-medium">
            Short Description
          </label>
          <input
            type="text"
            id="short_desc"
            name="short_desc"
            placeholder="Enter Your Short Description"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="long_desc" className="block text-sm font-medium">
            Long Description
          </label>
          <textarea
            id="long_desc"
            name="long_desc"
            placeholder="Enter Your Long Description"
            className="textarea textarea-bordered w-full mt-1"
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label className="block text-sm font-medium">Subject</label>
          <select
            name="subjectId"
            id="subjectId"
            className="select select-bordered w-full mt-1"
            required
          >
            <option value="" disabled selected>
              Select a Subject
            </option>
            {subjects.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

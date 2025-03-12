"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { createTopic, updateTopic } from "@/utils/actions";

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
  short_desc: string;
  long_desc: string;
  subjectId: string;
}

export default function EditTopic({
  subjects,
  topic,
}: {
  subjects: Subject[];
  topic?: Topic;
}) {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-semibold mb-4">
        {topic ? "Edit Topic" : "Create Topic"}
      </h1>

      {success && (
        <div className="alert alert-success mb-4">
          Topic saved successfully!
        </div>
      )}

      <form action={updateTopic} method="POST" className="space-y-4">
        <input type="hidden" value={topic?.id} name="id" />
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
            defaultValue={topic?.title || ""}
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
            defaultValue={topic?.short_desc || ""}
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
            defaultValue={topic?.long_desc || ""}
          ></textarea>
        </div>

        <div className="form-control">
          <label className="block text-sm font-medium">Subject</label>
          <select
            name="subjectId"
            id="subjectId"
            className="select select-bordered w-full mt-1"
            required
            defaultValue={topic?.subjectId || ""}
          >
            <option value="" disabled>
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
          {topic ? "Update Topic" : "Create Topic"}
        </button>
      </form>
    </div>
  );
}

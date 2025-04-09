import { createScheme } from "@/utils/actions";
import React from "react";

export default function Page() {
  return (
    <div className=" p-6  bg-white rounded-lg shadow-md">
      <form action={createScheme} className="space-y-4">
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="short_desc" className="label">
            <span className="label-text">Short Description</span>
          </label>
          <input
            type="text"
            name="short_desc"
            placeholder="Enter Short Description"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="url" className="label">
            <span className="label-text">Url</span>
          </label>
          <input
            type="file"
            name="url"
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="class" className="label">
            <span className="label-text">Class</span>
          </label>
          <input
            type="text"
            name="class"
            placeholder="Enter Class"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="tags" className="label">
            <span className="label-text">Tags</span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tags"
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

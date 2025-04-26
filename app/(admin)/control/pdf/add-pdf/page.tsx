import SubmitBtn from "@/components/SubmitBtn";
import { createPdf } from "@/utils/actions";
import { error } from "console";
import React from "react";

export default function page() {
  return (
    <div>
      <form action={createPdf} method="post">
        <h1 className="text-2xl font-semibold">Add Pdf</h1>

        <label className="block my-5">
          <span className="font-medium text-gray-700">Title</span>
          <input
            name="title"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pdf title"
          />
        </label>

        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-blue-400 h-48 w-full flex items-center justify-center text-center text-lg text-gray-700 cursor-pointer"
          >
            Click Here to upload Pdf
            <input id="file-upload" name="pdf" type="file" className="hidden" />
          </label>
        </div>

        <SubmitBtn />
      </form>
    </div>
  );
}

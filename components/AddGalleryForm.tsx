"use client";
import { useState } from "react";
import { createGallery } from "@/utils/actions";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SubmitBtn from "./SubmitBtn";

export default function GalleryForm() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || files.length === 0) {
      alert("Please enter a title and select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files", file));

    await createGallery(formData);

    setTitle("");
    setFiles([]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Add Gallery</h1>
      {success && (
        <p className="my-4 alert text-green-400">Gallery Added Successfully</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-medium text-gray-700">Title</span>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter gallery title"
          />
        </label>

        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed border-blue-400 h-48 w-full flex items-center justify-center text-center text-lg text-gray-700 cursor-pointer"
          >
            Drop files here to upload
            <input
              id="file-upload"
              name="files"
              multiple
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="border border-dotted border-primary min-h-52 p-4 grid  grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative border rounded overflow-hidden shadow-sm"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-black  text-white text-xs px-2 py-1 "
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <SubmitBtn />
      </form>
    </div>
  );
}

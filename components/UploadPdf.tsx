"use client";
import { createPdf, getClass } from "@/utils/actions";
import React, { useEffect, useRef, useState } from "react";
import SubmitBtn from "./SubmitBtn";

interface ClassData {
  id: string;
  slug: string;
  title: string;
  short_desc: string | null;
  long_desc: string | null;
  pdfId: string | null;
}

export default function UploadPdf() {
  // const [pdf, setPdf] = useState("");
  // const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  // const [uploadError, setUploadError] = useState("");
  const [classes, setClasses] = useState<ClassData[]>([]);

  useEffect(() => {
    const fetchClass = async () => {
      const data = await getClass();
      setClasses(data);
    };

    fetchClass();
  }, []);

  // const pdfUrl = useRef<HTMLInputElement>(null);

  // function handlePdfClick() {
  //   pdfUrl.current?.click();
  // }

  // async function handlePdfUpload(file: File) {
  //   if (!file) return;
  //   setUploadProgress(0);
  //   setUploadError("");

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "education_uploads");

  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", "https://api.cloudinary.com/v1_1/dfdmlcssx/raw/upload");

  //   xhr.upload.addEventListener("progress", (e) => {
  //     if (e.lengthComputable) {
  //       const percent = Math.round((e.loaded * 100) / e.total);
  //       setUploadProgress(percent);
  //     }
  //   });

  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       const res = JSON.parse(xhr.responseText);
  //       setPdf(res.secure_url);
  //       setUploadProgress(null);
  //     } else {
  //       setUploadError("Upload failed. Try again.");
  //       setUploadProgress(null);
  //     }
  //   };

  //   xhr.onerror = () => {
  //     setUploadError("Upload error. Please check your connection.");
  //   };

  //   xhr.send(formData);
  // }

  // function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) handlePdfUpload(file);
  // }

  return (
    <div>
      {/* <form action={createPdf} method="post">
        <h1 className="text-2xl font-semibold">Add PDF</h1>

        <label className="block my-5">
          <span className="font-medium text-gray-700">Title</span>
          <input
            name="title"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PDF title"
          />
        </label>

        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            📄 Upload PDF
          </label>
          <div
            className="border-2 border-dashed border-blue-400 bg-gray-50 h-48 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={handlePdfClick}
          >
            <p className="text-gray-600 text-sm">Click Here to Upload PDF</p> */}
      {/* <input
              ref={pdfUrl}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            /> */}
      {/* {uploadProgress !== null && (
              <p className="mt-2 text-blue-600 text-sm">
                Uploading: {uploadProgress}%
              </p>
            )}
            {uploadError && (
              <p className="mt-2 text-red-500 text-sm">{uploadError}</p>
            )}
            {pdf && (
              <p className="mt-2 text-green-600 text-sm">✅ Upload complete</p>
            )} */}
      {/* </div>
          <input type="file" accept="application/pdf" name="pdf" value={pdf} />
        </div> */}

      {/* <div className="form-control mt-5">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter Tags"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="form-control mt-5">
          <label htmlFor="classId" className="block text-sm font-medium">
            Class
          </label>
          <select
            name="classId"
            id="classId"
            required
            className="input input-bordered w-full mt-1"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <SubmitBtn />
        </div>
      </form> */}

      {/* new form */}

      <form action={createPdf} method="post">
        <h1 className="text-2xl font-semibold">Add PDF</h1>

        <label className="block my-5">
          <span className="font-medium text-gray-700">Title</span>
          <input
            name="title"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PDF title"
          />
        </label>

        <div>
          <label className="block mb-2 text-gray-700 font-semibold">
            📄 Upload PDF
          </label>
          <div className="border-2 border-dashed border-blue-400 bg-gray-50 h-48 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer hover:bg-gray-100">
            <p className="text-gray-600 text-sm">Click Here to Upload PDF</p>
            <input
              type="file"
              accept="application/pdf"
              name="file"
              required
              className="mt-2"
            />
          </div>
        </div>

        <div className="form-control mt-5">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter Tags"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div className="form-control mt-5">
          <label htmlFor="classId" className="block text-sm font-medium">
            Class
          </label>
          <select
            name="classId"
            id="classId"
            required
            className="input input-bordered w-full mt-1"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <SubmitBtn />
        </div>
      </form>
    </div>
  );
}

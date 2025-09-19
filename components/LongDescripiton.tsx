"use client";
import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";

type LongDescriptionProps = {
  name: string;
  value?: string;
};
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function LongDescription({ name, value }: LongDescriptionProps) {
  const [content, setContent] = useState(value || "");

  return (
    <div className="form-control">
      <label htmlFor="content" className="label">
        <span className="label-text">Article Content</span>
      </label>
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        placeholder="Write your full article here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "blockquote",
          "code-block",
        ]}
        style={{ minHeight: "250px", height: "250px", marginBottom: "20px" }}
      />
      <input type="hidden" name={name} value={content} />
    </div>
  );
}

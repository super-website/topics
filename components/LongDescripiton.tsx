"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can use other themes too

type LongDescriptionProps = {
  name: string;
  value?: string;
};

// Dynamically import ReactQuill for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function LongDescription({ name, value }: LongDescriptionProps) {
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    hljs.configure({ languages: ["javascript", "python", "html", "css"] });
  }, []);

  const modules = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video", "blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
  ];

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
        modules={modules}
        formats={formats}
        style={{ minHeight: "250px", height: "250px", marginBottom: "20px" }}
      />
      <input type="hidden" name={name} value={content} />
    </div>
  );
}

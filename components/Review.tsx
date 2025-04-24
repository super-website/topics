"use client";
import React, { useRef } from "react";
import SubmitBtn from "./SubmitBtn";
import { createReview } from "@/utils/actions";

type CreateReviewProps = {
  schemeId: string;
};

export default function CreateReview({ schemeId }: CreateReviewProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    try {
      await createReview(formData);

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form ref={formRef} method="POST" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>

      <input type="hidden" name="schemeId" value={schemeId} />

      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">Your Name</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">Email Address</span>
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-control mb-3">
        <label className="label">
          <span className="label-text">Your Review</span>
        </label>
        <textarea
          name="content"
          className="textarea textarea-bordered"
          placeholder="Share your thoughts..."
          required
        ></textarea>
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Rating</span>
        </label>
        <select name="rating" className="select select-bordered" required>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <SubmitBtn />
    </form>
  );
}

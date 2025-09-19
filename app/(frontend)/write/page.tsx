import LongDescription from "@/components/LongDescripiton";
import SubmitBtn from "@/components/SubmitBtn";
import { createArticle } from "@/utils/actions";
import { Check, X } from "lucide-react";
import React from "react";

type Props = {
  searchParams: {
    success?: string;
  };
};

export const metadata = {
  title: "Write for Us ",
  description:
    "Contribute your educational articles and notes to Education With Hamza. Share your knowledge with thousands of students preparing for FSC and board exams in Pakistan.",
  keywords: [
    "write for us",
    "submit article",
    "education contributors",
    "FSC notes",
    "board exam help",
    "education with hamza",
    "free educational content",
    "student contributions",
  ],
  author: "Education With Hamza Team",
  robots: "index, follow",
};

export default function Page({ searchParams }: Props) {
  const isSuccess = searchParams?.success === "true";
  const isError = searchParams?.success === "false";

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Submit Your Article
      </h1>

      {isSuccess && (
        <div className="alert alert-success shadow-lg bg-success/10 border border-success text-success-content">
          <Check />
          <span>Your article was submitted successfully!</span>
        </div>
      )}

      {isError && (
        <div className="alert alert-error shadow-lg bg-error/10 border border-error text-error-content mt-4">
          <X />
          <span>There was an error submitting your article.</span>
        </div>
      )}

      <form className="space-y-8" action={createArticle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter article title"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="author_name" className="label">
              <span className="label-text">Your Name (Optional)</span>
            </label>
            <input
              type="text"
              id="author_name"
              name="author_name"
              placeholder="Hamza Ahmad"
              className="input input-bordered"
            />
          </div>
        </div>

        <LongDescription name="content" value="" />

        <SubmitBtn text="Submit Article" />
      </form>
    </div>
  );
}

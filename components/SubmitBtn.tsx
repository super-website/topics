"use client";

import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary px-6 py-2"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

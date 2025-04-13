"use client";

import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary px-6 py-2 w-full"
      disabled={pending}
    >
      {pending ? <span className="loading loading-spinner"></span> : "Submit"}
    </button>
  );
}

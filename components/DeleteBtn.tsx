"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function DeleteBtn({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { pending } = useFormStatus();
  return (
    <form action={deleteAction}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-error" disabled={pending}>
        {pending ? <span className="loading loading-spinner"></span> : "Delete"}
      </button>
    </form>
  );
}

"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function DeleteStatusBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary px-6 py-2"
      disabled={pending}
    >
      {pending ? <span className="loading loading-spinner"></span> : "Delete"}
    </button>
  );
}

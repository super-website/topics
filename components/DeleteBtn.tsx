import React from "react";
import DeleteStatusBtn from "./DeleteStatusBtn";

export default function DeleteBtn({
  id,
  deleteAction,
}: {
  id: string;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={deleteAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteStatusBtn />
    </form>
  );
}

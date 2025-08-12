import DeleteBtn from "@/components/DeleteBtn";
import { deleteSubject, getAllSubject } from "@/utils/actions";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function page() {
  const data = await getAllSubject();

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-sm uppercase ">Subjects</h1>
        <Link href="subjects/add-subject" className="btn btn-primary">
          Add New
        </Link>
      </div>
      <hr className="my-10 bg-white p-1 " />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Short Name</th>
              <th>Short Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subject) => {
              return (
                <tr key={subject.id}>
                  <td>{subject.name}</td>
                  <td>{subject.short_name}</td>
                  <td className="max-w-2xl ">{subject.short_desc}</td>
                  <td className="space-x-4 flex">
                    <Link
                      href={`subjects/edit-subject/${subject.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <Suspense fallback={<div>Loading...</div>}>
                      <DeleteBtn id={subject.id} deleteAction={deleteSubject} />
                    </Suspense>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

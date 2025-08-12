import DeleteBtn from "@/components/DeleteBtn";
import { deleteTopic, getAllTopics } from "@/utils/actions";
import Link from "next/link";
import React from "react";

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
  short_desc: string;
  long_desc: string;
  subjectId: string | null;
  subject?: Subject | null;
}

export default async function Page() {
  const response = await getAllTopics("");
  const data: Topic[] = response;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-sm uppercase">Topics</h1>
        <Link href="topics/add-topic" className="btn btn-primary">
          Add New
        </Link>
      </div>
      <hr className="my-10 bg-white p-1" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Topic Name</th>
              <th>Subject Name</th>
              <th>Short Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.title}</td>
                  <td>{topic.subject?.name || "No Subject"}</td>
                  <td className="max-w-2xl">{topic.short_desc}</td>
                  <td className="space-x-4 flex">
                    <Link
                      href={`topics/edit-topic/${topic.id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <DeleteBtn id={topic.id} deleteAction={deleteTopic} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500">
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

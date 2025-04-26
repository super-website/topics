import DeleteBtn from "@/components/DeleteBtn";
import { deleteScheme, getAllScheme } from "@/utils/actions";
import React from "react";

export default async function Page() {
  const data = await getAllScheme();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Schemes</h1>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.short_desc}</p>
              <a className="text-sm" href={item.url}>
                Download
              </a>
            </div>

            <div className="flex space-x-2">
              <button className="btn btn-primary text-white">Edit</button>
              <DeleteBtn deleteAction={deleteScheme} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import DeleteBtn from "@/components/DeleteBtn";
import { deletePdf, getAllPdf } from "@/utils/actions";
import React from "react";

export const revalidate = 0;

export default async function Page() {
  const data = await getAllPdf("", 20);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">PDFs</h1>

        <a href="/control/pdf/add-pdf" className="btn btn-primary mb-6">
          Add PDF
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Downloads</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <p>No Pdf Available</p>
            ) : (
              data.map((pdf: any) => (
                <tr key={pdf.id}>
                  <td>{pdf.title}</td>
                  <td>
                    <span>{pdf.url}</span>
                  </td>
                  <td>{pdf.download}</td>
                  <td className="flex">
                    <DeleteBtn deleteAction={deletePdf} id={pdf.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

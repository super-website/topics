import Adsense from "@/components/Adsense";
import { getSinglSubject } from "@/utils/actions";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id;
  const subject = await getSinglSubject(id);

  return {
    title: subject?.name || "Subject",
    description: subject?.short_desc || "Subject description",
    keywords: subject?.tags || [],
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const subject = await getSinglSubject(id);

  if (!subject) {
    return (
      <p className="text-red-500 text-center text-lg mt-6">
        Subject not found.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-5 md:mx-auto">
      <div className="mb-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">{subject?.name}</h1>
        <div className="card bg-gray-100 rounded-none p-4">
          <p className="text-gray-500 text-opacity-90">{subject?.short_desc}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {subject?.topics?.length > 0 ? (
          subject.topics.map((topic) => (
            <div
              key={topic?.id}
              className="card bg-gray-500 bg-opacity-10 shadow-lg rounded-none"
            >
              <div className="card-body">
                <Link
                  href={`/topic/${topic.id}`}
                  className="card-title border-b pb-2 hover:text-primary"
                >
                  {topic?.title}
                </Link>

                <p className="text-gray-600 border-b pb-2">
                  {topic?.short_desc}
                </p>

                <div className="card-actions justify-between items-center pt-3">
                  <span className="text-sm text-gray-500">
                    {topic?.createdAt
                      ? new Date(topic.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>

                  <span className="badge badge-primary badge-lg px-4 py-2">
                    {subject?.short_name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No topics available.</p>
        )}
      </div>
    </div>
  );
}

import { getSingleTopic } from "@/utils/actions";
import Link from "next/link";
import React from "react";

import { Metadata } from "next";
import AdSlot from "@/components/AdsComponent";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id;
  const topic = await getSingleTopic(id);

  if (!topic) {
    return {
      title: "Topic Not Found",
      description: "This topic does not exist.",
      keywords: ["not found", "error", "missing topic"],
    };
  }

  return {
    title: {
      absolute: topic.title || "Topic",
    },
    description: topic.short_desc || "Learn more about this topic.",
    keywords: topic.tags || [],
  };
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const topic = await getSingleTopic(id);

  return (
    <div>
      <div className="breadcrumbs text-sm ml-5 md:ml-0">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={`/subject/${topic?.subject?.id}`}>
              {topic?.subject?.short_name}
            </Link>
          </li>
          <li>
            <span>{topic?.title}</span>
          </li>
        </ul>
      </div>

      <div className="max-w-2xl mx-5  md:mx-auto pt-10 space-y-5">
        <div className="card bg-info p-4 rounded-none bg-opacity-30">
          <p className="text-sm space-y-3">{topic?.short_desc}</p>
        </div>

        <div>
          <AdSlot adClient="ca-pub-7339717436236652" adSlot="7306166999" />
        </div>

        <div className="card bg-gray-400 bg-opacity-25 rounded-none p-4">
          <div className="card-title border-b pb-3 border-gray-500">
            <h1 className="text-2xl">{topic?.title}</h1>
          </div>
          <div className="card-body border-b border-gray-500 p-2 text-black">
            <p dangerouslySetInnerHTML={{ __html: topic?.long_desc || "" }}></p>
          </div>
          <div className="card-actions justify-between py-2">
            <span>
              {topic?.createdAt
                ? new Date(topic.createdAt).toLocaleDateString()
                : "N/A"}
            </span>

            <span className="badge badge-primary p-4 bg-opacity-80">
              {topic?.subject?.short_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

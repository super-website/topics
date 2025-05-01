import { getAllSubject, getAllTopics, getSingleTopic } from "@/utils/actions";
import Link from "next/link";
import React from "react";

import { Metadata } from "next";

interface Topic {
  id: string;
  title: string;
  short_desc: string;
  createdAt: Date;
  subject?: {
    id: string;
    short_name: string;
  } | null;
}

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
  const topicsData = await getAllTopics("");

  let filteredTopics: Topic[] = [];

  if (Array.isArray(topicsData)) {
    filteredTopics = topicsData.filter(
      (singleTopic) =>
        singleTopic?.subject?.id === topic?.subject?.id &&
        singleTopic.id !== topic?.id
    );
  }

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

        <div className="card bg-white rounded-none p-4">
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

        <div>
          {filteredTopics.length > 0 && (
            <>
              <div>
                <h2 className="text-sm">
                  More From This {topic?.subject?.short_name}
                </h2>
              </div>

              {filteredTopics.map((topic) => (
                <div className="my-5" key={topic.id}>
                  <div className="card max-w-sm md:max-w-2xl bg-base-100 card-sm shadow-sm rounded-none">
                    <div className="card-body">
                      <Link
                        href={`/topic/${topic.id}`}
                        className="card-title border-b hover:text-primary"
                      >
                        {topic.title}
                      </Link>
                      <p className="text-sm mt-2 border-b py-2">
                        {topic.short_desc.substring(0, 200)}
                        {topic.short_desc.length > 200 && (
                          <>
                            ...{" "}
                            <Link
                              href={`/topic/${topic.id}`}
                              className="text-primary font-semibold hover:underline"
                            >
                              Read more
                            </Link>
                          </>
                        )}
                      </p>
                      <div className="justify-between card-actions">
                        <span>
                          {new Date(topic.createdAt).toLocaleDateString()}
                        </span>
                        {topic.subject && (
                          <Link
                            href={`/subject/${topic.subject.id}`}
                            className="btn btn-primary"
                          >
                            {topic.subject.short_name}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

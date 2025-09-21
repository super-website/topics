import { getLecturesByClass } from "@/utils/actions";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const lectures = await getLecturesByClass(params.slug);

  const classTitle = lectures[0]?.class?.title || "Lectures";
  const subjectNames = Array.from(
    new Set(lectures.map((lec) => lec.subject?.name).filter(Boolean))
  ).join(", ");

  return {
    title: `${classTitle} - Free Online Video Lectures`,
    description: `Watch free online video lectures for ${classTitle}. Subjects covered: ${subjectNames}. Perfect for Matric and FSC students.`,
    keywords: [
      "online lectures",
      classTitle,
      ...lectures.flatMap((lec) => lec.subject?.name ?? []),
      "education with hamza",
      "video classes",
      "board exam prep",
    ],
  };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const categories = await getLecturesByClass(slug);

  const groupedBySubject = groupBySubject(categories);

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">
        Lectures for Class: {categories[0]?.class?.title || "Unknown"}
      </h1>

      {Object.entries(groupedBySubject).map(
        ([subjectName, subjectCategories]) => (
          <div key={subjectName} className="mb-10">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Subject: {subjectName}
            </h2>

            {subjectCategories.map((category) => (
              <div
                key={category.id}
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-box mb-4"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-medium text-lg text-success">
                  {category.title}
                </div>
                <div className="collapse-content space-y-2">
                  {category.lectures.map((lecture: any) => (
                    <div key={lecture.id} className="collapse collapse-plus">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title text-base font-medium">
                        {lecture.title}{" "}
                        {lecture.duration && (
                          <span className="text-sm text-gray-500">
                            ({lecture.duration})
                          </span>
                        )}
                      </div>
                      <div className="collapse-content">
                        <iframe
                          className="w-full aspect-video rounded"
                          src={`https://www.youtube.com/embed/${extractVideoId(
                            lecture.youtubeUrl
                          )}`}
                          allowFullScreen
                        ></iframe>
                        {lecture.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {lecture.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

function groupBySubject(categories: any[]) {
  return categories.reduce((acc: Record<string, any[]>, category) => {
    const subjectName = category.subject?.name || "Uncategorized";
    if (!acc[subjectName]) acc[subjectName] = [];
    acc[subjectName].push(category);
    return acc;
  }, {});
}

function extractVideoId(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

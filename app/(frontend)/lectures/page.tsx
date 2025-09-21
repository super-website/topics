import { getLecturesCategories } from "@/utils/actions";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Free Online Video Lectures",
  description:
    "Watch high-quality free video lectures for Matric, Intermediate, and FSC students. Learn with subject-wise and class-wise categorized YouTube lectures.",
  keywords:
    "online lectures, free video classes, FSC video lectures, matric lectures, 1st year, 2nd year, board exam preparation, education with hamza, online learning, YouTube lectures",
  author: "Ameer Muhavia",
};

export default async function Page() {
  const categories = await getLecturesCategories();

  const uniqueClassesMap = new Map();
  categories.forEach((cat) => {
    if (cat.class?.id && !uniqueClassesMap.has(cat.class.id)) {
      uniqueClassesMap.set(cat.class.id, cat.class);
    }
  });
  const uniqueClasses = Array.from(uniqueClassesMap.values());

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-center mb-8">
        Free Online Video Lectures for Pakistani Students
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-16">
        {uniqueClasses.map((classItem) => (
          <Link
            href={`/lectures/${classItem.slug}`}
            key={classItem.id}
            className="border-2 border-blue-400 rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer bg-white"
          >
            <p className="text-sm font-medium text-yellow-500 mb-2 uppercase tracking-wide">
              Online Lecture
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              {classItem.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

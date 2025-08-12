import { getAllScheme } from "@/utils/actions";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Available Class Schemes",
  description:
    "Explore a wide range of class schemes and programs to find the best fit for your learning journey. View details on each scheme, including class, description, and important dates.",
  keywords:
    "class schemes, learning programs, educational resources, online courses, class details, study resources",
  author: "Ameer Muhavia",
};

export const revalidate = 0;

export default async function Page() {
  const data = await getAllScheme();

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Class Schemes
      </h1>

      <div className="bg-white rounded-xl shadow-sm px-6 py-4 mb-6 text-sm font-semibold text-gray-600">
        Top Recommended Schemes
      </div>

      <ul className="space-y-6">
        {data.map((item) => (
          <li
            key={item.id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-base font-medium text-purple-600">
                  Class {item?.class?.title}
                </p>
                <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-gray-700 ">{item.short_desc}</p>
              </div>

              <div className="mt-4 md:mt-0 md:ml-4">
                <Link
                  href={`/scheme/${item.id}`}
                  className="inline-flex items-center text-blue-600 hover:underline text-xs font-medium"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

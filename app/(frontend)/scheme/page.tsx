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

export default async function Page() {
  const data = await getAllScheme();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Class Schemes
      </h2>

      <div className="space-y-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="collapse bg-base-100 border border-base-300 shadow-md rounded-lg"
          >
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked
              id={`item-${item.id}`}
              className="hidden"
            />
            <label
              htmlFor={`item-${item.id}`}
              className="collapse-title font-semibold text-lg cursor-pointer px-6  hover:bg-gray-100 rounded-t-lg transition-colors duration-300"
            >
              {item.title}
            </label>
            <div className="collapse-content text-sm p-6">
              <p>{item.short_desc}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">{item.class}</p>
                <Link
                  href={`scheme/${item.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

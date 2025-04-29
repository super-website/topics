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
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Class Schemes
      </h1>

      <ul className="list  rounded-box  px-10 ">
        <li className="p-4 px-0  text-xs  tracking-wide">
          Top Recommended Schemes
        </li>

        {data.map((item) => (
          <li className="list-row bg-base-100 p-5 my-5" key={item.id}>
            <div>
              <div>{item.class}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {item.title}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="list-col-wrap text-xs">{item.short_desc}</p>

              <Link
                href={`scheme/${item.slug ? item.slug : item.id}`}
                className="btn btn-square btn-ghost hidden md:block text-center"
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </Link>
            </div>

            <Link
              href={`scheme/${item.id}`}
              className="text-primary justify-end flex items-center gap-1 md:hidden"
            >
              Read More
              <span className="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="16"
                  height="16"
                  className="ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

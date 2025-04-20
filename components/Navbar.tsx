"use client";
import { logout } from "@/utils/actions";
import Link from "next/link";
import React from "react";

const lists = [
  { id: 1, name: "topics", url: "/control/topics" },
  { id: 2, name: "subjects", url: "/control/subjects" },
  { id: 3, name: "gallery", url: "/control/gallery" },
  { id: 4, name: "pdf", url: "/control/pdf" },
  { id: 5, name: "comments", url: "/control/contact" },
];

export default function Navbar() {
  return (
    <nav className="bg-base-200 fixed top-0 left-0 right-0 shadow-md">
      <div className="max-w-7xl mx-auto navbar">
        <div className="navbar-start">
          <Link href="/control" className="text-2xl font-bold">
            C<span className="text-primary">M</span>S
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="flex space-x-4">
            {lists.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="hover:text-primary capitalize"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={async () => await logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

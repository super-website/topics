import { logout } from "@/utils/actions";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-base-200 fixed top-0 left-0 right-0 shadow-md z-10">
      <div className="max-w-7xl mx-auto navbar">
        <div className="navbar-start">
          <Link href="/control" className="text-2xl font-bold">
            C<span className="text-primary">M</span>S
          </Link>
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

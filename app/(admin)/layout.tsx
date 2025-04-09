"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/control/login";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <div className="max-w-7xl lg:mx-auto p-10 mx-4">{children}</div>
    </div>
  );
}

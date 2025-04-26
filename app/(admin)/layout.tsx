"use client";
import BottomBar from "@/components/BottomBar";
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
      <div className="max-w-7xl lg:mx-auto p-10 pb-20 mx-4">{children}</div>
      {!isLoginPage && <BottomBar />}
    </div>
  );
}

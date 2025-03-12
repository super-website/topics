import HomeNavbar from "@/components/HomerNavbar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomeNavbar />
      <div
        className="max-w-7xl mx-auto
      pt-10"
      >
        {children}
      </div>
    </div>
  );
}

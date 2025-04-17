import Footer from "@/components/Footer";
import HomeNavbar from "@/components/HomerNavbar";
import React, { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<p className="loading-spinner"></p>}>
        <HomeNavbar />
      </Suspense>
      <div
        className="max-w-7xl mx-auto
      py-10 min-h-screen"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

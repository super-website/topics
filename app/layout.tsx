import "./globals.css";
import type { Metadata } from "next";
import { Hind, Inter } from "next/font/google";

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Task App",
  description: "Created by Ameer Muhavia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hind.className}>
      <body className="bg-gray-200">{children}</body>
    </html>
  );
}

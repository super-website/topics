import "./globals.css";
import type { Metadata } from "next";
import { Hind, Inter } from "next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Education With Hamza | Online Courses & Study Resources",
    template: "%s | Education With Hamza",
  },

  description:
    "Education With US offers high-quality online courses and resources to help you learn and grow in various subjects. Learn at your own pace with expert-led content.",
  keywords:
    "online education, learn online, courses, e-learning, study resources, education with hamza, education with us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hind.className}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7339717436236652"
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body className="bg-gray-200">
        {children}

        <Analytics />
      </body>
    </html>
  );
}

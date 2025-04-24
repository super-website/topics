import React from "react";

import { getAllPdf } from "@/utils/actions";
import PDFCard from "@/components/PDFCard";

export const metadata = {
  title: "Educational Resources",
  description:
    "Explore a comprehensive gallery of student notes, study materials, and educational resources in PDF format, shared by students and educators.",
  keywords:
    "student notes, study resources, educational PDFs, online learning materials, classroom resources, notes gallery, teacher and student notes, study guides, education with hamza, notes pdf",
  author: "Ameer Muhavia",
};

interface Pdf {
  id: string;
  title: string;
  url: string;
  download: number;
}

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = searchParams.query || "";
  const limit = parseInt(searchParams.limit || "10", 10);

  const pdf: Pdf[] = await getAllPdf(query, limit);

  return <PDFCard pdfs={pdf} query={query} limit={limit} />;
}

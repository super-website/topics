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

export default async function Page({ searchParams }: { searchParams: string }) {
  const urlParams = new URLSearchParams(searchParams);

  const query = urlParams.get("query") || "";

  const pdf: Pdf[] = await getAllPdf(query);
  return <PDFCard pdfs={pdf} query={query} />;
}

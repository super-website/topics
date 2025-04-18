"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import pdfIcon from "@/public/images/pdf.png";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateDownloadCount } from "@/utils/actions";

interface Pdf {
  id: string;
  title: string;
  url: string;
  download: number;
}

interface PDFCardProps {
  pdfs: Pdf[];
  query: string;
}

export default function PDFCard({ pdfs }: PDFCardProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [loading, setLoading] = useState<string | null>(null);
  const [recentlyDownloaded, setRecentlyDownloaded] = useState<string | null>(
    null
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchTerm, pathname, searchParams, replace]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = async (pdf: Pdf) => {
    setLoading(pdf.id);
    await updateDownloadCount(pdf.id);

    fetch(pdf.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `${pdf.title}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        setLoading(null);

        setRecentlyDownloaded(pdf.id);

        setTimeout(() => {
          setRecentlyDownloaded(null);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setLoading(null);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row mx-10">
        <h1 className="text-xl md:text-2xl font-bold">Notes PDF</h1>

        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search PDFs"
            className="input input-bordered focus:ring-blue-600 p-2 my-4 input-sm"
          />
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
        {pdfs.length === 0 ? (
          <p>No Pdf Available</p>
        ) : (
          pdfs.map((pdf) => {
            const isBouncing =
              loading === null && pdf.id === recentlyDownloaded;

            return (
              <div key={pdf.id} className="card w-full bg-base-100 shadow-xl">
                <figure>
                  <Image
                    src={pdfIcon}
                    alt="PDF Icon"
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </figure>
                <div className="card-body py-0 my-0">
                  <h2 className="card-title text-xs">{pdf.title}</h2>
                </div>
                <div className="card-actions flex items-center justify-between p-5">
                  <button
                    onClick={() => handleDownload(pdf)}
                    className="btn btn-primary"
                    disabled={loading === pdf.id}
                  >
                    {loading === pdf.id ? (
                      <div className="loading loading-dots text-black   "></div>
                    ) : (
                      "Download"
                    )}
                  </button>

                  <p className="flex items-center gap-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 text-gray-600 ${
                        isBouncing ? "animate-bounce" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                    {pdf.download}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

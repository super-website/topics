import { searchAll } from "@/utils/actions";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const query = searchParams.query || "";
  const results = await searchAll(query);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-[80vh]">
      <div className="mb-6">
        <h1 className="text-sm font-bold">
          Search Results for [<span className="text-textPrimary">{query}</span>]
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        {results.subjects.length > 0 && (
          <div className="card ">
            <div className="card-body">
              <ul className="list bg-base-100 rounded-0 shadow-md p-4 ">
                <li className="pb-2 text-xs opacity-60 tracking-wide">
                  Top Subject Searches
                </li>
                {results.subjects.map((subject) => {
                  return (
                    <li className="list-row my-6" key={subject.id}>
                      <Link href={`/subject/${subject.id}`}>
                        <div>
                          <div className="text-xs uppercase font-semibold opacity-60 hover:underline ">
                            {subject.name}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {results.pdfs.length > 0 && (
          <div className="card ">
            <div className="card-body">
              <ul className="list bg-base-100 rounded-0 shadow-md p-4 ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Top Notes Searches
                </li>
                {results.pdfs.map((pdf) => {
                  return (
                    <li className="list-row my-6" key={pdf.id}>
                      <Link href={`/notes-pdf/${pdf.id}`}>
                        <div>
                          <div className="text-xs uppercase font-semibold opacity-60 hover:underline ">
                            {pdf.title}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {results.schemes.length > 0 && (
          <div className="card ">
            <div className="card-body">
              <ul className="list bg-base-100 rounded-0 shadow-md p-4 ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Top Schemes Searches
                </li>
                {results.schemes.map((scheme) => {
                  return (
                    <li className="list-row my-6" key={scheme.id}>
                      <Link href={`/scheme/${scheme.id}`}>
                        <div>
                          <div className="text-xs uppercase font-semibold opacity-60 hover:underline ">
                            {scheme.title}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {results.grades.length > 0 && (
          <div className="card ">
            <div className="card-body">
              <ul className="list bg-base-100 rounded-0 shadow-md p-4 ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Top Grades Searches
                </li>
                {results.grades.map((grade) => {
                  return (
                    <li className="list-row my-6" key={grade.id}>
                      <Link href={`/grades/${grade.slug}`}>
                        <div>
                          <div className="text-xs uppercase font-semibold opacity-60 hover:underline ">
                            {grade.title}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      {results.subjects.length === 0 &&
        results.pdfs.length === 0 &&
        results.schemes.length === 0 &&
        results.grades.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500 space-y-2">
            <Search className="w-8 h-8 text-gray-400" />
            <span>
              No results found for <strong>{query}</strong>. Try a different
              keyword.
            </span>
          </div>
        )}
    </div>
  );
}

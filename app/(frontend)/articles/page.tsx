import { getArticles } from "@/utils/actions";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Latest Articles",
  description:
    "Read the latest educational articles, tips, and study guides curated for FSC, 9th, and 10th class students. Stay updated with free, high-quality resources at Education With Hamza.",
  keywords: [
    "educational articles",
    "FSC notes",
    "board exam tips",
    "study guides",
    "free education",
    "9th class notes",
    "10th class notes",
    "education with hamza",
    "learning resources",
  ],
  author: "Education With Hamza Team",
  robots: "index, follow",
};

export default async function Page() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-primary mb-12 text-center">
        Latest Articles
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No articles found. Be the first to{" "}
          <Link href="/write" className="text-primary underline">
            write one!
          </Link>
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="card bg-base-200 shadow-lg rounded-lg p-6 flex flex-col"
            >
              <h2 className="text-sm font-semibold text-primary mb-2 line-clamp-2">
                <Link
                  href={`/articles/${article.slug}`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </h2>

              {article.author_name && (
                <p className="text-sm text-gray-500 mb-1">
                  By <span className="font-medium">{article.author_name}</span>
                </p>
              )}

              <p className="text-xs text-gray-400 mb-4">
                {new Date(article.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <p className="text-gray-700 flex-grow line-clamp-4">
                {`${article.title} is written by ${article.author_name}`}
              </p>

              <Link
                href={`/articles/${article.slug}`}
                className="btn btn-primary mt-4 self-end"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

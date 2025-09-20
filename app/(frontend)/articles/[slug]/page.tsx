import Link from "next/link";
import { Metadata } from "next";
import { getArticle } from "@/utils/actions";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { LikeDislikeAlert } from "@/components/Likes";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
      keywords: ["not found", "error", "missing article"],
    };
  }

  return {
    title: article.title || "Article",
    description:
      `${article.title} is written by ${
        article.author_name || "an anonymous author"
      }` || "Learn more about this article.",
    keywords: article.title || article.title?.split(" ") || [],
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <nav className="text-sm breadcrumbs">
        <ul className="flex gap-1 text-gray-600">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
          <li>
            <span className="text-gray-800">{article?.title}</span>
          </li>
        </ul>
      </nav>

      <h1 className="text-xl md:text-3xl font-bold mt-6">{article?.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By {article?.author_name || "Anonymous"}
      </p>

      <article
        className="prose max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: article?.content || "" }}
      />

      <div>
        <LikeDislikeAlert
          articleId={article?.slug!}
          likeCount={article?.like || 0}
        />
      </div>
    </div>
  );
}

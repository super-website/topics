"use client";

import { useEffect, useState, useTransition } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";
import { likeDislikeArticle } from "@/utils/actions";

type Props = {
  articleId: string;
  likeCount: number;
};

export function LikeDislikeAlert({ articleId, likeCount }: Props) {
  const [isPending, startTransition] = useTransition();
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);

  const handleAction = (action: "like" | "dislike") => {
    const formData = new FormData();
    formData.set("id", articleId);
    formData.set("action", action);

    startTransition(() => {
      likeDislikeArticle(formData).then(() => {
        setVoted(action);
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setVoted(null);
    }, 3000);
  }, [voted]);

  return (
    <div className="flex flex-col gap-2 mt-8 px-4 py-3 border rounded-md bg-yellow-50 text-yellow-800 border-yellow-300">
      <div className="flex items-center justify-between">
        <span>
          Article has <strong>{likeCount}</strong> like
          {likeCount !== 1 ? "s" : ""} – do you like this?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction("like")}
            disabled={isPending}
            aria-label="Like"
            className="disabled:opacity-50"
          >
            {isPending && voted === "like" ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <ThumbsUp className="w-5 h-5 hover:text-green-600 cursor-pointer" />
            )}
          </button>
          <button
            onClick={() => handleAction("dislike")}
            disabled={isPending}
            aria-label="Dislike"
            className="disabled:opacity-50"
          >
            {isPending && voted === "dislike" ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <ThumbsDown className="w-5 h-5 hover:text-red-600 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {voted && (
        <div className="flex items-center text-sm text-green-700 gap-1">
          <CheckCircle2 className="w-4 h-4" />
          Thanks for your {voted === "like" ? "like" : "feedback"}!
        </div>
      )}
    </div>
  );
}

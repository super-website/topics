import DeleteBtn from "@/components/DeleteBtn";
import { deleteArticle, deleteSubject, getArticles } from "@/utils/actions";
import { Edit, Heart, Trash2, View } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page() {
  const articles = await getArticles();

  return (
    <div>
      <nav className="text-sm breadcrumbs m-2">
        <ul className="flex flex-wrap gap-1 text-gray-600">
          <li>
            <Link href="/control">Dashboard</Link>
          </li>
          <li>
            <span className="text-gray-800">Articles</span>
          </li>
        </ul>
      </nav>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Articles Table View
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Author Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Likes
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold text-slate-800">
                            {article.title}
                          </div>
                          <div className="text-sm text-slate-500">Subject</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                        {article.author_name}
                      </code>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        {article.like}{" "}
                        <Heart className="w-4 h-4 text-red-500 " />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Artist"
                        >
                          <View className="w-4 h-4" />
                        </Link>

                        <form
                          action={deleteArticle}
                          method="POST"
                          className="inline-block"
                        >
                          <input
                            type="hidden"
                            name="slug"
                            value={article.slug}
                          />
                          <button
                            type="submit"
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Subject"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

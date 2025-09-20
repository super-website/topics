import React from "react";
import {
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import { getAllPdf, getAllSubject, getAllTopics } from "@/utils/actions";
import Link from "next/link";

export const revalidate = 60;

export default async function page() {
  const topics = await getAllTopics("");
  const pdfs = await getAllPdf("", 100);
  const subjects = await getAllSubject();

  return (
    <div className="min-h-screen  ">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-content" />
          </div>
          <h1 className="text-4xl font-bold text-base-content">Dashboard</h1>
        </div>
        <p className="text-base-content/70 text-lg">
          Welcome back! Here&apos;s your content overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="badge badge-primary badge-outline">Active</div>
            </div>
            <h2 className="card-title text-2xl font-bold text-base-content mb-2">
              {topics.length.toLocaleString()}
            </h2>
            <p className="text-base-content/70 font-medium">Total Topics</p>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success text-sm font-medium">
                Published
              </span>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/control/topics" className="btn btn-primary btn-sm">
                View Topics
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="badge badge-success badge-outline">Live</div>
            </div>
            <h2 className="card-title text-2xl font-bold text-base-content mb-2">
              {subjects.length.toLocaleString()}
            </h2>
            <p className="text-base-content/70 font-medium">Total Subjects</p>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success text-sm font-medium">
                Published
              </span>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/control/subjects" className="btn btn-success btn-sm">
                Manage Subjects
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="badge badge-secondary badge-outline">Ready</div>
            </div>
            <h2 className="card-title text-2xl font-bold text-base-content mb-2">
              {pdfs.length.toLocaleString()}
            </h2>
            <p className="text-base-content/70 font-medium">Total PDFs</p>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success text-sm font-medium">
                Published
              </span>
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/control/pdf" className="btn btn-secondary btn-sm">
                Browse PDFs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl border border-base-300 mb-8">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="card-title text-2xl">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/control/topics/add-topic"
              className="btn btn-outline btn-primary flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Add Topic
            </Link>
            <Link
              href="/control/subjects/add-subject"
              className="btn btn-outline btn-success flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              New Subject
            </Link>
            <Link
              className="btn btn-outline btn-secondary flex items-center gap-2"
              href="/control/pdf/add-pdf"
            >
              <FileText className="w-4 h-4" />
              Upload PDF
            </Link>
            <Link
              href="/control/articles"
              className="btn btn-outline btn-info flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              View Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

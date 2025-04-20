import React from "react";
import { getAllPdf, getAllSubject, getAllTopics } from "@/utils/actions";

export const revalidate = 60;

export default async function page() {
  const topics = await getAllTopics("");
  const pdfs = await getAllPdf("");
  const subjects = await getAllSubject();
  return (
    <div>
      <h1 className="m-10 ml-0 text-3xl">Dashboard</h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        <div className="stats stats-vertical p-8 ">
          <div className="stat-title">Total Subjects</div>
          <div className="stat-value p-4 text-center">{topics.length}</div>
          <div className="stat-actions">
            <span className="stat-desc">Published</span>
          </div>
        </div>
        <div className="stats stats-vertical p-8 ">
          <div className="stat-title">Total Subjects</div>
          <div className="stat-value p-4 text-center">{subjects.length}</div>
          <div className="stat-actions">
            <span className="stat-desc">Published</span>
          </div>
        </div>
        <div className="stats stats-vertical p-8 ">
          <div className="stat-title">Total Pdfs</div>
          <div className="stat-value p-4 text-center">{pdfs.length}</div>
          <div className="stat-actions">
            <span className="stat-desc">Published</span>
          </div>
        </div>
      </div>
    </div>
  );
}

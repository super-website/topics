import React from "react";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="flex gap-2">
        <div className="skeleton h-4 w-16"></div>
        <div className="skeleton h-4 w-4"></div>
        <div className="skeleton h-4 w-32"></div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="skeleton h-6 w-3/4"></div>
            <div className="skeleton h-4 w-12"></div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>

          <div className="skeleton h-[70vh] w-full rounded"></div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="skeleton h-10 w-full sm:w-32"></div>
            <div className="skeleton h-10 w-full sm:w-32"></div>
          </div>
        </div>

        <hr />

        <div className="card-body p-6 flex flex-col gap-4">
          <div className="skeleton h-5 w-40"></div>

          <div className="flex flex-col gap-2">
            <div className="skeleton h-8 w-full rounded"></div>
            <div className="skeleton h-8 w-full rounded"></div>
            <div className="skeleton h-8 w-full rounded"></div>
            <div className="skeleton h-8 w-full rounded"></div>
          </div>

          <div className="flex justify-center">
            <div className="skeleton h-8 w-24 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

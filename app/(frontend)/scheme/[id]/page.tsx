import CreateReview from "@/components/Review";
import {
  deleteAllReview,
  getSchemeReview,
  getSingleScheme,
} from "@/utils/actions";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const id = (await params).id;
  const scheme = await getSingleScheme(id);

  if (!scheme) {
    return {
      title: "Scheme Not Found",
      description: "This Scheme does not exist.",
      keywords: ["not found", "error", "missing scheme"],
    };
  }

  return {
    title: scheme.title || "Scheme",
    description: scheme.short_desc || "Learn more about this scheme.",
    keywords: scheme.tags || [],
  };
};

export default async function page({ params }: Props) {
  const { id } = await params;
  const data = await getSingleScheme(id);

  const reviews = await getSchemeReview(id);

  if (!data) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Scheme Not Found</h2>
        <p className="mt-4 text-gray-600">
          The scheme with the provided ID does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {data.title}
      </h2>

      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <p className="text-gray-700 text-sm mb-4">{data.short_desc}</p>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
          <p className="font-medium">Class: {data.class}</p>
          <p className="font-medium">
            Date: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <iframe
            src={`https://docs.google.com/gview?url=${data.url}&embedded=true`}
            style={{ width: "100%", height: "90vh" }}
            frameBorder="0"
            title="PDF Viewer"
          ></iframe>
        </div>

        <div>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-7339717436236652"
            data-ad-slot="4193914349"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          ></script>
        </div>
        {data.url && (
          <div className="flex flex-col justify-center mt-4">
            <p className="mb-2">Click Below To Download 👇🏻</p>
            <a
              href={data.url}
              download
              className="inline-block text-white text-center bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-sm font-semibold transition duration-300"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-4">
        <div className="collapse bg-base-100 border border-base-300 mb-4">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title font-semibold">Reviews</div>
          <div className="collapse-content text-sm">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="card bg-base-100 shadow-sm mb-4 border border-base-300"
                >
                  <div className="card-body p-4">
                    <h3 className="card-title text-base font-semibold">
                      {review.name} —{" "}
                      <span className="text-sm text-gray-500">
                        {review.email}
                      </span>
                    </h3>
                    <p className="text-sm mt-2">{review.content}</p>
                    <div className="rating mt-2">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${review.id}`}
                          className="mask mask-star-2 bg-yellow-400"
                          checked={i + 1 === review.rating}
                          readOnly
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="collapse bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">Leave a Review</div>
          <div className="collapse-content text-sm">
            <CreateReview schemeId={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

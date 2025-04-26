"use client";
import Image from "next/image";
import React from "react";

export default function GalleryPage({ data }: { data: any[] }) {
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
        {data.map((gallery) => (
          <div key={gallery.id} className="mb-8">
            <div className="carousel carousel-vertical rounded-box h-96">
              {gallery.images.map((image: any, index: number) => (
                <div key={index} className="carousel-item h-full">
                  <div
                    key={image.public_id}
                    className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={image.secure_url}
                      alt="Gallery Image"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                    />

                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(image.secure_url);
                          const blob = await response.blob();
                          const blobUrl = URL.createObjectURL(blob);

                          const a = document.createElement("a");
                          a.href = blobUrl;
                          a.download = "image.jpg";
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);

                          URL.revokeObjectURL(blobUrl);
                        } catch (error) {
                          console.error("Error downloading image:", error);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold mb-4">{gallery.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

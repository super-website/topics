import DeleteBtn from "@/components/DeleteBtn";
import { getAllGallery, deleteGallery } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const galleries = await getAllGallery();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-sm uppercase font-semibold">Gallery</h1>
        <Link href="/control/gallery/add-gallery" className="btn btn-primary">
          Add New
        </Link>
      </div>

      {galleries.length === 0 ? (
        <p className="text-gray-500 mt-4">No galleries available.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {galleries.map((gallery) => {
            let images: { public_id: string; secure_url: string }[] = [];

            try {
              if (typeof gallery.images === "string") {
                images = JSON.parse(gallery.images);
              } else if (Array.isArray(gallery.images)) {
                images = gallery.images as {
                  public_id: string;
                  secure_url: string;
                }[];
              }
            } catch (error) {
              console.error("Error parsing images:", error);
            }

            return (
              <li
                key={gallery.id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <h2 className="text-lg font-semibold text-center mb-2">
                  {gallery.title}
                </h2>

                <div className="border border-dotted border-primary min-h-52 p-4 grid grid-cols-2 gap-4">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className=" border rounded overflow-hidden shadow-sm"
                    >
                      <Image
                        src={file.secure_url}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <DeleteBtn deleteAction={deleteGallery} id={gallery?.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

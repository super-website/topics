import DeleteBtn from "@/components/DeleteBtn";
import { getAllGallery, deleteGallery } from "@/utils/actions";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const banners = await getAllGallery();

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-sm uppercase font-semibold">Gallery</h1>
        <Link href="/control/gallery/add-gallery" className="btn btn-primary">
          Add New
        </Link>
      </div>

      <ul className="w-full bg-base-100 rounded-box shadow-md p-4">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Most played songs this week
        </li>

        {banners.map((banner) => {
          return (
            <li
              className="list-row flex items-center justify-between w-full p-2"
              key={banner.id}
            >
              <div>
                <Image
                  className="size-10 rounded-box"
                  src={banner.image}
                  width={100}
                  height={100}
                  alt={banner.title}
                />
              </div>
              <div>
                <div>{banner.title}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {banner.text}
                </div>
              </div>
              <form action={deleteGallery}>
                <button type="submit">
                  <Trash className="w-4 h-4 text-red-300" />
                </button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

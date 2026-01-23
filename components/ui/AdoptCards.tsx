"use client";
import Link from "next/link";
import Image from "next/image";
import { CakeIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import { useParams, usePathname } from "next/navigation";
import { getAdoptCardsContent } from "@/lib/i18n/ui/adopt-cards";

type AdoptCardsProps = {
  filteredDogs?: DogsDataType[];
};

export default function AdoptCards({
  filteredDogs = dogsData,
}: AdoptCardsProps) {
  const pathname = usePathname();
  const params = useParams<{ lang?: string }>();

  const displayedDogs =
    pathname === `/${params?.lang}/home`
      ? filteredDogs.slice(0, 4)
      : filteredDogs;

  const { content } = getAdoptCardsContent(params?.lang);

  return (
    <>
      <motion.section
        className=" bg-white py-10 max-w-6xl mx-auto rounded-3xl my-10 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.5 }}
      >
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {displayedDogs.map((dog) => (
            <div
              key={dog.id}
              className="border border-gray-200 bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={dog.imageUrl}
                alt={dog.name}
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {dog.name}
                </h3>
                <p className="text-sm text-gray-600">{dog.shortDescription}</p>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <CakeIcon className="h-5 w-5 mr-1" />: {dog.age} {content.age}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {content.size}: {content.sizeValues[dog.size] ?? dog.size}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {content.gender}:{" "}
                  {content.genderValues[dog.gender] ?? dog.gender}
                </p>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <Link
                  href={`/${params?.lang}/adopt/${dog.id}/info`}
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors duration-300 font-bold cursor-pointer"
                >
                  {content.button} {dog.name}
                </Link>
              </div>
            </div>
          ))}
        </article>
      </motion.section>
    </>
  );
}

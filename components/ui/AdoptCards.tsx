"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import AdoptListFilter from "../public/adopt/AdoptListFilter";
import { CakeIcon } from "@heroicons/react/20/solid";

export default function AdoptCards() {
  const [filteredDogs, setFilteredDogs] = useState<DogsDataType[]>(dogsData);

  return (
    <>
      <AdoptListFilter dogs={dogsData} onFilterChange={setFilteredDogs} />
      <section className=" bg-white py-16 max-w-6xl mx-auto rounded-3xl my-20 shadow-xl">
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {filteredDogs.map((dog) => (
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
                  <CakeIcon className="h-5 w-5 mr-1" />: {dog.age}
                </p>
                <p className="mt-2 text-sm text-gray-500">Tamaño: {dog.size}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Genero: {dog.gender}
                </p>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <Link
                  href={`/adopt/${dog.id}/info`}
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors duration-300 font-bold cursor-pointer"
                >
                  Conoce a {dog.name}
                </Link>
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}

"use client";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CakeIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import type { DogsDataType } from "@/db/dogs";
import { getAdoptCardsContent } from "@/lib/i18n/ui/adopt-cards";
import AnimalsInfoSkeleton from "@/components/skeletons/AnimalsInfoSkeleton";

type AdoptCardsProps = {
  animals?: DogsDataType[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function AdoptCards({
  animals,
  isLoading = false,
  isError = false,
}: AdoptCardsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ lang?: string }>();

  const filteredAnimals =
    pathname === `/${params?.lang}/home` ? animals?.slice(0, 4) : animals;

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
          {isLoading ? (
            <AnimalsInfoSkeleton />
          ) : isError ? (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="mx-auto h-16 w-16 text-red-400 mb-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
                    strokeWidth={2}
                  />
                </svg>
                <h3 className="text-xl font-bold text-red-600 mb-2">
                  {params?.lang === "es-mx"
                    ? "Error al cargar las mascotas"
                    : "Error loading pets"}
                </h3>
                <p className="text-gray-600">
                  {params?.lang === "es-mx"
                    ? "No se pudieron cargar los datos. Por favor, intenta recargar la página."
                    : "Unable to load data. Please try reloading the page."}
                </p>
              </div>
            </div>
          ) : filteredAnimals?.length === 0 ? (
            <div className="text-center text-gray-500 col-span-full animate-pulse">
              {params?.lang === "es-mx"
                ? "No se encontraron mascotas para adoptar."
                : "No pets available for adoption."}
            </div>
          ) : (
            filteredAnimals?.map((dog: DogsDataType) => (
              <div
                key={dog.id}
                className="border border-gray-200 bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={dog.media?.[0]?.url}
                  alt={dog.name}
                  width={400}
                  height={300}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {dog.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dog.shortDescription}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 flex items-center">
                    <CakeIcon className="h-5 w-5 mr-1" />: {dog.age}{" "}
                    {content.age}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {content.size}: {content.sizeValues[dog.size] ?? dog.size}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {content.gender}:{" "}
                    {content.genderValues[dog.gender] ?? dog.gender}
                  </p>
                </div>
                {dog.availableForAdoption === "adopted" ? (
                  <div className="text-center bg-red-400 border border-red-600 rounded-2xl px-4 py-2 w-2/3 mx-auto my-4">
                    <span className="text-white font-bold">
                      {params?.lang === "es-mx" ? "Adoptado" : "Adopted"}
                    </span>
                  </div>
                ) : (
                  <div className="p-4 border-t border-gray-200 text-center">
                    {dog.availableForAdoption === "pending" ? (
                      <button
                        disabled
                        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed font-bold"
                      >
                        {params?.lang === "es-mx"
                          ? "Adopción en proceso"
                          : "Adoption Pending"}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          router.push(`/${params?.lang}/adopt/${dog.id}/info`)
                        }
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors duration-300 font-bold cursor-pointer"
                      >
                        {content.button} {dog.name}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </article>
      </motion.section>
    </>
  );
}

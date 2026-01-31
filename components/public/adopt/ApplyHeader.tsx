"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import FormAdopt from "./FormAdopt";
import type { DogsDataType } from "@/db/dogs";
import { getAdoptFormContent } from "@/lib/i18n/adopt/adopt-form";
import { getAnimalById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export default function ApplyHeader() {
  const params = useParams<{ lang?: string; slug?: string }>();
  const { slug } = params;

  const { content } = getAdoptFormContent(params?.lang);

  const { data } = useQuery({
    queryKey: ["animal", slug],
    queryFn: () => getAnimalById(Number(slug)),
  });

  const dog = data as DogsDataType | undefined;

  const genderTranslations: Record<string, keyof typeof content.gender> = {
    Male: "genderMale",
    Female: "genderFemale",
  };

  const translateGender = (gender?: string) => {
    if (!gender) return gender;
    const key = genderTranslations[gender];
    return key ? content.gender[key] : gender;
  };

  const attributeBadges = [
    {
      label: content.attributes.kids,
      value: dog?.goodWithKids,
    },
    {
      label: content.attributes.dogs,
      value: dog?.goodWithDogs,
    },
    {
      label: content.attributes.houseTrained,
      value: dog?.homeTrained,
    },
  ];

  return (
    <motion.main
      className="max-w-7xl mx-auto p-8 bg-white py-30 my-10 grid md:grid-cols-3 gap-6 rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    >
      <article className="md:col-span-2 bg-gray-200 p-6 rounded-2xl">
        <header className="pb-10">
          <h1 className="text-3xl font-bold mb-4">
            {content.header.formTitle}
          </h1>
          <p className="text-gray-600">{content.header.formDescription}</p>
        </header>
        <FormAdopt slug={Number(slug)} />
      </article>

      {/* Dog information */}
      <article className="flex flex-col items-center md:col-span-1 px-4 ">
        <section className="overflow-hidden rounded-t-lg">
          {dog?.media?.[0]?.url ? (
            <Image
              src={dog.media[0].url}
              alt={dog?.name ?? "Imagen de perro"}
              width={300}
              height={300}
              className="w-md md:w-100 h-55 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-md md:w-100 h-55 bg-gray-200 flex items-center justify-center text-gray-500">
              {content.header.noImage}
            </div>
          )}
        </section>
        <section className="bg-gray-200 p-4 rounded-b-lg w-auto">
          <p className="text-emerald-400 font-medium">
            {content.header.applyingFor}
          </p>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mt-4 mb-2">{dog?.name}</h2>
            <p
              className={`font-medium ${
                dog?.gender === "Male" ? "text-blue-500" : "text-pink-500"
              }`}
            >
              {translateGender(dog?.gender)}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-600 mb-4">{dog?.breed}</p>
            <span>-</span>
            <p className="text-gray-600 mb-4">
              {dog?.age} {params?.lang === "es-mx" ? "años" : "years"}
            </p>
          </div>

          <div className="flex text-xs flex-wrap items-center gap-2 text-black font-bold">
            {attributeBadges.map(({ label, value }) => (
              <div
                key={label}
                className={`${value ? "bg-emerald-500" : "bg-red-400"} px-2 py-1 rounded-lg`}
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  {label}: {value ? content.yesNo.yes : content.yesNo.no}
                </dd>
              </div>
            ))}
          </div>
        </section>
      </article>
    </motion.main>
  );
}

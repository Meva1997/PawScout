"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  CakeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  PaintBrushIcon,
} from "@heroicons/react/20/solid";
import { getAnimalInfo } from "@/lib/i18n/adopt/animal-info";
import type { DogsDataType } from "@/db/dogs";
import { getAnimalById } from "@/api/api";
import SwiperCarousel from "@/components/ui/SwiperCarousel";

export default function AnimalInfo() {
  const router = useRouter();

  const params = useParams<{ lang?: string; slug?: string }>();
  const { slug } = params;

  const { content } = getAnimalInfo(params?.lang);

  const { data } = useQuery({
    queryKey: ["animal", slug],
    queryFn: () => getAnimalById(Number(slug)),
  });

  const dog = data as DogsDataType | undefined;

  const genderKeyMap: Record<string, keyof typeof content.gender> = {
    Male: "genderMale",
    Female: "genderFemale",
  };

  const sizeKeyMap: Record<string, keyof typeof content.size> = {
    Small: "small",
    Medium: "medium",
    Large: "large",
  };

  const translateGender = (value?: string) => {
    if (!value) return value;
    const key = genderKeyMap[value];
    return key ? content.gender[key] : value;
  };

  const translateSize = (value?: string) => {
    if (!value) return value;
    const key = sizeKeyMap[value];
    return key ? content.size[key] : value;
  };

  const attributeBadges = [
    {
      label: content.label.kids,
      value: dog?.goodWithKids,
    },
    {
      label: content.label.dogs,
      value: dog?.goodWithDogs,
    },
    {
      label: content.label.houseTrained,
      value: dog?.homeTrained,
    },
  ];

  const infoCards = [
    {
      label: content.infoCards[0].label,
      value: dog?.age,
      Icon: CakeIcon,
    },
    {
      label: content.infoCards[1].label,
      value: translateGender(dog?.gender),
      Icon: QuestionMarkCircleIcon,
    },
    {
      label: content.infoCards[2].label,
      value: translateSize(dog?.size),
      Icon: ScaleIcon,
    },
    {
      label: content.infoCards[3].label,
      value: dog?.breed,
      Icon: PaintBrushIcon,
    },
  ];

  return (
    <>
      <motion.div
        className="max-w-6xl mx-auto p-8 bg-gray-200 py-20 my-20 rounded-3xl shadow-xl"
        aria-labelledby="dog-info-heading"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
          <figure className="flex flex-col mx-auto w-full max-w-2xl lg:max-w-none">
            <Link
              href={`/${params?.lang}/adopt`}
              className="text-emerald-600 font-bold mb-2 hover:text-emerald-800"
            >
              &larr; {content.backLink}
            </Link>
            {/* Image gallery with thumbnails */}
            <SwiperCarousel dog={dog} />
          </figure>
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <header id="dog-info-heading">
              <h1 className="text-3xl font-bold mb-4">{dog?.name}</h1>
              <p className="text-gray-400">
                {dog?.breed} Id: {dog?.id}
              </p>
            </header>
            <div className="py-6">
              <dl className="flex space-x-2 gap-4 flex-wrap font-bold text-sm">
                {attributeBadges.map(({ label, value }) => (
                  <div
                    key={label}
                    className={`${value ? "bg-emerald-500" : "bg-red-400"} px-2 py-1 rounded-lg`}
                  >
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      {label}:{" "}
                      {value
                        ? content.valueBoolean.yes
                        : content.valueBoolean.no}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <section
              className="grid grid-cols-2 gap-4"
              aria-labelledby="dog-details-heading"
            >
              <h2 id="dog-details-heading" className="sr-only">
                Detalles clave del animal
              </h2>
              {infoCards.map(({ label, value, Icon }) => (
                <div key={label} className="bg-white p-4 rounded-lg mb-4">
                  <dl>
                    <div className="flex items-center mb-2">
                      <Icon className="h-6 w-6 inline-block mr-2 text-emerald-500" />
                      <dt>{label}</dt>
                    </div>
                    <dd className="font-bold text-black">{value}</dd>
                  </dl>
                </div>
              ))}
            </section>
            <section className="bg-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">
                {content.about} {dog?.name} ✨
              </h2>
              <p className="text-gray-700 leading-relaxed wrap-break-word">
                {dog?.longDescription}
              </p>
            </section>
            <section className="mt-6 bg-emerald-500 p-4 rounded-lg text-center font-black hover:bg-emerald-700 transition-colors cursor-pointer">
              <button
                onClick={() =>
                  router.push(`/${params?.lang}/adopt/${dog?.id}/adopt-form`)
                }
                role="button"
                aria-label={`Aplicar para adoptar a ${dog?.name}`}
                className="cursor-pointer"
              >
                {content.linkToAdopt} -&gt;{" "}
              </button>
            </section>
          </motion.div>
        </article>
      </motion.div>
      <motion.hr
        className="text-emerald-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
    </>
  );
}

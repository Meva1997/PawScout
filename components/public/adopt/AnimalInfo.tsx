"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  CakeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  PaintBrushIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";
import { getAnimalInfo } from "@/lib/i18n/adopt/animal-info";
import type { DogsDataType } from "@/db/dogs";
import { getAnimalById } from "@/api/api";
import SwiperCarousel from "@/components/ui/SwiperCarousel";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

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
    { label: content.label.kids, value: dog?.goodWithKids },
    { label: content.label.dogs, value: dog?.goodWithDogs },
    { label: content.label.houseTrained, value: dog?.homeTrained },
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
    <motion.section
      className="max-w-6xl mx-auto py-12 md:py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-labelledby="dog-info-heading"
    >
      {/* Back link */}
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          href={`/${params?.lang}/adopt`}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-emerald-600 transition-colors duration-200 group"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          {content.backLink}
        </Link>
      </motion.div>

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: Gallery */}
        <motion.figure variants={itemVariants} className="w-full">
          <SwiperCarousel dog={dog} />
        </motion.figure>

        {/* Right: Info panel */}
        <div className="flex flex-col gap-6">
          {/* Header */}
          <motion.header variants={itemVariants} id="dog-info-heading">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
              {dog?.breed}
              {dog?.id ? ` · #${dog.id}` : ""}
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-none tracking-tight">
              {dog?.name}
            </h1>
          </motion.header>

          {/* Boolean attribute badges */}
          <motion.div variants={itemVariants}>
            <dl className="flex flex-wrap gap-2">
              {attributeBadges.map(({ label, value }) => (
                <div
                  key={label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    value
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                  }`}
                >
                  {value ? (
                    <CheckCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircleIcon className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <dt className="sr-only">{label}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Info cards grid */}
          <motion.section
            variants={itemVariants}
            className="grid grid-cols-2 gap-3"
            aria-labelledby="dog-details-heading"
          >
            <h2 id="dog-details-heading" className="sr-only">
              Detalles clave del animal
            </h2>
            {infoCards.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="bg-stone-50 rounded-2xl p-4 ring-1 ring-stone-100 hover:ring-emerald-200 hover:bg-emerald-50/30 transition-all duration-200"
              >
                <dl>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center p-1.5 bg-emerald-100 rounded-lg">
                      <Icon className="h-4 w-4 text-emerald-600" />
                    </span>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                      {label}
                    </dt>
                  </div>
                  <dd className="text-base font-bold text-stone-900 pl-0.5">
                    {value}
                  </dd>
                </dl>
              </div>
            ))}
          </motion.section>

          {/* About section */}
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-3">
              <span className="h-0.5 w-5 bg-emerald-400 rounded-full shrink-0" />
              {content.about} {dog?.name}
            </h2>
            <p className="text-stone-500 leading-relaxed text-sm">
              {dog?.longDescription}
            </p>
          </motion.section>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() =>
                router.push(`/${params?.lang}/adopt/${dog?.id}/adopt-form`)
              }
              role="button"
              aria-label={`Aplicar para adoptar a ${dog?.name}`}
              className="w-full inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-200 transition-all duration-200 cursor-pointer"
            >
              {content.linkToAdopt}
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </article>
    </motion.section>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getHeroContent } from "@/lib/i18n/home/hero";

export default function HeroSection() {
  const params = useParams<{ lang?: string }>();
  const { lang, content } = getHeroContent(params?.lang);
  return (
    <>
      <motion.section
        className="bg-white max-w-6xl mx-auto my-20 rounded-3xl shadow-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="grid md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto gap-8 py-16 px-4">
          <article className="mx-auto">
            <div className="rounded-xl px-3 border border-emerald-500 bg-emerald-50 inline-block mb-4">
              <p className="text-sm text-emerald-700 font-black">
                {content.badge}
              </p>
            </div>
            <h2 className="text-4xl font-black leading-tight max-w-md">
              {content.titlePrefix}{" "}
              <span className="font-black text-6xl text-emerald-600">
                {content.titleHighlight}
              </span>{" "}
              {content.titleSuffix}
            </h2>
            <p className="text-gray-700 mt-6 max-w-md">{content.description}</p>
            <div className="mt-8 flex gap-4">
              <Link
                href={`/${lang}/adopt`}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all cursor-pointer"
              >
                {content.primaryCta}
              </Link>
              <Link
                href={`/${lang}/login`}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all cursor-pointer"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </article>
          <article className="relative mx-auto">
            <Image
              src="/dog-smiling-camera.png"
              alt="Descripción de la imagen"
              width={500}
              height={200}
              className="rounded-2xl shadow-xl object-cover h-90 w-140"
              loading="eager"
            />
            <div className="absolute bottom-2 left-4 bg-white text-black px-3 py-2 rounded-md text-sm font-semibold">
              <p className="font-bold text-lg">{content.photoTitle}</p>
              <p className="text-gray-700">{content.photoSubtitle}</p>
            </div>
          </article>
        </div>
      </motion.section>
      <motion.section
        className="bg-white rounded-3xl max-w-6xl shadow-xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <article className="md:flex grid grid-cols-2 gap-6 md:gap-0 justify-evenly max-w-6xl mx-auto py-12 px-4 text-center text-gray-700">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-bold text-emerald-600 text-2xl">
                {stat.value}
              </p>
              <p>{stat.label}</p>
            </div>
          ))}
        </article>
      </motion.section>
    </>
  );
}

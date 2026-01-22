"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import {
  getHeroVolunteerContent,
  type BenefitIconKey,
} from "@/lib/i18n/volunteer/hero-volunteer";

const benefitIconMap: Record<
  BenefitIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  heart: HeartIcon,
  community: UserGroupIcon,
  growth: AcademicCapIcon,
  wellness: ShieldCheckIcon,
};

export default function HeroVolunteer() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content, lang } = getHeroVolunteerContent(langParam);

  return (
    <>
      <motion.article
        className="grid md:grid-cols-2 max-w-6xl justify-center items-center mx-auto gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <section className="flex flex-col justify-center items-start p-8 my-10">
          <h1 className="font-black text-4xl">
            {content.headingPrimary}
            <span className="text-emerald-600 text-5xl underline decoration-amber-600">
              {" "}
              {content.headingHighlight}
            </span>
          </h1>
          <p className="pt-2">{content.intro}</p>
          <Link
            href={`/${lang}/volunteer/form`}
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-all font-bold cursor-pointer"
          >
            {content.ctaLabel}
          </Link>
        </section>
        <section className="flex justify-center items-center md:mr-10 ">
          <Image
            src="/volunteer-pawscout.png"
            alt={content.imageAlt}
            width={400}
            height={200}
            className="md:w-120 h-auto rounded-xl rotate-3"
          />
        </section>
      </motion.article>
      <motion.article
        className="mt-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="grid md:grid-cols-3">
          {content.stats.map((stat) => (
            <div key={stat.label} className="p-8 text-center">
              <h2 className="font-bold text-3xl text-emerald-600">
                {stat.value}
              </h2>
              <p className="mt-2">{stat.label}</p>
            </div>
          ))}
        </section>
      </motion.article>
      <motion.article
        className="grid md:grid-cols-3 max-w-6xl justify-center items-center mx-auto gap-18 bg-white p-10 rounded-lg shadow-lg my-16"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="space-y-4 col-span-1">
          <p className="font-bold text-emerald-600 text-md">
            {content.benefitsSection.label}
          </p>
          <h3 className="text-3xl font-black">
            {content.benefitsSection.heading}
          </h3>
          <p className="text-gray-500">{content.benefitsSection.description}</p>
        </section>
        <section className="grid md:grid-cols-2 gap-10 col-span-2">
          {content.benefitsSection.items.map((benefit) => {
            const Icon = benefitIconMap[benefit.iconKey];
            return (
              <div
                key={benefit.title}
                className="border-2 border-gray-200 p-4 rounded-lg bg-gray-50 shadow-md"
              >
                <Icon className="h-6 w-6 text-emerald-600 mb-2" />
                <h5 className="font-bold text-lg mb-2">{benefit.title}</h5>
                <p className="text-gray-500">{benefit.description}</p>
              </div>
            );
          })}
        </section>
      </motion.article>
    </>
  );
}

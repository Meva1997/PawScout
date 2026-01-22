"use client";
import { useState } from "react";
import AdoptListFilter from "@/components/public/adopt/AdoptListFilter";
import AdoptCards from "@/components/ui/AdoptCards";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getAdoptHeroContents } from "@/lib/i18n/adopt/adopt-hero";

export default function AdoptMain() {
  const [filteredDogs, setFilteredDogs] = useState<DogsDataType[]>(dogsData);
  const params = useParams<{ lang?: string }>();
  const { content } = getAdoptHeroContents(params?.lang);

  return (
    <main className="bg-gray-200 py-10 px-6">
      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto bg-white rounded-3xl my-20 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="max-w-2xl">
          <h1 className="font-black text-4xl text-black">
            {content.title}{" "}
            <span className="text-emerald-600 text-5xl">
              {content.titleSpan}
            </span>{" "}
            {content.titleEnd}
          </h1>
          <p className="pt-2 text-gray-500">{content.subtitle}</p>
        </div>
      </motion.section>
      <AdoptListFilter dogs={dogsData} onFilterChange={setFilteredDogs} />

      <AdoptCards filteredDogs={filteredDogs} />
    </main>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllAnimals } from "@/api/api";
import AdoptListFilter from "@/components/public/adopt/AdoptListFilter";
import AdoptCards from "@/components/ui/AdoptCards";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getAdoptHeroContents } from "@/lib/i18n/adopt/adopt-hero";
import { useState, useEffect, useMemo } from "react";

export default function AdoptMain() {
  const params = useParams<{ lang?: string }>();
  const { content } = getAdoptHeroContents(params?.lang);

  const { data, isError, isPending } = useQuery({
    queryKey: ["animals"],
    queryFn: getAllAnimals,
    retry: 2,
  });

  const animals = useMemo(
    () => (Array.isArray(data?.animals) ? data.animals : []),
    [data?.animals],
  );

  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  // Sincronizar filteredAnimals cuando animals cambie
  useEffect(() => {
    setFilteredAnimals(animals);
  }, [animals]);

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
      <AdoptListFilter animals={animals} onFilterChange={setFilteredAnimals} />

      {isError ? (
        <div className="max-w-6xl mx-auto text-red-500 font-semibold mb-6">
          {params?.lang === "es-mx"
            ? "Error al cargar los datos de las mascotas."
            : "Error loading pet data."}
        </div>
      ) : (
        <AdoptCards animals={filteredAnimals} isLoading={isPending} />
      )}
    </main>
  );
}

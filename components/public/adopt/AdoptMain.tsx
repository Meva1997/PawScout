"use client";
import { useState } from "react";
import AdoptListFilter from "@/components/public/adopt/AdoptListFilter";
import AdoptCards from "@/components/ui/AdoptCards";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import { motion } from "framer-motion";

export default function AdoptMain() {
  const [filteredDogs, setFilteredDogs] = useState<DogsDataType[]>(dogsData);

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
            Encuentra tu{" "}
            <span className="text-emerald-600 text-5xl">mascota ideal</span>{" "}
            para adoptar
          </h1>
          <p className="pt-2 text-gray-500">
            Explora nuestra amplia selección de mascotas disponibles para
            adopción y encuentra el compañero perfecto para ti.
          </p>
        </div>
      </motion.section>
      <AdoptListFilter dogs={dogsData} onFilterChange={setFilteredDogs} />

      <AdoptCards filteredDogs={filteredDogs} />
    </main>
  );
}

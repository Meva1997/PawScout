"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AdoptCards from "@/components/ui/AdoptCards";

export default function NewArrivals() {
  return (
    <motion.section
      className="py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <article>
        <h4 className="text-3xl font-black text-black">Esperando un hogar</h4>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between">
          <p className="text-gray-700 mt-2">
            Descubre las nuevas mascotas que buscan un hogar amoroso.
          </p>
          <Link
            href="/adopt"
            className="font-bold text-emerald-600 hover:text-emerald-700"
          >
            Ver más →
          </Link>
        </div>
      </article>

      <AdoptCards />
    </motion.section>
  );
}

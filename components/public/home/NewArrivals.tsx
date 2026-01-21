"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AdoptCards from "@/components/ui/AdoptCards";
import { getNewArrivalsContent } from "@/lib/i18n/home/new-arrivals";
import { useParams } from "next/navigation";

export default function NewArrivals() {
  const params = useParams<{ lang?: string }>();
  const { content } = getNewArrivalsContent(params?.lang);
  return (
    <motion.section
      className="py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <article>
        <h4 className="text-3xl font-black text-black">{content.title}</h4>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between">
          <p className="text-gray-700 mt-2">{content.description}</p>
          <Link
            href={`/${params?.lang || "en"}/adopt`}
            className="font-bold text-emerald-600 hover:text-emerald-700"
          >
            {content.linkText}
          </Link>
        </div>
      </article>

      <AdoptCards />
    </motion.section>
  );
}

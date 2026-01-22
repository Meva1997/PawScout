"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getAdoptSuccessContent } from "@/lib/i18n/adopt/success-submit-adopt";

export default function Page() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content, lang } = getAdoptSuccessContent(langParam);

  return (
    <main className="bg-gray-200 py-10">
      <motion.section
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-20"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-600 mb-2">
            {content.title}
          </h1>
          <p className="text-gray-600">{content.intro}</p>
        </header>
        <article className="text-gray-700 space-y-4">
          {content.body.map((paragraph, index) => (
            <p key={paragraph.slice(0, 12) + index}>{paragraph}</p>
          ))}
          <p className="text-emerald-600 font-bold">{content.thanks}</p>
        </article>
        <article>
          <Link
            href={`/${lang}/adopt`}
            className="inline-block mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {content.cta}
          </Link>
        </article>
      </motion.section>
    </main>
  );
}

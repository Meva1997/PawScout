"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getTermsContent } from "@/lib/i18n/terms-conditions/terms-conditions";
import { DocumentTextIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export default function TermsConditionsMain() {
  const params = useParams<{ lang?: string }>();
  const { content, lang } = getTermsContent(params?.lang);

  return (
    <main className="bg-gray-200 py-10">
      {/* Hero */}
      <motion.section
        className="max-w-4xl mx-auto pt-16 px-4 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
          {content.heroLabel}
        </span>
        <h1 className="text-4xl font-black text-gray-800">
          {content.heroTitle}
        </h1>
        <p className="text-gray-500 text-lg">{content.heroSubtitle}</p>
        <p className="text-xs text-gray-400 italic">{content.lastUpdated}</p>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 mt-12 flex flex-col lg:flex-row gap-8">
        {/* Table of contents — sticky sidebar */}
        <motion.aside
          className="lg:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-md p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <DocumentTextIcon className="h-5 text-emerald-600" />
              <h2 className="font-bold text-gray-700">
                {content.tableOfContentsTitle}
              </h2>
            </div>
            <nav>
              <ul className="space-y-2">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <ArrowRightIcon className="h-3 shrink-0" />
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 space-y-6 pb-20">
          {content.sections.map((section, index) => (
            <motion.article
              key={section.id}
              id={section.id}
              className="bg-white rounded-xl shadow-md p-8 scroll-mt-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <h3 className="text-xl font-bold text-emerald-700 mb-4 border-b border-gray-100 pb-3">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-gray-600 leading-relaxed text-sm"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}

          {/* Contact CTA */}
          <motion.div
            className="bg-emerald-600 rounded-xl p-8 text-white text-center shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-3">{content.contactTitle}</h3>
            <p className="text-emerald-100 mb-6 text-sm leading-relaxed">
              {content.contactText}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block bg-white text-emerald-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
            >
              {lang === "en" ? "Contact Us" : "Contáctanos"}
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

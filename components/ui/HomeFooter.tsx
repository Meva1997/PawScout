"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getFooterContent } from "@/lib/i18n/ui/footer";

export default function HomeFooter() {
  const params = useParams<{ lang?: string }>();
  const { content } = getFooterContent(params?.lang);
  return (
    <>
      <motion.footer
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 mb-10 px-8 gap-8 max-w-6xl mx-auto">
          <article>
            <h2 className="font-bold text-black text-xl">🐾 PawScout</h2>
            <p className="text-gray-700 mt-4 max-w-xs text-sm">
              {content.description}
            </p>
          </article>
          <article className="space-y-4 flex flex-col ">
            <h2 className="font-bold text-black text-xl">
              {content.subtitleAdopt}
            </h2>
            <Link
              href={`/${params?.lang}/adopt`}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              {content.linkContact.linkAdopt}
            </Link>
            <Link
              href={`/${params?.lang}/home`}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              {content.linkContact.linkHowAdopt}
            </Link>
            <Link
              href={`/${params?.lang}/terms-conditions`}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              {content.linkContact.linkTerms}
            </Link>
          </article>
          <article className="space-y-4 flex flex-col ">
            <h2 className="font-bold text-black text-xl">
              {content.subtitleHelp}
            </h2>
            <Link
              href={`/${params?.lang}/donate`}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              {content.linkContact.linkHelp}
            </Link>
            <Link
              href={`/${params?.lang}/volunteer`}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              {content.linkContact.linkVolunteer}
            </Link>
          </article>
          <article className="space-y-4 flex flex-col">
            <h2 className="font-bold text-black text-xl">
              {content.subtitleContact}
            </h2>
            <p className="text-gray-700 text-sm">
              {content.creatorContact.email}
            </p>
            <p className="text-gray-700 text-sm">
              {" "}
              {content.creatorContact.phoneNumber}
            </p>
            <a
              href={content.creatorContact.gitHub}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub: {content.creatorContact.gitHub}
            </a>
            <a
              href={content.creatorContact.linkedIn}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin: {content.creatorContact.linkedIn}
            </a>
            <a
              href={content.creatorContact.portfolio}
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              {params?.lang == "en" ? "Portfolio" : "Portafolio"}:{" "}
              {content.creatorContact.portfolio}
            </a>
          </article>
        </section>
        <hr className="max-w-6xl mx-auto my-10" />
        <section className="py-6 px-8 text-center text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} {content.legal.reservedRights}
        </section>
        <section className="px-6">
          <div className="bg-gray-200 text-gray-700 max-w-6xl mx-auto my-10 rounded-2xl shadow-xl p-6 space-y-4">
            <h3 className="font-semibold text-black">
              {content.legal.legalAdvice}
            </h3>
            <p>{content.legal.content}</p>
            <p>
              {content.legal.personalProject}{" "}
              <a
                href={`mailto:${content.creatorContact.email}`}
                className="text-emerald-600 underline"
              >
                {" "}
                {content.creatorContact.email}
              </a>
            </p>

            <p>{content.legal.webContent}</p>
          </div>
        </section>
      </motion.footer>
    </>
  );
}

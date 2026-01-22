"use client";
import { motion } from "framer-motion";
import { getNewsEmailContent } from "@/lib/i18n/home/news-email";
import { useParams } from "next/navigation";

export default function EmailSubscription() {
  const params = useParams<{ lang?: string }>();
  const { content } = getNewsEmailContent(params?.lang);

  return (
    <>
      <motion.section
        className="bg-emerald-500 py-16 max-w-6xl mx-auto rounded-3xl my-20 shadow-lg shadow-emerald-200/40"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <article className="text-center px-4">
          <h6 className="text-3xl font-black text-black mb-4">
            {content.title}
          </h6>
          <p className="text-black text-md max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </article>
        <article>
          <form className="mt-8 flex flex-col md:flex-row justify-center max-w-lg mx-auto gap-6">
            <input
              type="email"
              inputMode="email"
              placeholder={content.placeholderText}
              className="mx-auto w-2/3 md:w-full px-4 py-2 rounded-md focus:outline-none bg-white text-center"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer w-1/3 mx-auto md:w-full"
            >
              {content.buttonText}
            </button>
          </form>
        </article>
      </motion.section>
    </>
  );
}

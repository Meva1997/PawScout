"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getMoneyInfoContent } from "@/lib/i18n/donate/money-info";

export default function MoneyInfo() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content } = getMoneyInfoContent(langParam);
  const { heading, intro, allocations, story } = content;

  return (
    <>
      <motion.article
        className="max-w-6xl mx-auto p-8 rounded-lg shadow-md bg-white my-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="text-center mb-10">
          <h3 className="text-3xl font-bold">{heading}</h3>
          <p className="text-gray-500 pt-2 max-w-2xl mx-auto">{intro}</p>
        </section>
        <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto p-8">
          {allocations.map((allocation) => (
            <div
              key={allocation.title}
              className="bg-gray-100 p-6 rounded-lg text-center shadow-sm"
            >
              <p className="text-center py-2">{allocation.emoji}</p>
              <p className="text-center font-bold text-2xl">
                {allocation.percentage}
              </p>
              <h4 className="font-bold text-lg mb-4">{allocation.title}</h4>
              <p className="text-gray-500">{allocation.description}</p>
            </div>
          ))}
        </section>
      </motion.article>
      <motion.article
        className="grid md:grid-cols-2 bg-white max-w-6xl mx-auto my-20 shadow-lg rounded-lg overflow-hidden p-10 gap-10 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section>
          <p className="text-orange-500 pb-2 font-medium">{story.label}</p>
          <h4 className="font-bold text-xl">{story.heading}</h4>
          <p className="text-gray-500 font-medium my-4">{story.body}</p>
          <p className="font-bold mt-6">{story.signature}</p>
        </section>
        <section>
          <Image
            src="/dog-smiling-camera.png"
            alt={story.imageAlt}
            width={500}
            height={300}
            className="w-full h-auto rounded-xl mb-4 rotate-4"
          />
        </section>
      </motion.article>
    </>
  );
}

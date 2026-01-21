"use client";

import { motion } from "framer-motion";
import { getHowWorksContent } from "@/lib/i18n/home/how-works";
import { useParams } from "next/navigation";

export default function HowWorks() {
  const params = useParams<{ lang?: string }>();
  const { content, steps } = getHowWorksContent(params?.lang);
  return (
    <>
      <motion.section
        className="bg-white px-4 py-14 max-w-6xl mx-auto my-20 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <article className="mb-10 max-w-6xl mx-auto">
          <h3 className="text-3xl font-black text-black">{content.title}</h3>
          <p className="text-gray-700 my-2 max-w-3xl">{content.description}</p>
        </article>
        <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="flex grow">
              <div className="bg-gray-100 rounded-xl space-y-2 p-6 shadow-md">
                <p>{step.icon}</p>
                <p className="text-black font-bold text-xl ">{step.title}</p>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </article>
      </motion.section>
    </>
  );
}

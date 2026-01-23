"use client";
import VolunteerForm from "@/components/public/volunteer/VolunteerForm";
import { getHeaderFormVolunteerContent } from "@/lib/i18n/volunteer/header-form-volunteer";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function HeaderPageForm() {
  const params = useParams<{ lang?: string }>();
  const { content } = getHeaderFormVolunteerContent(params?.lang);

  return (
    <motion.main
      className="bg-gray-200 pb-30 pt-10 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <article className=" flex flex-col justify-center items-center gap-4 p-8">
        <div className="bg-emerald-500 rounded-full px-4 py-2 mb-4">
          <p className="text-black font-bold text-sm">{content.label}</p>
        </div>
        <h1 className="font-black text-4xl">
          {content.heading}{" "}
          <span className="text-emerald-600 uppercase">
            {content.headingSpan}
          </span>{" "}
          {content.headingFinal}
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-center">
          {content.intro}
        </p>
      </article>

      <VolunteerForm />
    </motion.main>
  );
}

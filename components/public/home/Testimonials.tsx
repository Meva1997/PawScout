"use client";
import { motion } from "framer-motion";
import { getTestimonialsContent } from "@/lib/i18n/home/testimonials";
import { useParams } from "next/navigation";

export default function Testimonials() {
  const params = useParams<{ lang?: string }>();
  const { header, content: testimonials } = getTestimonialsContent(
    params?.lang
  );

  return (
    <>
      <motion.section
        className="bg-white max-w-6xl mx-auto p-6 my-20 text-center rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <article>
          <h5 className="text-3xl font-black">{header.title}</h5>
          <p className="text-gray-700 py-4">{header.subtitle}</p>
        </article>
        <article>
          <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                <p className="text-black mb-4">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="mt-4">
                  <h6 className="font-semibold">-{testimonial.name}</h6>
                  <span className="text-sm text-gray-600">
                    {testimonial.adopted}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </motion.section>
    </>
  );
}

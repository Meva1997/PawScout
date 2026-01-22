"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { getVolunteerRequirementsContent } from "@/lib/i18n/volunteer/requirements-volunteer";

export default function VolunteerRequirements() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content, lang } = getVolunteerRequirementsContent(langParam);

  return (
    <>
      <motion.article
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="grid md:grid-cols-2 mx-auto rounded-lg overflow-hidden shadow-lg  bg-white gap-8 md:max-w-6xl w-2/3 md:w-full">
          <div className="space-y-4 p-8 mt-10">
            <h5 className="text-xl font-bold">{content.heading}</h5>
            <p className="text-gray-500">{content.intro}</p>
            <ul className="space-y-3">
              {content.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image
              src="/volunteer-paw.png"
              alt={content.imageAlt}
              width={500}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      </motion.article>
      <article>
        <section className="grid md:grid-cols-3 max-w-6xl mx-auto my-20">
          {content.testimonials.map((volunteer, index) => (
            <motion.div
              key={volunteer.name}
              className="bg-white p-6 m-4 rounded-lg shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.3 }}
            >
              <Image
                src={volunteer.image}
                alt={volunteer.imageAlt}
                width={100}
                height={100}
                className="mb-4 text-center"
              />
              <h5 className="text-lg font-bold mb-2">{volunteer.name}</h5>
              <p className="text-gray-600 text-center">
                &quot;{volunteer.comment}&quot;
              </p>
            </motion.div>
          ))}
        </section>
      </article>
      <motion.article
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <section className="rounded-2xl bg-emerald-500 p-8 space-y-10  md:space-y-4 flex flex-col md:flex-row md:justify-between md:items-center max-w-6xl mx-auto">
          <div>
            <h6 className="font-bold text-xl">{content.cta.heading}</h6>
            <p>{content.cta.subheading}</p>
          </div>
          <div>
            <Link
              href={`/${lang}/volunteer/form`}
              className="bg-black text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all"
            >
              {content.cta.button}
            </Link>
          </div>
        </section>
      </motion.article>
    </>
  );
}

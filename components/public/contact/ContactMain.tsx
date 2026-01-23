"use client";

import type { ComponentType, SVGProps } from "react";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import ContactForm from "@/components/public/contact/ContactForm";
import Faqs from "@/components/public/contact/Faqs";
import MapLocationLoading from "@/components/skeletons/MapLocationLoading";
import {
  PhoneIcon,
  InboxIcon,
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import {
  getContactMainContent,
  type ContactMethodIconKey,
  type MissionIconKey,
} from "@/lib/i18n/contact/contact-main";

const contactIconMap: Record<
  ContactMethodIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  phone: PhoneIcon,
  email: InboxIcon,
  visit: MapPinIcon,
};

const missionIconMap: Record<
  MissionIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  compassion: HeartIcon,
  integrity: ShieldCheckIcon,
  community: UserGroupIcon,
};

export default function ContactMain() {
  const params = useParams<{ lang?: string }>();
  const { content } = getContactMainContent(params?.lang);

  return (
    <main className="bg-gray-200 py-10">
      <motion.article
        className="max-w-6xl mx-auto pt-16 space-y-4 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h1 className="text-3xl font-black text-emerald-600">
          {content.heading}
        </h1>
        <p className="text-gray-500">{content.description}</p>
      </motion.article>
      <article className="grid lg:grid-cols-3 w-3/4 lg:w-full my-20 px-4 gap-6 max-w-6xl mx-auto text-center">
        {content.contactMethods.map((method, index) => {
          const Icon = contactIconMap[method.iconKey];
          return (
            <motion.section
              key={`${method.title}-${method.detail}`}
              className="md:col-span-1 p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-emerald-600">
                <Icon className="h-16 inline-block mr-2 bg-gray-200 p-2 rounded-full" />
                {method.title}
              </h2>
              <p className="mb-2 font-bold text-lg">{method.detail}</p>
              {method.info && (
                <p className="mb-2 text-gray-600 text-sm">{method.info}</p>
              )}
            </motion.section>
          );
        })}
      </article>
      <motion.article
        className="flex flex-col md:flex-row py-20 max-w-6xl mx-auto p-6 gap-8"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Suspense fallback={<MapLocationLoading />}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d-122.419415484681!3d37.77492977975959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b5b5b5b%3A0x5e5e5e5e5e5e5e5e!2s123%20Calle%20Principal%2C%20Ciudad%2C%20Pa%C3%ADs!5e0!3m2!1ses!2sus!4v1610000000000!5m2!1ses!2sus"
            width="100%"
            height="570"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-md mx-auto"
          ></iframe>
        </Suspense>
        <ContactForm />
      </motion.article>
      <motion.article
        className="px-6"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <section className="bg-white max-w-6xl mx-auto rounded-xl p-6 my-10 shadow-xl ">
          <h4 className="font-black text-2xl pb-4">
            {content.mission.heading}
          </h4>
          <p className="text-gray-500">{content.mission.intro}</p>
          <div className="grid md:grid-cols-3 pt-6">
            {content.mission.cards.map((card) => {
              const Icon = missionIconMap[card.iconKey];
              return (
                <div
                  key={card.title}
                  className="p-6 bg-gray-100 rounded-lg m-2"
                >
                  <Icon className="h-10 text-emerald-600 mb-4" />
                  <h5 className="font-bold mb-2">{card.title}</h5>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </motion.article>
      <motion.article
        className="max-w-6xl mx-auto py-20"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <Faqs />
      </motion.article>
    </main>
  );
}

"use client";

import type { ComponentType, SVGProps } from "react";
import { useParams } from "next/navigation";
import {
  UserIcon,
  ClipboardDocumentCheckIcon,
  DevicePhoneMobileIcon,
  DocumentDuplicateIcon,
  GlobeAmericasIcon,
  HandRaisedIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import {
  getVolunteerRoleContent,
  type VolunteerRole,
} from "@/lib/i18n/volunteer/role-volunteer";

const roleIconMap: Record<
  VolunteerRole["iconKey"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  animalCare: UserIcon,
  events: ClipboardDocumentCheckIcon,
  social: DevicePhoneMobileIcon,
  admin: DocumentDuplicateIcon,
  transport: GlobeAmericasIcon,
  training: HandRaisedIcon,
};

export default function VolunteerRoles() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content } = getVolunteerRoleContent(langParam);

  return (
    <>
      <article className="py-20">
        <section className="flex flex-col justify-center text-center space-y-4 mb-8">
          <h4 className="font-bold text-2xl">{content.heading}</h4>
          <p className="text-gray-500 max-w-4xl mx-auto">{content.intro}</p>
        </section>
        <section className="grid md:grid-cols-3 max-w-6xl mx-auto">
          {content.roles.map((role, index) => {
            const Icon = roleIconMap[role.iconKey];
            return (
              <motion.div
                key={role.title}
                className="border-2 border-gray-200 p-4 rounded-lg m-4 bg-white shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Icon className="h-10 w-10 text-emerald-500 mb-4" />
                <h5 className="font-bold text-lg mb-2">{role.title}</h5>
                <p className="text-gray-500">{role.description}</p>
              </motion.div>
            );
          })}
        </section>
      </article>
    </>
  );
}

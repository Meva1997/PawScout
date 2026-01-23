import type { HeroContentKey } from "../home/hero";

type ContactFormContentKey = HeroContentKey;

type ContactFormFieldCopy = {
  label: string;
  placeholder: string;
};

type ContactFormContent = {
  heading: string;
  description: string;
  fields: {
    name: ContactFormFieldCopy;
    lastName: ContactFormFieldCopy;
    email: ContactFormFieldCopy;
  };
  subject: {
    label: string;
    options: { label: string; value: string }[];
  };
  message: {
    label: string;
    placeholder: string;
  };
  submitLabel: string;
};

const contactFormContent: Record<ContactFormContentKey, ContactFormContent> = {
  "es-mx": {
    heading: "Envíanos un mensaje",
    description: "Usualmente respondemos en 24 horas",
    fields: {
      name: { label: "Nombre", placeholder: "Juan" },
      lastName: { label: "Apellido", placeholder: "Pérez" },
      email: {
        label: "Correo electrónico",
        placeholder: "maria@example.com",
      },
    },
    subject: {
      label: "Asunto del mensaje",
      options: [
        { label: "Rescate", value: "rescue" },
        { label: "Adopción", value: "adoption" },
        { label: "Voluntariado", value: "volunteering" },
        { label: "Donaciones", value: "donations" },
        { label: "Otros", value: "others" },
      ],
    },
    message: {
      label: "Mensaje",
      placeholder: "Escribe tu mensaje aquí...",
    },
    submitLabel: "Enviar mensaje",
  },
  en: {
    heading: "Send us a message",
    description: "We typically reply within 24 hours",
    fields: {
      name: { label: "First Name", placeholder: "John" },
      lastName: { label: "Last Name", placeholder: "Doe" },
      email: { label: "Email", placeholder: "john@example.com" },
    },
    subject: {
      label: "Message subject",
      options: [
        { label: "Rescue", value: "rescue" },
        { label: "Adoption", value: "adoption" },
        { label: "Volunteering", value: "volunteering" },
        { label: "Donations", value: "donations" },
        { label: "Others", value: "others" },
      ],
    },
    message: {
      label: "Message",
      placeholder: "Write your message here...",
    },
    submitLabel: "Send message",
  },
};

export function getContactFormContent(lang?: string) {
  const normalizedLang: ContactFormContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: contactFormContent[normalizedLang],
  } as const;
}

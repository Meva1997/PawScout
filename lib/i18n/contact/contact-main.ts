import type { HeroContentKey } from "../home/hero";

type ContactMethodIconKey = "phone" | "email" | "visit";
type MissionIconKey = "compassion" | "integrity" | "community";

type ContactMethod = {
  iconKey: ContactMethodIconKey;
  title: string;
  detail: string;
  info?: string;
};

type MissionCard = {
  iconKey: MissionIconKey;
  title: string;
  description: string;
};

type ContactMainContent = {
  heading: string;
  description: string;
  contactMethods: ContactMethod[];
  mission: {
    heading: string;
    intro: string;
    cards: MissionCard[];
  };
};

const contactMainContent: Record<HeroContentKey, ContactMainContent> = {
  "es-mx": {
    heading: "Contáctanos",
    description:
      "Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte y asegurarnos de que tengas la mejor experiencia posible con PawScout.",
    contactMethods: [
      {
        iconKey: "phone",
        title: "Teléfono",
        detail: "+1 (555) 123-4567",
        info: "Lunes a sábado: 9:00 AM - 6:00 PM",
      },
      {
        iconKey: "email",
        title: "Email",
        detail: "contacto@pawscout.com",
        info: "Mándanos tus consultas y te responderemos a la brevedad.",
      },
      {
        iconKey: "visit",
        title: "Visítanos",
        detail: "123 Calle Principal, Ciudad, País",
      },
    ],
    mission: {
      heading: "Nuestra misión",
      intro:
        "En PawScout, nuestra misión es conectar a los animales necesitados con personas que puedan brindarles un hogar amoroso y seguro. Trabajamos incansablemente para rescatar, rehabilitar y encontrar familias responsables para cada uno de nuestros amigos peludos.",
      cards: [
        {
          iconKey: "compassion",
          title: "Compasión",
          description:
            "Tratamos a cada animal con el amor y respeto que merece, asegurando su bienestar en cada paso.",
        },
        {
          iconKey: "integrity",
          title: "Integridad",
          description:
            "Operamos con transparencia y honestidad para que cada adopción sea ética y responsable.",
        },
        {
          iconKey: "community",
          title: "Comunidad",
          description:
            "Creemos en el poder de la comunidad para generar un cambio positivo a través del apoyo mutuo.",
        },
      ],
    },
  },
  en: {
    heading: "Contact us",
    description:
      "If you have questions, feedback, or need assistance, reach out anytime. We're here to help and make sure you have the best PawScout experience possible.",
    contactMethods: [
      {
        iconKey: "phone",
        title: "Phone",
        detail: "+1 (555) 123-4567",
        info: "Monday to Saturday: 9:00 AM - 6:00 PM",
      },
      {
        iconKey: "email",
        title: "Email",
        detail: "contact@pawscout.com",
        info: "Send us your questions and we'll reply shortly.",
      },
      {
        iconKey: "visit",
        title: "Visit us",
        detail: "123 Main Street, City, Country",
      },
    ],
    mission: {
      heading: "Our mission",
      intro:
        "At PawScout, we connect pets in need with people who can offer loving, safe homes. We work tirelessly to rescue, rehabilitate, and place every furry friend with a responsible family.",
      cards: [
        {
          iconKey: "compassion",
          title: "Compassion",
          description:
            "We treat every animal with love and respect, ensuring their well-being every step of the way.",
        },
        {
          iconKey: "integrity",
          title: "Integrity",
          description:
            "We operate transparently and ethically so every adoption is responsible and trustworthy.",
        },
        {
          iconKey: "community",
          title: "Community",
          description:
            "We believe in community power to create positive change through collaboration and mutual support.",
        },
      ],
    },
  },
};

export function getContactMainContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: contactMainContent[normalizedLang],
  } as const;
}

export type { ContactMethodIconKey, MissionIconKey };

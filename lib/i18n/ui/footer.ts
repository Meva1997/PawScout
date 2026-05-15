import type { HeroContentKey } from "../home/hero";

type FooterContentKey = HeroContentKey;

type LinkContact = {
  linkAdopt: string;
  linkHowAdopt: string;
  linkTerms: string;
  linkHelp: string;
  linkContact: string;
  linkVolunteer: string;
};

type CreatorContact = {
  email: string;
  phoneNumber: string;
  gitHub: string;
  linkedIn: string;
  portfolio: string;
};

type LegalContent = {
  reservedRights: string;
  legalAdvice: string;
  content: string;
  personalProject: string;
  webContent: string;
};

type FooterContent = {
  description: string;
  subtitleAdopt: string;
  subtitleHelp: string;
  subtitleContact: string;
  linkContact: LinkContact;
  creatorContact: CreatorContact;
  legal: LegalContent;
};

const footerContent: Record<FooterContentKey, FooterContent> = {
  "es-mx": {
    description:
      "Conectando mascotas con hogares amorosos. Organizacion sin fines de lucro dedicada a rescatar y encontrar hogares para mascotas necesitadas.",
    subtitleAdopt: "Adopta",
    subtitleHelp: "Apoyanos",
    subtitleContact: "Contacto",
    linkContact: {
      linkAdopt: "Busca mascotas",
      linkHowAdopt: "Como adoptar",
      linkTerms: "Términos y condiciones",
      linkHelp: "Donaciones",
      linkVolunteer: "Voluntariado",
      linkContact: "Contacto",
    },
    creatorContact: {
      email: "mevadev97@gmail.com",
      phoneNumber: "+1 (956) 502-7164",
      gitHub: "https://github.com/Meva1997",
      linkedIn: "https://www.linkedin.com/in/alex-fullstack-developer/",
      portfolio: "https://frontend-developer-next.vercel.app/",
    },
    legal: {
      reservedRights: "PawScout. Todos los derechosreservados.",
      legalAdvice: "Aviso legal",
      content:
        "Las imágenes mostradas en este sitio han sido generadas con tecnologías de inteligencia artificial con fines de demostración y prototipado. Algunos perfiles o descripciones pueden ser ficticios o simplificados y no representan animales reales disponibles para adopción.",
      personalProject:
        "PawScout es actualmente un proyecto personal y no una organización oficial. Para consultas o reportes, contacta a",
      webContent:
        "Si utilizas el contenido de este sitio, hazlo bajo tu propia responsabilidad. Estamos abiertos a corregir cualquier información incorrecta; por favor contáctanos.",
    },
  },
  en: {
    description:
      "Connecting pets with loving homes. A non-profit organization dedicated to rescuing and finding homes for pets in need.",
    subtitleAdopt: "Adopt",
    subtitleHelp: "Support Us",
    subtitleContact: "Contact",
    linkContact: {
      linkAdopt: "Find Pets",
      linkHowAdopt: "How to Adopt",
      linkTerms: "Terms and conditions",
      linkHelp: "Donations",
      linkVolunteer: "Volunteering",
      linkContact: "Contact",
    },
    creatorContact: {
      email: "mevadev97@gmail.com",
      phoneNumber: "+1 (956) 502-7164",
      gitHub: "https://github.com/Meva1997",
      linkedIn: "https://www.linkedin.com/in/alex-fullstack-developer/",
      portfolio: "https://frontend-developer-next.vercel.app/",
    },
    legal: {
      reservedRights: "PawScout. All rights reserved.",
      legalAdvice: "Legal Notice",
      content:
        "The images displayed on this site have been generated using artificial intelligence technologies for demonstration and prototyping purposes. Some profiles or descriptions may be fictional or simplified and do not represent real animals available for adoption.",
      personalProject:
        "PawScout is currently a personal project and not an official organization. For inquiries or reports, contact",
      webContent:
        "If you use the content of this site, do so at your own risk. We are open to correcting any incorrect information; please contact us.",
    },
  },
};

export function getFooterContent(lang?: string) {
  const normalizedLang: FooterContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: footerContent[normalizedLang],
  } as const;
}

import type { HeroContentKey } from "../home/hero";

type ContactFaqsContentKey = HeroContentKey;

type FaqsItem = {
  question: string;
  answer: string;
};

// Record works as a dictionary here to map language codes to FAQ items
const faqs: Record<ContactFaqsContentKey, FaqsItem[]> = {
  "es-mx": [
    {
      question: "¿Cómo puedo adoptar una mascota?",
      answer:
        "Completa el formulario de adopción desde la ficha de la mascota que te interese. Nuestro equipo revisará tu solicitud y se pondrá en contacto para los siguientes pasos.",
    },
    {
      question: "¿Aceptan donaciones en especie?",
      answer:
        "Sí. Además de aportes monetarios, recibimos alimento, medicamentos y artículos de higiene. Puedes coordinar la entrega a través del formulario de contacto.",
    },
    {
      question: "¿Puedo convertirme en voluntario?",
      answer:
        "Claro. Visita la sección de voluntariado y envía tu solicitud para participar en rescates, eventos o tareas de socialización.",
    },
    {
      question: "¿Dónde están ubicados?",
      answer:
        "Actualmente operamos en Ciudad, País. Las visitas se programan con cita para asegurar que cada animal reciba la atención adecuada.",
    },
  ],
  en: [
    {
      question: "How can I adopt a pet?",
      answer:
        "Fill out the adoption form from the profile of the pet you're interested in. Our team will review your application and get in touch with the next steps.",
    },
    {
      question: "Do you accept in-kind donations?",
      answer:
        "Yes. In addition to monetary contributions, we accept food, medications, and hygiene items. You can coordinate the delivery through the contact form.",
    },
    {
      question: "Can I become a volunteer?",
      answer:
        "Of course. Visit the volunteering section and submit your application to participate in rescues, events, or socialization tasks.",
    },
    {
      question: "Where are you located?",
      answer:
        "We currently operate in City, Country. Visits are scheduled by appointment to ensure that each animal receives proper care.",
    },
  ],
};

type ContactFaqsContent = {
  titleLabel: string;
  title: string;
  subtitle: string;
  faqs: FaqsItem[];
};

const contactFaqsContent: Record<ContactFaqsContentKey, ContactFaqsContent> = {
  "es-mx": {
    titleLabel: "Preguntas Frecuentes",
    title: "Todo lo que necesitas saber",
    subtitle: "Resuelve tus dudas sobre adopción, donaciones y voluntariado.",
    faqs: faqs["es-mx"],
  },
  en: {
    titleLabel: "Frequently Asked Questions",
    title: "Everything You Need to Know",
    subtitle: "Find answers about adoption, donations, and volunteering.",
    faqs: faqs["en"],
  },
};

export function getContactFaqsContent(lang?: string) {
  const normalizedLang: ContactFaqsContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: contactFaqsContent[normalizedLang],
  } as const;
}

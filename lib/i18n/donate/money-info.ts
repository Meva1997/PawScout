import type { HeroContentKey } from "../home/hero";

type MoneyInfoContentKey = HeroContentKey;

type AllocationCard = {
  emoji: string;
  percentage: string;
  title: string;
  description: string;
};

type SuccessStory = {
  label: string;
  heading: string;
  body: string;
  signature: string;
  imageAlt: string;
};

type MoneyInfoContent = {
  heading: string;
  intro: string;
  allocations: AllocationCard[];
  story: SuccessStory;
};

const moneyInfoContent: Record<MoneyInfoContentKey, MoneyInfoContent> = {
  "es-mx": {
    heading: "Que se hace con tu donación",
    intro:
      "Creemos en la transparencia y en el impacto positivo que cada contribución puede generar en la vida de las mascotas que ayudamos.",
    allocations: [
      {
        emoji: "🏥",
        percentage: "45%",
        title: "Atención Veterinaria",
        description:
          "Costos de vacunas, tratamientos médicos y cirugías necesarias para la salud y bienestar de las mascotas rescatadas.",
      },
      {
        emoji: "🍲",
        percentage: "30%",
        title: "Alimentación y Cuidado",
        description:
          "Alimentos nutritivos, refugio y cuidados diarios a las mascotas mientras esperan ser adoptadas.",
      },
      {
        emoji: "🏠",
        percentage: "25%",
        title: "Programas de Adopción",
        description:
          "Campañas de adopción y eventos que conectan a las mascotas con sus futuros hogares amorosos.",
      },
    ],
    story: {
      label: "Historia de éxito",
      heading: '"La historia de Luna"',
      body: "Luna llegó a nosotros en un estado crítico, desnutrida y asustada. Gracias a las generosas donaciones de personas como tú, pudimos brindarle la atención médica que necesitaba. Hoy, Luna es una perra feliz y saludable, lista para encontrar su hogar para siempre. Tu apoyo hace la diferencia en vidas como la de Luna.",
      signature: "- El equipo de PawScout",
      imageAlt: "Historia de éxito de Luna",
    },
  },
  en: {
    heading: "How your donation is used",
    intro:
      "We believe in transparency and in the positive impact every contribution can have on the lives of the pets we help.",
    allocations: [
      {
        emoji: "🏥",
        percentage: "45%",
        title: "Veterinary Care",
        description:
          "Costs for vaccines, medical treatments, and surgeries needed to keep rescued pets healthy.",
      },
      {
        emoji: "🍲",
        percentage: "30%",
        title: "Food & Care",
        description:
          "Nutritious meals, shelter, and daily care for pets while they wait to be adopted.",
      },
      {
        emoji: "🏠",
        percentage: "25%",
        title: "Adoption Programs",
        description:
          "Adoption campaigns and events that connect pets with their future loving homes.",
      },
    ],
    story: {
      label: "Success Story",
      heading: '"Luna\'s Story"',
      body: "Luna arrived in critical condition, malnourished and scared. Thanks to generous donors like you, we provided the medical care she needed. Today she is happy, healthy, and ready for a forever home. Your support changes lives like Luna's.",
      signature: "- The PawScout Team",
      imageAlt: "Luna's success story",
    },
  },
};

export function getMoneyInfoContent(lang?: string) {
  const normalizedLang: MoneyInfoContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: moneyInfoContent[normalizedLang],
  } as const;
}

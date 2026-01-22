import type { HeroContentKey } from "./hero.ts";

export type HowWorksDictionary = {
  icon?: string;
  title: string;
  description: string;
};

export const howWorksDictionary: Record<HeroContentKey, HowWorksDictionary> = {
  "es-mx": {
    title: "¿Cómo funciona?",
    description:
      "Nuestro proceso de adopción esta diseñado para ser simple, transparente y enfocado en encontrar el hogar perfecto para cada mascota.",
  },
  en: {
    title: "How it works",
    description:
      "Our adoption process is designed to be simple, transparent, and focused on finding the perfect home for every pet.",
  },
};

export const howWorksDictionarySteps: Record<
  HeroContentKey,
  HowWorksDictionary[]
> = {
  "es-mx": [
    {
      icon: "🔍",
      title: "Busca animales",
      description:
        "Explora perfiles detallados de mascotas disponibles para adopción. Filtra por raza, tamaño, edad y más.",
    },
    {
      icon: "📁",
      title: "Envía solicitud",
      description:
        "Completa un formulario para ayudarnos a entender tu estilo de vida y el ambiente en casa para asegurarnos de que eres el hogar adecuado para la mascota.",
    },
    {
      icon: "🤝",
      title: "Conoce a la mascota",
      description:
        "Agenda una visita para conocer a la mascota en persona. Pasa tiempo de calidad con ella para asegurarnos de que es el hogar adecuado para ambos.",
    },
  ],
  en: [
    {
      icon: "🔍",
      title: "Search Pets",
      description:
        "Browse detailed profiles of pets available for adoption. Filter by breed, size, age, and more.",
    },
    {
      icon: "📁",
      title: "Submit Application",
      description:
        "Fill out a form to help us understand your lifestyle and home environment to ensure you are the right home for the pet.",
    },
    {
      icon: "🤝",
      title: "Meet the Pet",
      description:
        "Schedule a visit to meet the pet in person. Spend quality time with them to ensure it's the right home for both of you.",
    },
  ],
};

export function getHowWorksContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: howWorksDictionary[normalizedLang],
    steps: howWorksDictionarySteps[normalizedLang],
  } as const;
}

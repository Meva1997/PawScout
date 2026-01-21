import type { HeroContentKey } from "./hero";

export type TestimonialsContentKey = HeroContentKey;

type TestimonialHeader = {
  title: string;
  subtitle: string;
};

type TestimonialsContent = {
  comment: string;
  name: string;
  adopted: string;
};

const testimonialHeaderContent: Record<
  TestimonialsContentKey,
  TestimonialHeader
> = {
  "es-mx": {
    title: "Testimonios de Adopción",
    subtitle:
      "Historias reales de personas que encontraron a sus compañeros peludos.",
  },
  en: {
    title: "Adoption Testimonials",
    subtitle: "Real stories from people who found their furry companions.",
  },
};

const testimonialsContent: Record<
  TestimonialsContentKey,
  TestimonialsContent[]
> = {
  "es-mx": [
    {
      comment:
        "Adoptar a Max fue la mejor decisión que he tomado. Gracias a esta plataforma, encontré a mi compañero perfecto.",
      name: "Laura G.",
      adopted: "Adoptado: Max, el Labrador",
    },
    {
      comment:
        "Nunca pensé que adoptar sería tan fácil y gratificante. Ahora tengo a Bella, y no podría estar más feliz.",
      name: "Carlos M.",
      adopted: "Adoptado: Bella, la Beagle",
    },
    {
      comment:
        "Gracias a esta plataforma, pude darle un hogar a Rocky. Es un miembro más de la familia ahora.",
      name: "Ana S.",
      adopted: "Adoptado: Rocky, el Bulldog",
    },
  ],

  en: [
    {
      comment:
        "Adopting Max was the best decision I've ever made. Thanks to this platform, I found my perfect companion.",
      name: "Laura G.",
      adopted: "Adopted: Max, the Labrador",
    },
    {
      comment:
        "I never thought adopting would be so easy and rewarding. Now I have Bella, and I couldn't be happier.",
      name: "Carlos M.",
      adopted: "Adopted: Bella, the Beagle",
    },
    {
      comment:
        "Thanks to this platform, I was able to give Rocky a home. He's now a member of the family.",
      name: "Ana S.",
      adopted: "Adopted: Rocky, the Bulldog",
    },
  ],
};

export function getTestimonialsContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    header: testimonialHeaderContent[normalizedLang],
    content: testimonialsContent[normalizedLang],
  } as const;
}

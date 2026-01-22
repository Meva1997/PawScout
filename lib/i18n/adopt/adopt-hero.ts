import type { HeroContentKey } from "../home/hero";
export type AdoptHeroContentKey = HeroContentKey;

type AdoptHero = {
  title: string;
  titleSpan: string;
  titleEnd: string;
  subtitle: string;
};

const adoptHeroContent: Record<AdoptHeroContentKey, AdoptHero> = {
  "es-mx": {
    title: "Encuentra tu",
    titleSpan: " mascota perfecta ",
    titleEnd: "para adoptar",
    subtitle:
      "Explora nuestra amplia selección de mascotas disponibles para adopción y encuentra el compañero perfecto para ti.",
  },
  en: {
    title: "Find Your",
    titleSpan: " Perfect Pet ",
    titleEnd: "to Adopt",
    subtitle:
      "Browse our wide selection of pets available for adoption and find the perfect companion for you.",
  },
};

export function getAdoptHeroContents(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptHeroContent[normalizedLang],
  } as const;
}

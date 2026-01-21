import type { HeroContentKey } from "./hero";

type NewArrivalsContentKey = HeroContentKey;

type NewArrivalsContent = {
  title: string;
  description: string;
  linkText: string;
};

const newArrivalsContent: Record<NewArrivalsContentKey, NewArrivalsContent> = {
  "es-mx": {
    title: "Esperando un Hogar",
    description:
      "Descubre las últimas mascotas que han llegado a PawScout y están buscando un hogar amoroso.",
    linkText: "Ver más →",
  },
  en: {
    title: "New Arrivals",
    description:
      "Discover the latest pets that have arrived at PawScout and are looking for a loving home.",
    linkText: "See More →",
  },
};

export function getNewArrivalsContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: newArrivalsContent[normalizedLang],
  } as const;
}

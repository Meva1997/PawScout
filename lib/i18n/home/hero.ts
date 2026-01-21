type HeroStat = {
  value: string;
  label: string;
};

export type HeroContentKey = "es-mx" | "en";

export type HeroContent = {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: HeroStat[];
  photoTitle: string;
  photoSubtitle: string;
};

export const heroContentDictionary: Record<HeroContentKey, HeroContent> = {
  "es-mx": {
    badge: "Mas de 50 criaturas añadidas esta semana",
    titlePrefix: "Encuentra a tu nuevo",
    titleHighlight: "mejor amigo",
    titleSuffix: "hoy",
    description:
      "En PawScout, conectamos mascotas adorables con hogares amorosos. Explora perfiles detallados, fotos encantadoras y encuentra la compañía perfecta para ti.",
    primaryCta: "Explorar Mascotas",
    secondaryCta: "Inicia Sesión",
    stats: [
      { value: "1,240", label: "Animales Adoptados" },
      { value: "350+", label: "Voluntarios" },
      { value: "12", label: "Refugios Asociados" },
      { value: "100%", label: "Animales Sanos" },
    ],
    photoTitle: "Conoce a Max",
    photoSubtitle: "Un amigo leal buscando un hogar",
  },
  en: {
    badge: "50+ pets added this week",
    titlePrefix: "Find your new",
    titleHighlight: "best friend",
    titleSuffix: "today",
    description:
      "At PawScout, we connect adorable pets with loving homes. Browse detailed profiles, charming photos, and meet your perfect companion.",
    primaryCta: "Explore Pets",
    secondaryCta: "Sign In",
    stats: [
      { value: "1,240", label: "Adopted Animals" },
      { value: "350+", label: "Volunteers" },
      { value: "12", label: "Partner Shelters" },
      { value: "100%", label: "Healthy Animals" },
    ],
    photoTitle: "Meet Max",
    photoSubtitle: "A loyal friend looking for home",
  },
};

export function getHeroContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: heroContentDictionary[normalizedLang],
  } as const;
}

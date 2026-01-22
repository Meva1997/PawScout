import type { HeroContentKey } from "../home/hero";

type HeroDonateContentKey = HeroContentKey;

type HeroDonateContent = {
  title: string;
  titleSpan: string;
  intro: string;
  secure: string;
  taxFree: string;
};

const heroDonateContent: Record<HeroDonateContentKey, HeroDonateContent> = {
  "es-mx": {
    title: " Se un heroe para una",
    titleSpan: " mascota sin hogar",
    intro:
      "Tu donación puede cambiar vidas. Desde un lugar acogedor, hasta cirugias que salvan vidas. Cada contribución va directo a quienes más lo necesitan para que cada mascota tenga una segunda oportunidad.",
    secure: "100% seguro",
    taxFree: "Deducible de impuestos",
  },
  en: {
    title: "Be a hero for a",
    titleSpan: " homeless pet",
    intro:
      "Your donation can change lives. From a cozy place to life-saving surgeries. Every contribution goes directly to those who need it most so that every pet has a second chance.",
    secure: "100% Secure",
    taxFree: "Tax Deductible",
  },
};

export function getHeroDonateContent(lang?: string) {
  const normalizedLang: HeroDonateContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: heroDonateContent[normalizedLang],
  } as const;
}

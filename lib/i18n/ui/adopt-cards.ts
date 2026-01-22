import type { HeroContentKey } from "../home/hero";

export type AdoptCardsContentKey = HeroContentKey;

type AdoptCardsHeader = {
  size: string;
  gender: string;
  button: string;
  age: string;
  sizeValues: Record<string, string>;
  genderValues: Record<string, string>;
};

const adoptCardsContent: Record<AdoptCardsContentKey, AdoptCardsHeader> = {
  "es-mx": {
    size: "Tamaño",
    gender: "Género:",
    button: "Conoce a: ",
    age: "Años",
    sizeValues: {
      Pequeño: "Pequeño",
      Mediano: "Mediano",
      Grande: "Grande",
    },
    genderValues: {
      Macho: "Macho",
      Hembra: "Hembra",
    },
  },
  en: {
    size: "Size",
    gender: "Gender:",
    button: "Meet: ",
    age: "Years",
    sizeValues: {
      Pequeño: "Small",
      Mediano: "Medium",
      Grande: "Large",
    },
    genderValues: {
      Macho: "Male",
      Hembra: "Female",
    },
  },
};

export function getAdoptCardsContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptCardsContent[normalizedLang],
  } as const;
}

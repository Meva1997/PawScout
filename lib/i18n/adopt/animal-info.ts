import type { HeroContentKey } from "../home/hero";

type AnimalInfoContentKey = HeroContentKey;

type AnimalInfoCards = {
  backLink: string;
  label: Record<string, string>;
  valueBoolean: Record<string, string>;
  infoCards: Array<{ label: string }>;
  about: string;
  gender: Record<string, string>;
  linkToAdopt: string;
  size: Record<string, string>;
};

const animalInfoContent: Record<AnimalInfoContentKey, AnimalInfoCards> = {
  "es-mx": {
    backLink: "Volver a la lista de adopción",
    label: {
      kids: "Bueno con niños",
      dogs: "Bueno con perros",
      houseTrained: "Entrenado en casa",
    },
    valueBoolean: {
      yes: "Sí",
      no: "No",
    },
    infoCards: [
      { label: "Edad" },
      { label: "Género" },
      { label: "Tamaño" },
      { label: "Raza" },
    ],
    gender: {
      genderMale: "Macho",
      genderFemale: "Hembra",
    },
    size: {
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
    },
    about: "Acerca de",
    linkToAdopt: "Aplica para adoptar",
  },
  en: {
    backLink: "Back to adoption list",
    label: {
      kids: "Good with kids",
      dogs: "Good with dogs",
      houseTrained: "House trained",
    },
    valueBoolean: {
      yes: "Yes",
      no: "No",
    },
    infoCards: [
      { label: "Age" },
      { label: "Gender" },
      { label: "Size" },
      { label: "Breed" },
    ],
    gender: {
      genderMale: "Male",
      genderFemale: "Female",
    },
    size: {
      small: "Small",
      medium: "Medium",
      large: "Large",
    },
    about: "About",
    linkToAdopt: "Apply to adopt",
  },
};

export function getAnimalInfo(lang?: string) {
  const normalizedLang: AnimalInfoContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: animalInfoContent[normalizedLang],
  } as const;
}

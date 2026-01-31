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

type AdoptFilterContent = {
  title: string;
  ageLabel: string;
  sizeLabel: string;
  genderLabel: string;
  statusLabel: string;
  clearFilters: string;
  showing: string;
  animals: string;
  sortBy: string;
  sortOptions: {
    name: string;
    age: string;
    size: string;
  };
  ageCategories: Record<string, string>;
  statusValues: Record<string, string>;
};

const adoptFilterContent: Record<AdoptCardsContentKey, AdoptFilterContent> = {
  "es-mx": {
    title: "Filtros",
    ageLabel: "Edad",
    sizeLabel: "Tamaño",
    genderLabel: "Género",
    statusLabel: "Estado",
    clearFilters: "Limpiar todos los filtros",
    showing: "Mostrando",
    animals: "animales",
    sortBy: "Ordenar por:",
    sortOptions: {
      name: "Nombre",
      age: "Edad",
      size: "Tamaño",
    },
    ageCategories: {
      Puppy: "Cachorro",
      Young: "Joven",
      Adult: "Adulto",
      Senior: "Mayor",
    },
    statusValues: {
      available: "Disponible",
      pending: "Pendiente",
      adopted: "Adoptado",
    },
  },
  en: {
    title: "Filters",
    ageLabel: "Age",
    sizeLabel: "Size",
    genderLabel: "Gender",
    statusLabel: "Status",
    clearFilters: "Clear all filters",
    showing: "Showing",
    animals: "animals",
    sortBy: "Sort by:",
    sortOptions: {
      name: "Name",
      age: "Age",
      size: "Size",
    },
    ageCategories: {
      Puppy: "Puppy",
      Young: "Young",
      Adult: "Adult",
      Senior: "Senior",
    },
    statusValues: {
      available: "Available",
      pending: "Pending",
      adopted: "Adopted",
    },
  },
};

const adoptCardsContent: Record<AdoptCardsContentKey, AdoptCardsHeader> = {
  "es-mx": {
    size: "Tamaño",
    gender: "Género:",
    button: "Conoce a: ",
    age: "Años",
    sizeValues: {
      Small: "Pequeño",
      Medium: "Mediano",
      Large: "Grande",
    },
    genderValues: {
      Male: "Macho",
      Female: "Hembra",
    },
  },
  en: {
    size: "Size",
    gender: "Gender:",
    button: "Meet: ",
    age: "Years",
    sizeValues: {
      Small: "Small",
      Medium: "Medium",
      Large: "Large",
    },
    genderValues: {
      Male: "Male",
      Female: "Female",
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

export function getAdoptFilterContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptFilterContent[normalizedLang],
  } as const;
}

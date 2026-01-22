import type { HeroContentKey } from "../home/hero";

type HeaderFormVolunteerContentKey = HeroContentKey;

type HeaderFormVolunteerContent = {
  label: string;
  heading: string;
  headingSpan: string;
  headingFinal: string;
  intro: string;
};

const headerFormVolunteerContent: Record<
  HeaderFormVolunteerContentKey,
  HeaderFormVolunteerContent
> = {
  "es-mx": {
    label: "Formulario de Voluntariado",
    heading: "Conviertete en",
    headingSpan: "héroe",
    headingFinal: "para los animales",
    intro:
      "Unete a nuestro equipo de voluntarios y ayuda a marcar la diferencia en la vida de los animales necesitados. Completa el formulario para comenzar tu viaje como voluntario.",
  },
  en: {
    label: "Volunteer Form",
    heading: "Become a",
    headingSpan: "hero",
    headingFinal: "for the animals",
    intro:
      "Join our team of volunteers and help make a difference in the lives of animals in need. Fill out the form to start your journey as a volunteer.",
  },
};

export function getHeaderFormVolunteerContent(lang?: string) {
  const normalizedLang: HeaderFormVolunteerContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: headerFormVolunteerContent[normalizedLang],
  } as const;
}

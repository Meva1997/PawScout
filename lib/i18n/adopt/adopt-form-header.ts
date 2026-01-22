import type { HeroContentKey } from "../home/hero";

type AdoptFormHeaderContentKey = HeroContentKey;

type AdoptFormHHeaderContent = {
  formTitle: string;
  formDescription: string;
  applyingFor: string;
  noImage: string;
  attributes: {
    kids: string;
    dogs: string;
    houseTrained: string;
  };
  yesNo: {
    yes: string;
    no: string;
  };
  gender: {
    genderMale: string;
    genderFemale: string;
  };
};

const adoptFormContent: Record<
  AdoptFormHeaderContentKey,
  AdoptFormHHeaderContent
> = {
  "es-mx": {
    formTitle: "Formulario de Adopción",
    formDescription:
      "Completa el siguiente formulario para iniciar el proceso de adopción. Nos pondremos en contacto contigo pronto.",
    applyingFor: "Aplicando para:",
    noImage: "Sin imagen",
    attributes: {
      kids: "Bueno con niños",
      dogs: "Bueno con perros",
      houseTrained: "Entrenado en casa",
    },
    yesNo: {
      yes: "Sí",
      no: "No",
    },
    gender: {
      genderMale: "Macho",
      genderFemale: "Hembra",
    },
  },
  en: {
    formTitle: "Adoption Form",
    formDescription:
      "Fill out the form below to start the adoption process. We will contact you soon.",
    applyingFor: "Applying for:",
    noImage: "No image",
    attributes: {
      kids: "Good with kids",
      dogs: "Good with dogs",
      houseTrained: "House trained",
    },
    yesNo: {
      yes: "Yes",
      no: "No",
    },
    gender: {
      genderMale: "Male",
      genderFemale: "Female",
    },
  },
};

export function getAdoptFormHeaderContent(lang?: string) {
  const normalizedLang: AdoptFormHeaderContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptFormContent[normalizedLang],
  } as const;
}

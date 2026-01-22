import type { HeroContentKey } from "../home/hero";

type VolunteerFormSuccessContentKey = HeroContentKey;

type VolunteerFormSuccessContent = {
  thanksHeading: string;
  thanksMessage: string;
  returnLink: string;
};

const volunteerFormSuccessContent: Record<
  VolunteerFormSuccessContentKey,
  VolunteerFormSuccessContent
> = {
  "es-mx": {
    thanksHeading: "¡Gracias por unirte como voluntario!",
    thanksMessage:
      "Su solicitud ha sido enviada con éxito. Gracias por ofrecer su tiempo para ayudar a nuestras mascotas.",
    returnLink: "Página principal",
  },
  en: {
    thanksHeading: "Thank you for joining as a volunteer!",
    thanksMessage:
      "Your application has been successfully submitted. Thank you for offering your time to help our pets.",
    returnLink: "Home Page",
  },
};

export function getVolunteerFormSuccessContent(lang?: string) {
  const normalizedLang: VolunteerFormSuccessContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: volunteerFormSuccessContent[normalizedLang],
  } as const;
}

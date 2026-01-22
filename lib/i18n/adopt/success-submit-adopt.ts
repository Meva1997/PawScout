import type { HeroContentKey } from "../home/hero";

type AdoptSuccessContentKey = HeroContentKey;

type AdoptSuccessContent = {
  title: string;
  intro: string;
  body: string[];
  thanks: string;
  cta: string;
};

const adoptSuccessContent: Record<AdoptSuccessContentKey, AdoptSuccessContent> =
  {
    "es-mx": {
      title: "¡Formulario de adopción enviado con éxito!",
      intro:
        "Gracias por tu interés en adoptar una mascota a través de PawScout.",
      body: [
        "Hemos recibido tu formulario de adopción y nuestro equipo lo está revisando. Nos pondremos en contacto contigo pronto para los siguientes pasos del proceso de adopción.",
        "Mientras tanto, si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de nuestro correo electrónico o número de teléfono.",
      ],
      thanks:
        "¡Gracias por ayudar a brindar un hogar amoroso a una mascota necesitada!",
      cta: "Regresar a la página de adopción",
    },
    en: {
      title: "Adoption Form Submitted Successfully!",
      intro: "Thank you for your interest in adopting a pet through PawScout.",
      body: [
        "We have received your adoption form and our team is reviewing it. We will contact you soon with the next steps in the adoption process.",
        "In the meantime, if you have any questions or need more information, please feel free to reach out via email or phone.",
      ],
      thanks: "Thank you for helping provide a loving home to a pet in need!",
      cta: "Return to adoption page",
    },
  };

export function getAdoptSuccessContent(lang?: string) {
  const normalizedLang: AdoptSuccessContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptSuccessContent[normalizedLang],
  } as const;
}

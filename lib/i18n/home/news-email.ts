import type { HeroContentKey } from "./hero";

export type NewsEmailContentKey = HeroContentKey;

type NewsEmailHeader = {
  title: string;
  subtitle: string;
  buttonText: string;
  placeholderText: string;
};

const newsEmailContent: Record<NewsEmailContentKey, NewsEmailHeader> = {
  "es-mx": {
    title: "Suscríbete a nuestro boletín informativo",
    subtitle:
      "Recibe las últimas noticias y actualizaciones sobre adopciones de mascotas directamente en tu correo electrónico.",
    buttonText: "Suscribirse",
    placeholderText: "Ingresa tu correo electrónico",
  },
  en: {
    title: "Subscribe to our Newsletter",
    subtitle:
      "Get the latest news and updates on pet adoptions delivered straight to your inbox.",
    buttonText: "Subscribe",
    placeholderText: "Enter your email address",
  },
};

export function getNewsEmailContent(lang?: string) {
  const normalizedLang: HeroContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: newsEmailContent[normalizedLang],
  } as const;
}

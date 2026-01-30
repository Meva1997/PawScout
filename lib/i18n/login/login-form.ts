import type { HeroContentKey } from "../home/hero";

type LoginFormContentKey = HeroContentKey;

type LoginFormContent = {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
  submittingLabel?: string;
};

const loginFormContent: Record<LoginFormContentKey, LoginFormContent> = {
  "es-mx": {
    emailLabel: "Correo electrónico",
    emailPlaceholder: "email@email.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "contraseña",
    submitLabel: "Iniciar sesión",
    submittingLabel: "Iniciando...",
  },
  en: {
    emailLabel: "Email",
    emailPlaceholder: "email@email.com",
    passwordLabel: "Password",
    passwordPlaceholder: "password",
    submitLabel: "Log In",
    submittingLabel: "Logging in...",
  },
};

export function getLoginFormContent(lang?: string) {
  const normalizedLang: LoginFormContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: loginFormContent[normalizedLang],
  } as const;
}

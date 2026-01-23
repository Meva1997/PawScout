import type { HeroContentKey } from "../home/hero";

type LoginHeaderContentKey = HeroContentKey;

type LoginHeaderContent = {
  title: string;
  subtitle: string;
  account: string;
  forgotPassword: string;
};

const loginHeaderContent: Record<LoginHeaderContentKey, LoginHeaderContent> = {
  "es-mx": {
    title: "Bienvenido",
    subtitle: "Por favor inicia sesión para continuar",
    account: "¿No tienes una cuenta? Regístrate",
    forgotPassword: "¿Olvidaste tu contraseña?",
  },
  en: {
    title: "Welcome",
    subtitle: "Please log in to continue",
    account: "Don't have an account? Sign up",
    forgotPassword: "Forgot your password?",
  },
};

export function getLoginHeaderContent(lang?: string) {
  const normalizedLang: LoginHeaderContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: loginHeaderContent[normalizedLang],
  } as const;
}

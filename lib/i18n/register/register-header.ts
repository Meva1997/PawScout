import type { HeroContentKey } from "../home/hero";

type RegisterHeaderContentKey = HeroContentKey;

type RegisterHeaderContent = {
  title: string;
  subtitle: string;
  account: string;
  forgotPassword: string;
};

const registerHeaderContent: Record<
  RegisterHeaderContentKey,
  RegisterHeaderContent
> = {
  "es-mx": {
    title: "Crea tu cuenta",
    subtitle: "Regístrate para comenzar tu aventura con PawScout",
    account: "¿Ya tienes una cuenta? Inicia sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
  },
  en: {
    title: "Create your account",
    subtitle: "Sign up to start your adventure with PawScout",
    account: "Already have an account? Log in",
    forgotPassword: "Forgot your password?",
  },
};

export function getRegisterHeaderContent(lang?: string) {
  const normalizedLang: RegisterHeaderContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: registerHeaderContent[normalizedLang],
  } as const;
}

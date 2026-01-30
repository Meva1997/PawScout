import type { HeroContentKey } from "../home/hero";

type RegisterFormContentKey = HeroContentKey;

type RegisterFormContent = {
  name: string;
  namePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  submitLabel: string;
  submittingLabel?: string;
};

const registerFormContent: Record<RegisterFormContentKey, RegisterFormContent> =
  {
    "es-mx": {
      name: "Nombre",
      namePlaceholder: "Juan",
      lastName: "Apellido",
      lastNamePlaceholder: "Pérez",
      email: "Correo electrónico",
      emailPlaceholder: "juan.perez@example.com",
      password: "Contraseña",
      passwordPlaceholder: "contraseña",
      confirmPassword: "Confirmar contraseña",
      confirmPasswordPlaceholder: "contraseña",
      submitLabel: "Registrarse",
      submittingLabel: "Registrando...",
    },
    en: {
      name: "First Name",
      namePlaceholder: "John",
      lastName: "Last Name",
      lastNamePlaceholder: "Doe",
      email: "Email",
      emailPlaceholder: "john.doe@example.com",
      password: "Password",
      passwordPlaceholder: "password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "password",
      submitLabel: "Register",
      submittingLabel: "Registering...",
    },
  };

export function getRegisterFormContent(lang?: string) {
  const normalizedLang: RegisterFormContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: registerFormContent[normalizedLang],
  } as const;
}

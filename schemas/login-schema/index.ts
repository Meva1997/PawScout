import { z } from "zod";

export const getLoginSchema = (lang: string = "en") => {
  const messages = {
    email: {
      invalid:
        lang === "es-mx"
          ? "Correo electrónico inválido"
          : "Invalid email address",
    },
    password: {
      minLength:
        lang === "es-mx"
          ? "La contraseña debe tener al menos 8 caracteres"
          : "Password must be at least 8 characters",
    },
  };

  return z.object({
    email: z.string().email(messages.email.invalid),
    password: z.string().min(8, messages.password.minLength),
  });
};

// Keep the old export for backward compatibility
export const loginSchema = getLoginSchema("es-mx");

export const sessionSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  lastName: z.string(),
  isAdmin: z.boolean(),
});

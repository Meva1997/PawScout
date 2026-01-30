import { z } from "zod";

export const getRegisterSchema = (lang: string = "en") => {
  const messages = {
    firstName: {
      required:
        lang === "es-mx"
          ? "El nombre es obligatorio"
          : "First name is required",
    },
    lastName: {
      required:
        lang === "es-mx"
          ? "El apellido es obligatorio"
          : "Last name is required",
    },
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
    confirmPassword: {
      noMatch:
        lang === "es-mx"
          ? "Las contraseñas no coinciden"
          : "Passwords do not match",
    },
  };

  return z
    .object({
      firstName: z.string().min(1, messages.firstName.required),
      lastName: z.string().min(1, messages.lastName.required),
      email: z.string().email(messages.email.invalid),
      password: z.string().min(8, messages.password.minLength),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.confirmPassword.noMatch,
      path: ["confirmPassword"],
    });
};

// Keep the old export for backward compatibility
export const registerSchema = getRegisterSchema("es-mx");

export const successSchema = z.object({
  success: z.string(),
});

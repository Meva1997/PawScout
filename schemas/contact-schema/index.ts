import { z } from "zod";

export const getContactSchema = (lang: string = "en") => {
  const messages = {
    name: {
      required:
        lang === "es-mx" ? "El nombre es obligatorio" : "Name is required",
      minLength:
        lang === "es-mx"
          ? "El nombre debe tener al menos 2 caracteres"
          : "Name must be at least 2 characters",
    },
    lastName: {
      required:
        lang === "es-mx"
          ? "El apellido es obligatorio"
          : "Last name is required",
      minLength:
        lang === "es-mx"
          ? "El apellido debe tener al menos 2 caracteres"
          : "Last name must be at least 2 characters",
    },
    email: {
      invalid:
        lang === "es-mx"
          ? "Correo electrónico inválido"
          : "Invalid email address",
    },
    subject: {
      required:
        lang === "es-mx" ? "El asunto es obligatorio" : "Subject is required",
    },
    message: {
      required:
        lang === "es-mx" ? "El mensaje es obligatorio" : "Message is required",
      minLength:
        lang === "es-mx"
          ? "El mensaje debe tener al menos 10 caracteres"
          : "Message must be at least 10 characters",
    },
  };

  return z.object({
    name: z.string().min(2, messages.name.minLength),
    lastName: z.string().min(2, messages.lastName.minLength),
    email: z.email(messages.email.invalid),
    subject: z.string().min(1, messages.subject.required),
    message: z.string().min(10, messages.message.minLength),
    date: z.string(),
  });
};

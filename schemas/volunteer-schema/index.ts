import { z } from "zod";

export const getVolunteerSchema = (lang: string = "en") => {
  const messages = {
    name: {
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
    phone: {
      invalid:
        lang === "es-mx"
          ? "Número de teléfono inválido"
          : "Invalid phone number",
    },
    availability: {
      required:
        lang === "es-mx"
          ? "Debe seleccionar una disponibilidad"
          : "Availability selection is required",
    },
    availableDays: {
      required:
        lang === "es-mx"
          ? "Debe seleccionar al menos un día disponible"
          : "At least one available day is required",
    },
    areasOfInterest: {
      required:
        lang === "es-mx"
          ? "Debe seleccionar al menos un área de interés"
          : "At least one area of interest is required",
    },
    whyVolunteer: {
      required:
        lang === "es-mx"
          ? "Por favor explique por qué desea ser voluntario"
          : "Please explain why you want to volunteer",
      minLength:
        lang === "es-mx"
          ? "La respuesta debe tener al menos 10 caracteres"
          : "Response must be at least 10 characters",
    },
    specialSkills: {
      required:
        lang === "es-mx"
          ? "Por favor describa sus habilidades especiales"
          : "Please describe your special skills",
    },
    emergencyContactName: {
      required:
        lang === "es-mx"
          ? "El nombre del contacto de emergencia es obligatorio"
          : "Emergency contact name is required",
    },
    emergencyContactPhone: {
      invalid:
        lang === "es-mx"
          ? "Número de teléfono de emergencia inválido"
          : "Invalid emergency phone number",
    },
    privacyAgreement: {
      required:
        lang === "es-mx"
          ? "Debe aceptar los términos de privacidad"
          : "You must agree to the privacy terms",
    },
  };

  return z.object({
    name: z.string().min(1, messages.name.required),
    lastName: z.string().min(1, messages.lastName.required),
    email: z.string().email(messages.email.invalid),
    phone: z
      .string()
      .regex(
        /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$|^(\+?52[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/,
        messages.phone.invalid,
      ),
    availability: z.array(z.string()).min(1, messages.availability.required),
    availableDays: z.array(z.string()).min(1, messages.availableDays.required),
    areasOfInterest: z
      .array(z.string())
      .min(1, messages.areasOfInterest.required),
    whyVolunteer: z
      .string()
      .min(10, messages.whyVolunteer.minLength)
      .min(1, messages.whyVolunteer.required),
    specialSkills: z.string(),
    emergencyContactName: z
      .string()
      .min(1, messages.emergencyContactName.required),
    emergencyContactPhone: z
      .string()
      .regex(
        /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$|^(\+?52[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/,
        messages.emergencyContactPhone.invalid,
      ),
    privacyAgreement: z.boolean().refine((val) => val === true, {
      message: messages.privacyAgreement.required,
    }),
    date: z.string(),
  });
};

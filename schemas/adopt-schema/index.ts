import { z } from "zod";

export const getAdoptSchema = (lang: string = "en") => {
  const messages = {
    applicantName: {
      required:
        lang === "es-mx"
          ? "El nombre completo es obligatorio"
          : "Full name is required",
    },
    applicantLastName: {
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
    address: {
      required:
        lang === "es-mx"
          ? "La dirección es obligatoria"
          : "Address is required",
    },
    city: {
      required:
        lang === "es-mx" ? "La ciudad es obligatoria" : "City is required",
    },
    state: {
      required:
        lang === "es-mx" ? "El estado es obligatorio" : "State is required",
    },
    zipCode: {
      required:
        lang === "es-mx"
          ? "El código postal es obligatorio"
          : "Zip code is required",
    },
    birthdate: {
      required:
        lang === "es-mx"
          ? "La fecha de nacimiento es obligatoria"
          : "Birthdate is required",
    },
    occupation: {
      required:
        lang === "es-mx"
          ? "La ocupación es obligatoria"
          : "Occupation is required",
    },
    reasonForAdoption: {
      required:
        lang === "es-mx"
          ? "La razón para la adopción es obligatoria"
          : "Reason for adoption is required",
    },
    experienceWithPets: {
      required:
        lang === "es-mx"
          ? "La experiencia con mascotas es obligatoria"
          : "Experience with pets is required",
    },
    homeType: {
      required:
        lang === "es-mx"
          ? "El tipo de vivienda es obligatorio"
          : "Home type is required",
    },
    whoLivesInHouse: {
      required:
        lang === "es-mx"
          ? "Quién vive en la casa es obligatorio"
          : "Who lives in the house is required",
    },
    agreeToTerms: {
      required:
        lang === "es-mx"
          ? "Debe aceptar los términos y condiciones"
          : "You must agree to the terms and conditions",
    },
  };

  return z.object({
    animalId: z.number(),
    applicantName: z.string().min(1, messages.applicantName.required),
    applicantLastName: z.string().min(1, messages.applicantLastName.required),
    email: z.email(messages.email.invalid),
    phone: z
      .string()
      .regex(
        /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$|^(\+?52[-.\s]?)?(\(?\d{2,3}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/,
        messages.phone.invalid,
      ),
    address: z.string().min(1, messages.address.required),
    city: z.string().min(1, messages.city.required),
    state: z.string().min(1, messages.state.required),
    zipCode: z.string().min(1, messages.zipCode.required),
    birthdate: z.string().min(1, messages.birthdate.required),
    occupation: z.string().min(1, messages.occupation.required),
    reasonForAdoption: z.string().min(1, messages.reasonForAdoption.required),
    experienceWithPets: z.string().min(1, messages.experienceWithPets.required),
    homeType: z.string().min(1, messages.homeType.required),
    whoLivesInHouse: z.string().min(1, messages.whoLivesInHouse.required),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: messages.agreeToTerms.required,
    }),
    date: z.string(),
  });
};

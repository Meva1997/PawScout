import type { HeroContentKey } from "../home/hero";

type VolunteerFormContentKey = HeroContentKey;

type TextInputCopy = {
  label: string;
  placeholder: string;
};

type VolunteerFormContent = {
  personal: {
    heading: string;
    description: string;
    fields: {
      firstName: TextInputCopy;
      lastName: TextInputCopy;
      email: TextInputCopy;
      phone: TextInputCopy;
    };
  };
  availability: {
    heading: string;
    daysLabel: string;
    days: { label: string; value: string }[];
    preferredLabel: string;
    preferredOptions: { label: string; value: string }[];
  };
  interests: {
    heading: string;
    intro: string;
    items: { label: string; value: string }[];
  };
  experience: {
    heading: string;
    questions: {
      motivation: string;
      skills: string;
    };
    placeholders: {
      motivation: string;
      skills: string;
    };
  };
  emergency: {
    heading: string;
    nameLabel: string;
    phoneLabel: string;
    placeholders: {
      name: string;
      phone: string;
    };
  };
  terms: {
    text: string;
    highlight: string;
  };
  submitLabel: string;
  reviewText: string;
};

const volunteerFormContent: Record<
  VolunteerFormContentKey,
  VolunteerFormContent
> = {
  "es-mx": {
    personal: {
      heading: "Información Personal",
      description:
        "Comparte tus datos de contacto para que podamos comunicarnos contigo y continuar el proceso de voluntariado.",
      fields: {
        firstName: { label: "Nombre", placeholder: "Juan" },
        lastName: { label: "Apellido", placeholder: "Pérez" },
        email: { label: "Correo Electrónico", placeholder: "email@email.com" },
        phone: { label: "Teléfono", placeholder: "123-456-7890" },
      },
    },
    availability: {
      heading: "Disponibilidad",
      daysLabel: "Días disponibles",
      days: [
        { label: "Lunes", value: "monday" },
        { label: "Martes", value: "tuesday" },
        { label: "Miércoles", value: "wednesday" },
        { label: "Jueves", value: "thursday" },
        { label: "Viernes", value: "friday" },
        { label: "Sábado", value: "saturday" },
        { label: "Domingo", value: "sunday" },
      ],
      preferredLabel: "Horario preferido",
      preferredOptions: [
        { label: "Mañana", value: "morning" },
        { label: "Tarde", value: "afternoon" },
        { label: "Noche", value: "evening" },
      ],
    },
    interests: {
      heading: "Áreas de interés",
      intro: "Selecciona las áreas donde te gustaría apoyar.",
      items: [
        { label: "Cuidado de animales", value: "animalCare" },
        { label: "Planificación de eventos", value: "eventPlanning" },
        { label: "Recaudación de fondos", value: "fundraising" },
        { label: "Apoyo administrativo", value: "administrativeSupport" },
        { label: "Alcance comunitario", value: "outreach" },
        { label: "Otro", value: "other" },
      ],
    },
    experience: {
      heading: "Experiencia y habilidades",
      questions: {
        motivation: "¿Por qué quieres ser voluntario?",
        skills: "¿Habilidades especiales? (Ninguna? Escribe 'Ninguna')",
      },
      placeholders: {
        motivation: "Escribe aquí...",
        skills: "Escribe aquí...",
      },
    },
    emergency: {
      heading: "Contacto de emergencia",
      nameLabel: "Nombre de contacto",
      phoneLabel: "Teléfono de contacto",
      placeholders: {
        name: "Nombre completo",
        phone: "123-456-7890",
      },
    },
    terms: {
      text: "Confirmo que soy mayor de 18 años de edad y acepto los",
      highlight: "términos y condiciones y la política de privacidad",
    },
    submitLabel: "Enviar formulario",
    reviewText:
      "Revisaremos tu solicitud y nos pondremos en contacto contigo de 3-5 días hábiles.",
  },
  en: {
    personal: {
      heading: "Personal Information",
      description:
        "Share your contact details so we can follow up and continue the volunteer process.",
      fields: {
        firstName: { label: "First Name", placeholder: "John" },
        lastName: { label: "Last Name", placeholder: "Doe" },
        email: { label: "Email", placeholder: "email@email.com" },
        phone: { label: "Phone", placeholder: "123-456-7890" },
      },
    },
    availability: {
      heading: "Availability",
      daysLabel: "Available days",
      days: [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
      ],
      preferredLabel: "Preferred time",
      preferredOptions: [
        { label: "Morning", value: "morning" },
        { label: "Afternoon", value: "afternoon" },
        { label: "Evening", value: "evening" },
      ],
    },
    interests: {
      heading: "Areas of interest",
      intro: "Select the areas where you'd like to help.",
      items: [
        { label: "Animal care", value: "animalCare" },
        { label: "Event planning", value: "eventPlanning" },
        { label: "Fundraising", value: "fundraising" },
        { label: "Administrative support", value: "administrativeSupport" },
        { label: "Community outreach", value: "outreach" },
        { label: "Other", value: "other" },
      ],
    },
    experience: {
      heading: "Experience & skills",
      questions: {
        motivation: "Why do you want to volunteer?",
        skills: "Special skills? (None? Write 'None')",
      },
      placeholders: {
        motivation: "Write here...",
        skills: "Write here...",
      },
    },
    emergency: {
      heading: "Emergency contact",
      nameLabel: "Contact name",
      phoneLabel: "Contact phone",
      placeholders: {
        name: "Full name",
        phone: "123-456-7890",
      },
    },
    terms: {
      text: "I confirm I am over 18 years old and agree to the",
      highlight: "terms, conditions, and privacy policy",
    },
    submitLabel: "Submit form",
    reviewText:
      "We will review your application and get back to you within 3-5 business days.",
  },
};

export function getVolunteerFormContent(lang?: string) {
  const normalizedLang: VolunteerFormContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: volunteerFormContent[normalizedLang],
  } as const;
}

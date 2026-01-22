import type { HeroContentKey } from "../home/hero";

type VolunteerRoleContentKey = HeroContentKey;

type VolunteerRole = {
  iconKey:
    | "animalCare"
    | "events"
    | "social"
    | "admin"
    | "transport"
    | "training";
  title: string;
  description: string;
};

type VolunteerRoleContent = {
  heading: string;
  intro: string;
  roles: VolunteerRole[];
};

const volunteerRoleContent: Record<
  VolunteerRoleContentKey,
  VolunteerRoleContent
> = {
  "es-mx": {
    heading: "Roles disponibles",
    intro:
      "Tenemos una variedad de roles para voluntarios, desde cuidado de animales hasta apoyo en eventos y administración. ¡Encuentra el rol perfecto para ti!",
    roles: [
      {
        iconKey: "animalCare",
        title: "Cuidador de Animales",
        description:
          "Proporciona cuidado diario, alimentación y ejercicio a las mascotas bajo nuestro cuidado.",
      },
      {
        iconKey: "events",
        title: "Asistente de Eventos",
        description:
          "Ayuda en la organización y ejecución de eventos de adopción y recaudación de fondos.",
      },
      {
        iconKey: "social",
        title: "Coordinador de Redes Sociales",
        description:
          "Gestiona nuestras plataformas de redes sociales para aumentar la visibilidad y promover las adopciones.",
      },
      {
        iconKey: "admin",
        title: "Asistente Administrativo",
        description:
          "Apoya con tareas administrativas como gestión de bases de datos y comunicación con adoptantes potenciales.",
      },
      {
        iconKey: "transport",
        title: "Voluntario de Transporte",
        description:
          "Ayuda a transportar mascotas a citas veterinarias, eventos de adopción y nuevos hogares.",
      },
      {
        iconKey: "training",
        title: "Entrenador de Mascotas",
        description:
          "Proporciona entrenamiento básico y socialización para mejorar el comportamiento de las mascotas.",
      },
    ],
  },
  en: {
    heading: "Available roles",
    intro:
      "We have a variety of volunteer opportunities, from animal care to event support and administration. Find the perfect role for you!",
    roles: [
      {
        iconKey: "animalCare",
        title: "Animal Caretaker",
        description:
          "Provide daily care, feeding, and exercise to pets under our supervision.",
      },
      {
        iconKey: "events",
        title: "Event Assistant",
        description: "Help organize and run adoption and fundraising events.",
      },
      {
        iconKey: "social",
        title: "Social Media Coordinator",
        description:
          "Manage our social platforms to increase visibility and promote adoptions.",
      },
      {
        iconKey: "admin",
        title: "Administrative Assistant",
        description:
          "Support with tasks like database management and communication with potential adopters.",
      },
      {
        iconKey: "transport",
        title: "Transport Volunteer",
        description:
          "Help transport pets to vet appointments, adoption events, and new homes.",
      },
      {
        iconKey: "training",
        title: "Pet Trainer",
        description:
          "Provide basic training and socialization to improve pet behavior.",
      },
    ],
  },
};

export function getVolunteerRoleContent(lang?: string) {
  const normalizedLang: VolunteerRoleContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: volunteerRoleContent[normalizedLang],
  } as const;
}

export type { VolunteerRole };

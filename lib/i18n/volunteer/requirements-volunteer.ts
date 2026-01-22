import type { HeroContentKey } from "../home/hero";

type VolunteerRequirementsContentKey = HeroContentKey;

type VolunteerTestimonial = {
  name: string;
  comment: string;
  image: string;
  imageAlt: string;
};

type VolunteerRequirementsContent = {
  heading: string;
  intro: string;
  requirements: string[];
  imageAlt: string;
  testimonials: VolunteerTestimonial[];
  cta: {
    heading: string;
    subheading: string;
    button: string;
  };
};

const volunteerRequirementsContent: Record<
  VolunteerRequirementsContentKey,
  VolunteerRequirementsContent
> = {
  "es-mx": {
    heading: "Requisitos para ser voluntario",
    intro:
      "Para ser voluntario en nuestra organización, es importante cumplir con ciertos requisitos que aseguren una experiencia positiva tanto para ti como para las personas y mascotas que ayudamos. A continuación, se detallan los más importantes:",
    requirements: [
      "Ser mayor de 18 años.",
      "Comprometerse a un horario regular de voluntariado.",
      "Tener pasión por el bienestar animal.",
      "Ser responsable y confiable.",
      "Capacidad para trabajar en equipo.",
      "Disposición para aprender y seguir instrucciones.",
    ],
    imageAlt: "Voluntarios cuidando mascotas",
    testimonials: [
      {
        name: "María López",
        comment:
          "Ser voluntaria en esta organización ha sido una experiencia increíble. He aprendido mucho y he conocido a personas maravillosas.",
        image: "/volunteer1.jpg",
        imageAlt: "Retrato de María López",
      },
      {
        name: "Carlos Sánchez",
        comment:
          "Ayudar a los animales necesitados me llena de satisfacción. Recomiendo a todos que se unan como voluntarios.",
        image: "/volunteer2.jpg",
        imageAlt: "Retrato de Carlos Sánchez",
      },
      {
        name: "Ana Gómez",
        comment:
          "El equipo es muy acogedor y siempre están dispuestos a apoyar. Ser voluntaria aquí ha sido una de las mejores decisiones de mi vida.",
        image: "/volunteer3.jpg",
        imageAlt: "Retrato de Ana Gómez",
      },
    ],
    cta: {
      heading: "¡Únete a nuestro equipo de voluntarios!",
      subheading: "La aplicación toma menos de 10 minutos. ¡Comienza ahora!",
      button: "Aplicar para ser voluntario",
    },
  },
  en: {
    heading: "Volunteer requirements",
    intro:
      "To volunteer with us, please make sure you meet a few requirements so the experience is positive for both you and the communities we support. Here are the essentials:",
    requirements: [
      "Be at least 18 years old.",
      "Commit to a regular volunteer schedule.",
      "Have a passion for animal welfare.",
      "Be responsible and reliable.",
      "Ability to work as part of a team.",
      "Willingness to learn and follow instructions.",
    ],
    imageAlt: "Volunteers helping pets",
    testimonials: [
      {
        name: "Maria Lopez",
        comment:
          "Volunteering here has been incredible. I've learned so much and met amazing people.",
        image: "/volunteer1.jpg",
        imageAlt: "Portrait of Maria Lopez",
      },
      {
        name: "Carlos Sanchez",
        comment:
          "Helping animals in need fills me with joy. I recommend everyone join as a volunteer.",
        image: "/volunteer2.jpg",
        imageAlt: "Portrait of Carlos Sanchez",
      },
      {
        name: "Ana Gomez",
        comment:
          "The team is warm and supportive. Volunteering here has been one of the best decisions of my life.",
        image: "/volunteer3.jpg",
        imageAlt: "Portrait of Ana Gomez",
      },
    ],
    cta: {
      heading: "Join our volunteer team!",
      subheading: "The application takes less than 10 minutes. Start now!",
      button: "Apply to volunteer",
    },
  },
};

export function getVolunteerRequirementsContent(lang?: string) {
  const normalizedLang: VolunteerRequirementsContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: volunteerRequirementsContent[normalizedLang],
  } as const;
}

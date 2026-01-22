import type { HeroContentKey } from "../home/hero";

type HeroVolunteerContentKey = HeroContentKey;

const benefitIconKeys = ["heart", "community", "growth", "wellness"] as const;
type BenefitIconKey = (typeof benefitIconKeys)[number];

type HeroVolunteerContent = {
  headingPrimary: string;
  headingHighlight: string;
  intro: string;
  ctaLabel: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
  benefitsSection: {
    label: string;
    heading: string;
    description: string;
    items: { iconKey: BenefitIconKey; title: string; description: string }[];
  };
};

const heroVolunteerContent: Record<
  HeroVolunteerContentKey,
  HeroVolunteerContent
> = {
  "es-mx": {
    headingPrimary: "Haz la diferencia,",
    headingHighlight: "ayuda a cambiar vidas.",
    intro:
      "Únete a nuestra comunidad de voluntarios y marca la diferencia hoy mismo.",
    ctaLabel: "Quiero ser voluntario",
    imageAlt: "Voluntariado",
    stats: [
      { value: "150+", label: "Voluntarios activos" },
      { value: "3000+", label: "Horas de servicio al mes" },
      { value: "500+", label: "Mascotas ayudadas" },
    ],
    benefitsSection: {
      label: "Beneficios",
      heading: "¿Por qué ser voluntario?",
      description:
        "Ser voluntario en nuestra organización de rescate de mascotas no solo transforma vidas, sino que también enriquece la tuya. Al unirte a nuestro equipo, marcarás una diferencia tangible brindando amor, cuidado y esperanza a los animales que lo necesitan.",
      items: [
        {
          iconKey: "heart",
          title: "Recompensa emocional",
          description:
            "Siente la alegría de salvar vidas y hacer una diferencia real.",
        },
        {
          iconKey: "community",
          title: "Comunidad",
          description:
            "Conéctate con personas que comparten tu pasión por los animales.",
        },
        {
          iconKey: "growth",
          title: "Desarrollo de habilidades",
          description:
            "Aprende nuevas habilidades y gana experiencia en el cuidado de animales.",
        },
        {
          iconKey: "wellness",
          title: "Salud y bienestar",
          description:
            "Mejora tu bienestar físico y mental al dedicar tiempo a una causa significativa.",
        },
      ],
    },
  },
  en: {
    headingPrimary: "Make a difference,",
    headingHighlight: "help change lives.",
    intro: "Join our volunteer community and make an impact today.",
    ctaLabel: "I want to volunteer",
    imageAlt: "Volunteer helping pets",
    stats: [
      { value: "150+", label: "Active volunteers" },
      { value: "3000+", label: "Service hours per month" },
      { value: "500+", label: "Pets helped" },
    ],
    benefitsSection: {
      label: "Benefits",
      heading: "Why volunteer?",
      description:
        "Volunteering with our rescue not only transforms lives—it enriches yours. You'll make a tangible difference by giving animals the love, care, and hope they need to find forever homes.",
      items: [
        {
          iconKey: "heart",
          title: "Emotional reward",
          description:
            "Feel the joy of saving lives and making a real difference.",
        },
        {
          iconKey: "community",
          title: "Community",
          description:
            "Connect with people who share your passion for animals.",
        },
        {
          iconKey: "growth",
          title: "Skill development",
          description:
            "Learn new skills and gain hands-on experience caring for animals.",
        },
        {
          iconKey: "wellness",
          title: "Health & wellness",
          description:
            "Boost your physical and mental well-being while supporting a meaningful cause.",
        },
      ],
    },
  },
};

export function getHeroVolunteerContent(lang?: string) {
  const normalizedLang: HeroVolunteerContentKey =
    lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: heroVolunteerContent[normalizedLang],
  } as const;
}

export type { BenefitIconKey };

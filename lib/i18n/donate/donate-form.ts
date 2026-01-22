import type { HeroContentKey } from "../home/hero";

const donationPresetValues = [50, 100, 150, 200, 300, 500] as const;

type DonationPreset = (typeof donationPresetValues)[number];
type DonateFormContentKey = HeroContentKey;

type DonateFormContent = {
  heading: string;
  subheading: string;
  customLabel: string;
  customPlaceholder: string;
  presetAmounts: readonly DonationPreset[];
  amountInfo: Record<DonationPreset, string>;
  submitLabel: string;
};

const donateFormContent: Record<DonateFormContentKey, DonateFormContent> = {
  "es-mx": {
    heading: "Elige la cantidad a donar",
    subheading: "Cambia una vida hoy",
    customLabel: "Cantidad personalizada",
    customPlaceholder: "$",
    presetAmounts: donationPresetValues,
    amountInfo: {
      50: "$50: puedes cubrir las vacunas básicas para una mascota.",
      100: "$100: puedes proporcionar desparasitaciones y revisiones.",
      150: "$150: puedes costear pruebas y tratamientos iniciales.",
      200: "$200: puedes pagar una cirugía menor o atención especializada.",
      300: "$300: puedes cubrir cirugías importantes o cuidados prolongados.",
      500: "$500: puedes financiar rescates y tratamientos complejos.",
    },
    submitLabel: "Donar Ahora",
  },
  en: {
    heading: "Choose the amount to donate",
    subheading: "Change a life today",
    customLabel: "Custom amount",
    customPlaceholder: "$",
    presetAmounts: donationPresetValues,
    amountInfo: {
      50: "$50: helps cover core vaccines for one pet.",
      100: "$100: provides deworming treatments and checkups.",
      150: "$150: funds initial exams and diagnostics.",
      200: "$200: pays for minor surgery or specialized care.",
      300: "$300: covers major surgeries or extended recovery.",
      500: "$500: fuels rescues and complex treatments.",
    },
    submitLabel: "Donate Now",
  },
};

export function getDonateFormContent(lang?: string) {
  const normalizedLang: DonateFormContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: donateFormContent[normalizedLang],
  } as const;
}

export type { DonationPreset };

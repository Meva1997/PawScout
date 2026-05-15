import type { Metadata } from "next";
import TermsConditionsMain from "@/components/public/terms-conditions/TermsConditionsMain";

export const metadata: Metadata = {
  title: "PawScout - Términos y Condiciones",
  description:
    "Lee los términos y condiciones de uso de PawScout: adopciones, voluntariado, donaciones y privacidad.",
};

export default function TermsConditionsPage() {
  return <TermsConditionsMain />;
}

import type { Metadata } from "next";
import ContactMain from "@/components/public/contact/ContactMain";

export const metadata: Metadata = {
  title: "PawScout - Contacto",
  description:
    "Ponte en contacto con el equipo de PawScout para más información",
};

export default function page() {
  return <ContactMain />;
}

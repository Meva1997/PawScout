import type { Metadata } from "next";
import AdoptMain from "@/components/public/adopt/AdoptMain";

export const metadata: Metadata = {
  title: "PawScout - Adoptar",
  description: "Encuentra y adopta a tu mascota ideal con PawScout",
};

export default function Page() {
  return <AdoptMain />;
}

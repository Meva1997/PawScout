import type { Metadata } from "next";
import ApplyHeader from "@/components/public/adopt/ApplyHeader";

export const metadata: Metadata = {
  title: "PawScout - Formulario de adopción",
  description: "Completa el formulario para adoptar a tu mascota ideal",
};

export default function page() {
  return (
    <main className="bg-gray-200 py-10">
      <ApplyHeader />
    </main>
  );
}

import type { Metadata } from "next";
import HeroVolunteer from "@/components/public/volunteer/HeroVolunteer";
import VolunteerRequirements from "@/components/public/volunteer/VolunteerRequirements";
import VolunteerRoles from "@/components/public/volunteer/VolunteerRoles";

export const metadata: Metadata = {
  title: "PawScout - Voluntariado",
  description:
    "Únete a nuestro equipo de voluntarios y ayuda a cuidar y encontrar hogares para animales necesitados",
};

export default function page() {
  return (
    <>
      <main className="bg-gray-200 py-20">
        <HeroVolunteer />

        <VolunteerRoles />
        <div className="px-6">
          <VolunteerRequirements />
        </div>
      </main>
    </>
  );
}

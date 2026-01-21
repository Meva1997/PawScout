import type { Metadata } from "next";

import AnimalInfo from "@/components/public/adopt/AnimalInfo";

export const metadata: Metadata = {
  title: "PawScout - Información de la mascota",
  description: "Detalles e información sobre la mascota que deseas adoptar",
};

export default function Page() {
  return (
    <>
      <AnimalInfo />
    </>
  );
}

"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PetsTable from "@/components/admin/pets/PetsTable";
import NewPetForm from "@/components/admin/pets/NewPetForm";

export default function PetsPage() {
  return (
    <Suspense fallback={null}>
      <PetsPageContent />
    </Suspense>
  );
}

function PetsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCreatingPet = searchParams.get("modal") === "new";

  const handleCloseModal = () => {
    router.push("/admin/pets");
  };

  const handleOpenModal = () => {
    router.push("/admin/pets?modal=new");
  };

  return (
    <>
      <section className="my-10 flex items-center justify-between ">
        <article>
          <h1 className="text-3xl font-bold text-white">Gestión de Animales</h1>
          <p className="mt-2 text-white/70">
            Administra la información de los animales en el refugio.
          </p>
        </article>
        <article className="flex flex-col items-center w-full space-y-4 md:flex-row md:space-y-0 md:justify-end md:w-auto">
          <button
            onClick={handleOpenModal}
            className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]"
          >
            + Agregar Nuevo Animal
          </button>
          <button className="ml-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Filtros
          </button>
        </article>
      </section>
      <section className="space-y-6">
        <PetsTable />
      </section>

      {/* Form add new pet */}
      {isCreatingPet && (
        <NewPetForm isOpen={isCreatingPet} onCloseAction={handleCloseModal} />
      )}
      <div className="hidden"></div>
    </>
  );
}

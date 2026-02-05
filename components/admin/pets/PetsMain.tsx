"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DogsDataType } from "@/db/dogs";
import PetsTable from "@/components/admin/pets/PetsTable";
import NewPetForm from "@/components/admin/pets/NewPetForm";
import ConfirmModalDelete from "@/components/ui/ConfirmModalDelete";

type PetsMainProps = {
  token: string;
};

export default function PetsMain({ token }: PetsMainProps) {
  return (
    <Suspense fallback={null}>
      <PetsPageContent token={token} />
    </Suspense>
  );
}

function PetsPageContent({ token }: PetsMainProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCreatingPet = searchParams.get("modal") === "new";
  const isEditingPet = searchParams.get("modal") === "edit";

  const [animalToEdit, setAnimalToEdit] = useState<DogsDataType | null>(null);

  const handleCloseModal = () => {
    router.push("/admin/pets");
    setAnimalToEdit(null);
  };

  const handleOpenModal = () => {
    router.push("/admin/pets?modal=new");
  };

  const handleEditAnimal = (animal: DogsDataType) => {
    setAnimalToEdit(animal);
    router.push("/admin/pets?modal=edit");
  };

  const handleDeleteAnimal = (animal: DogsDataType) => {
    router.push(`/admin/pets?modal=delete&animalId=${animal.id}`);
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
        <PetsTable
          onEditAnimal={handleEditAnimal}
          onDeleteAnimal={handleDeleteAnimal}
          // token={token}
        />
      </section>

      {/* Form add/edit pet */}
      {(isCreatingPet || isEditingPet) && (
        <NewPetForm
          isOpen={isCreatingPet || isEditingPet}
          onCloseAction={handleCloseModal}
          token={token}
          animalToEdit={isEditingPet ? animalToEdit : null}
        />
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmModalDelete token={token} />
    </>
  );
}

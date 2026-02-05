"use client";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteAnimal } from "@/api/api";

type ConfirmModalDeleteProps = {
  token: string;
};

export default function ConfirmModalDelete({ token }: ConfirmModalDeleteProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Detectar si el parámetro modal=delete está en la URL
  const isOpenModal = useMemo(() => {
    return searchParams.get("modal") === "delete";
  }, [searchParams]);

  const handleClose = () => {
    // Remover el parámetro modal de la URL
    router.push(window.location.pathname);
  };

  const mutation = useMutation({
    mutationFn: (animalId: number) => deleteAnimal(token, animalId),

    onSuccess: async () => {
      // Refrescar la lista de animales después de eliminar
      await queryClient.invalidateQueries({ queryKey: ["animals"] });
      handleClose();
    },
    onError: (error) => {
      console.error("Error al eliminar el animal:", error);
    },
  });

  const handleDelete = () => {
    const animalId = searchParams.get("animalId");
    if (!animalId) return;

    mutation.mutate(Number(animalId));
  };

  return (
    <>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-gray-800 p-12 rounded-2xl  shadow-lg">
            <DialogTitle className="font-bold text-2xl text-red-600">
              Eliminar Animal
            </DialogTitle>
            <Description className="text-gray-300 mb-4">
              Esto hara que{" "}
              <span className="font-bold text-red-600">permanentemente</span>{" "}
              elimine el animal de la base de datos.
            </Description>
            <p className="text-gray-300 mb-4">
              ¿Estás seguro de que deseas eliminar este animal? Esta acción no
              se puede deshacer.
            </p>
            <div className="flex  gap-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-700 rounded-md cursor-pointer text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 border border-red-800 rounded-md text-white cursor-pointer"
              >
                {mutation.isPending ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

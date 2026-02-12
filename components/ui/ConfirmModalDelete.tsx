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

type ConfirmModalDeleteProps = {
  token: string;
  entityName: string; // "animal", "voluntario", etc.
  entityNamePlural?: string; // "animales", "voluntarios" para invalidar queries
  deleteFnAction: (token: string, id: number) => Promise<unknown>;
  queryKey: string | string[]; // query key para invalidar
  idParamName?: string; // nombre del parámetro en la URL (default: "id")
};

export default function ConfirmModalDelete({
  token,
  entityName,
  entityNamePlural,
  deleteFnAction,
  queryKey,
  idParamName = "id",
}: ConfirmModalDeleteProps) {
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
    mutationFn: (id: number) => deleteFnAction(token, id),

    onSuccess: async () => {
      // Refrescar la lista después de eliminar
      const key = typeof queryKey === "string" ? [queryKey] : queryKey;
      await queryClient.invalidateQueries({ queryKey: key });
      handleClose();
    },
    onError: (error) => {
      console.error(`Error al eliminar ${entityName}:`, error);
    },
  });

  const handleDelete = () => {
    const id = searchParams.get(idParamName);
    if (!id) return;

    mutation.mutate(Number(id));
  };

  return (
    <>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <DialogPanel className="max-w-lg space-y-4 border border-white/10 bg-gray-800 p-12 rounded-2xl shadow-lg">
            <DialogTitle className="font-bold text-2xl text-red-600">
              Eliminar {entityName}
            </DialogTitle>
            <Description className="text-gray-300 mb-4">
              Esto hará que{" "}
              <span className="font-bold text-red-600">permanentemente</span>{" "}
              elimine {entityNamePlural || `este ${entityName}`} de la base de
              datos.
            </Description>
            <p className="text-gray-300 mb-4">
              ¿Estás seguro de que deseas eliminar{" "}
              {entityNamePlural || `este ${entityName}`}? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md cursor-pointer text-white transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={mutation.isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 border border-red-800 rounded-md text-white cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
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

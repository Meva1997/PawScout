"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type NewPetFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export default function NewPetForm({ isOpen, onCloseAction }: NewPetFormProps) {
  function handleClose() {
    onCloseAction();
  }

  return (
    <section className="fixed inset-0 z-0 bg-black/40 backdrop-blur-sm transition duration-300 flex items-center justify-center p-4">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-medium text-white">
                Agregar Nuevo Animal
              </DialogTitle>
              <form action="" className="my-4 space-y-4">
                <label htmlFor="name" className="mt-2 text-sm/6 text-white/50">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  inputMode="text"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />
                <label
                  htmlFor="specie"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Raza:
                </label>
                <input
                  type="text"
                  id="specie"
                  inputMode="text"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />
                <label htmlFor="age" className="mt-2 text-sm/6 text-white/50">
                  Edad:
                </label>
                <input
                  type="number"
                  id="age"
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                />

                <label
                  htmlFor="gender"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Género:
                </label>

                <select
                  name="gender"
                  id="gender"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                >
                  <option value="male">Macho</option>
                  <option value="female">Hembra</option>
                </select>
                <label htmlFor="size" className="mt-2 text-sm/6 text-white/50">
                  Tamaño:
                </label>

                <select
                  name="size"
                  id="size"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                >
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>

                <label htmlFor="about" className="mt-2 text-sm/6 text-white/50">
                  Acerca de:
                </label>
                <textarea
                  id="about"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/80 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                ></textarea>

                <label
                  htmlFor="images"
                  className="mt-2 text-sm/6 text-white/50"
                >
                  Imágenes:
                </label>
                <div className="mt-1 w-full rounded-xl border border-dashed border-white/20 bg-white/5 p-5 text-center text-white/70">
                  <p className="text-sm font-medium">
                    Arrastra y suelta tus fotos aquí
                  </p>
                  <p className="text-xs text-white/50">
                    Formatos JPG o PNG hasta 5MB
                  </p>
                  <div className="mt-4">
                    <label
                      htmlFor="images"
                      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 cursor-pointer hover:bg-white/20 focus:outline focus:outline-[#19e6b3]"
                    >
                      Seleccionar archivos
                    </label>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-emerald-800 data-open:bg-emerald-800 cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClose();
                    }}
                    type="submit"
                  >
                    Agregar
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-800 data-open:bg-red-800 cursor-pointer"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </section>
  );
}

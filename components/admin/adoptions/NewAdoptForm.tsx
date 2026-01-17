"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type NewAdoptFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export default function NewAdoptForm({
  isOpen,
  onCloseAction,
}: NewAdoptFormProps) {
  function handleClose() {
    onCloseAction();
  }

  return (
    <section className="fixed inset-0 z-0 bg-black/40 backdrop-blur-sm transition duration-300 flex items-center justify-center p-4 ">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto py-10">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-xl bg-[#0c1412] p-6 text-white backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-semibold text-white">
                Agregar Nueva Adopción
              </DialogTitle>

              <form className="mt-6 space-y-8">
                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Información Personal
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="text-sm text-white/60"
                      >
                        Primer Nombre
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="María"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="text-sm text-white/60"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="González"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="text-sm text-white/60">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="maria@example.com"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm text-white/60">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    />
                  </div>
                </section>

                <section>
                  <label htmlFor="address" className="text-sm text-white/60">
                    Dirección Completa
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Calle Falsa 123"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  />
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="city" className="text-sm text-white/60">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="text-sm text-white/60">
                        Estado/Provincia
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="text-sm text-white/60"
                      >
                        Código Postal
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="text-sm text-white/60"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="occupation"
                      className="text-sm text-white/60"
                    >
                      Ocupación
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      placeholder="Profesión"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    />
                  </div>
                </section>

                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Intereses
                  </p>
                  <textarea
                    id="interests"
                    name="interests"
                    rows={4}
                    placeholder="¿Por qué desea adoptar esta mascota?"
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  ></textarea>
                </section>

                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Experiencia con Mascotas
                  </p>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    placeholder="Describe la experiencia previa del adoptante con mascotas."
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  ></textarea>
                </section>

                <section className="space-y-4">
                  <p className="text-lg font-semibold text-white/90">
                    Información del Hogar
                  </p>
                  <div className="grid gap-4 md:grid-cols-2 text-white/80">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="housingType" value="house" />
                      Casa
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="housingType"
                        value="apartment"
                      />
                      Apartamento
                    </label>
                  </div>
                  <label
                    htmlFor="householdMembers"
                    className="text-sm text-white/60"
                  >
                    ¿Quiénes residen en el hogar?
                  </label>
                  <textarea
                    id="householdMembers"
                    name="householdMembers"
                    rows={4}
                    placeholder="Lista de adultos, niños y descripción del ambiente familiar."
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                  ></textarea>
                </section>

                <section className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms">
                    Confirmo que el adoptante aceptó los
                    <span className="text-emerald-400 font-semibold">
                      {" "}
                      términos y condiciones
                    </span>{" "}
                    y autorizo el uso de la información conforme a la política
                    de privacidad.
                  </label>
                </section>

                <div className="flex gap-4 justify-center">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 transition hover:bg-emerald-700"
                    onClick={(event) => {
                      event.preventDefault();
                      handleClose();
                    }}
                    type="submit"
                  >
                    Guardar Solicitud
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 transition hover:bg-red-700"
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

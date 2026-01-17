"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const daysOfWeek = [
  { label: "Lunes", value: "monday" },
  { label: "Martes", value: "tuesday" },
  { label: "Miércoles", value: "wednesday" },
  { label: "Jueves", value: "thursday" },
  { label: "Viernes", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];

const areaOfInterest = [
  { label: "Cuidado de animales", value: "animalCare" },
  { label: "Planificación de eventos", value: "eventPlanning" },
  { label: "Recaudación de fondos", value: "fundraising" },
  { label: "Apoyo administrativo", value: "administrativeSupport" },
  { label: "Alcance comunitario", value: "outreach" },
  { label: "Otro", value: "other" },
];

type VolunteerModalFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export default function VolunteerModalForm({
  isOpen,
  onCloseAction,
}: VolunteerModalFormProps) {
  function handleClose() {
    onCloseAction();
  }

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
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
              className="w-full max-w-4xl rounded-xl bg-[#0c1412] p-6 text-white backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-semibold text-white">
                Agregar Nuevo Voluntario
              </DialogTitle>

              <form className="my-4 space-y-8 text-white">
                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Información Personal
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="firstName"
                        className="text-sm text-white/60"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Juan"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="lastName"
                        className="text-sm text-white/60"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Pérez"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm text-white/60">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-sm text-white/60">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="123-456-7890"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Disponibilidad
                  </p>
                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="text-sm text-white/60">Días disponibles</p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        {daysOfWeek.map((day) => (
                          <label
                            key={day.value}
                            className="flex items-center gap-2 text-sm text-white/80"
                          >
                            <input
                              type="checkbox"
                              name="days"
                              value={day.value}
                              className="size-4 rounded border-white/40 bg-transparent"
                            />
                            {day.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="preferredTime"
                        className="text-sm text-white/60"
                      >
                        Horario preferido
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        className="w-full max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      >
                        <option value="morning">Mañana</option>
                        <option value="afternoon">Tarde</option>
                        <option value="evening">Noche</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Áreas de interés
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {areaOfInterest.map((area) => (
                      <label
                        key={area.value}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        <input
                          type="checkbox"
                          name="areas"
                          value={area.value}
                          className="size-4 rounded border-white/40 bg-transparent"
                        />
                        {area.label}
                      </label>
                    ))}
                  </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-lg font-semibold text-white/90">
                      Motivación
                    </p>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={4}
                      placeholder="Describe por qué desea participar como voluntario."
                      className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    ></textarea>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white/90">
                      Habilidades
                    </p>
                    <textarea
                      id="specialSkills"
                      name="specialSkills"
                      rows={4}
                      placeholder="Lista de habilidades relevantes (ej. recaudación, entrenamiento, eventos)."
                      className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    ></textarea>
                  </div>
                </section>

                <section>
                  <p className="text-lg font-semibold text-white/90">
                    Contacto de emergencia
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="emergencyContactName"
                        className="text-sm text-white/60"
                      >
                        Nombre de contacto
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        name="emergencyContactName"
                        placeholder="Nombre completo"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="emergencyContactPhone"
                        className="text-sm text-white/60"
                      >
                        Teléfono de contacto
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        placeholder="123-456-7890"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      />
                    </div>
                  </div>
                </section>

                <section className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms">
                    Confirmo que el voluntario es mayor de edad y acepta los
                    <span className="text-emerald-400 font-semibold">
                      {" "}
                      términos y condiciones{" "}
                    </span>
                    junto con la política de privacidad.
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
                    Guardar Registro
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

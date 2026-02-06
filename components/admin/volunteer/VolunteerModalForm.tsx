"use client";
import { useEffect } from "react";
import { postVolunteer, updateVolunteer } from "@/api/api";
import { VolunteerSchemaType } from "@/schemas/volunteer-schema";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
  { label: "Cuidado de animales", value: "Cuidado de animales" },
  { label: "Planificación de eventos", value: "Planificación de eventos" },
  { label: "Recaudación de fondos", value: "Recaudación de fondos" },
  { label: "Apoyo administrativo", value: "Apoyo administrativo" },
  { label: "Alcance comunitario", value: "Alcance comunitario" },
  { label: "Otro", value: "Otro" },
];

type VolunteerModalFormProps = {
  isOpen: boolean;
  onCloseAction: () => void;
  volunteer?: VolunteerSchemaType;
  token?: string;
};

export default function VolunteerModalForm({
  isOpen,
  onCloseAction,
  volunteer,
  token,
}: VolunteerModalFormProps) {
  const isEditMode = !!volunteer;

  function handleClose() {
    onCloseAction();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VolunteerSchemaType>({
    defaultValues: volunteer || {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      availability: [],
      availableDays: [],
      areasOfInterest: [],
      whyVolunteer: "",
      specialSkills: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      privacyAgreement: false,
    },
  });

  // Resetear el formulario cuando cambie el voluntario
  useEffect(() => {
    if (volunteer) {
      reset(volunteer);
    }
  }, [volunteer, reset]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (volunteerData: VolunteerSchemaType) => {
      if (isEditMode && volunteer?.id && token) {
        return updateVolunteer(token, volunteer.id, volunteerData);
      }
      return postVolunteer(volunteerData);
    },
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      if (isEditMode && volunteer?.id) {
        queryClient.invalidateQueries({
          queryKey: ["volunteer", String(volunteer.id)],
        });
      }
    },
    onError: (error) => {
      console.error(
        `Error al ${isEditMode ? "actualizar" : "agregar"} el voluntario:`,
        error,
      );
    },
  });

  const onSubmit = (data: VolunteerSchemaType) => {
    const volunteerData = {
      ...data,
      date:
        isEditMode && volunteer?.date
          ? volunteer.date
          : new Date().toISOString(),
    };
    mutation.mutate(volunteerData);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-4xl rounded-xl bg-[#0c1412] p-6 text-white backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 my-8"
          >
            <DialogTitle as="h3" className="text-xl font-semibold text-white">
              {isEditMode ? "Editar Voluntario" : "Agregar Nuevo Voluntario"}
            </DialogTitle>

            <form
              className="my-4 space-y-8 text-white"
              onSubmit={handleSubmit(onSubmit)}
            >
              <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                <p className="text-lg font-semibold text-white/90">
                  👤 Información Personal
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm text-white/60">
                      {errors.name ? (
                        <span className="text-red-500">
                          {errors.name.message}
                        </span>
                      ) : (
                        "Nombre"
                      )}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Juan"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("name", {
                        required: "El nombre es obligatorio",
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm text-white/60">
                      {errors.lastName ? (
                        <span className="text-red-500">
                          {errors.lastName.message}
                        </span>
                      ) : (
                        "Apellido"
                      )}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Pérez"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("lastName", {
                        required: "El apellido es obligatorio",
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm text-white/60">
                      {errors.email ? (
                        <span className="text-red-500">
                          {errors.email.message}
                        </span>
                      ) : (
                        "Correo Electrónico"
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="email@email.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("email", {
                        required: "El correo electrónico es obligatorio",
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-sm text-white/60">
                      {errors.phone ? (
                        <span className="text-red-500">
                          {errors.phone.message}
                        </span>
                      ) : (
                        "Teléfono"
                      )}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="123-456-7890"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("phone", {
                        required: "El teléfono es obligatorio",
                      })}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                <p className="text-lg font-semibold text-white/90">
                  {errors.availableDays ? (
                    <span className="text-red-500">
                      {errors.availableDays.message}
                    </span>
                  ) : (
                    "📅 Disponibilidad"
                  )}
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
                      Días disponibles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map((day) => (
                        <label
                          key={day.value}
                          className="group relative cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            {...register("availableDays", {
                              required: "Seleccione al menos un día",
                            })}
                            value={day.value}
                            className="peer sr-only"
                          />
                          <div className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:text-[#19e6b3] peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                            {day.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
                      {errors.availability ? (
                        <span className="text-red-500 normal-case">
                          {errors.availability.message}
                        </span>
                      ) : (
                        "Horario preferido"
                      )}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Seleccione al menos un horario",
                          })}
                          value="morning"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">☀️</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Mañana
                          </span>
                        </div>
                      </label>
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Seleccione al menos un horario",
                          })}
                          value="afternoon"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">🌤️</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Tarde
                          </span>
                        </div>
                      </label>
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Seleccione al menos un horario",
                          })}
                          value="evening"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">🌙</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Noche
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                <p className="text-lg font-semibold text-white/90">
                  {errors.areasOfInterest ? (
                    <span className="text-red-500">
                      {errors.areasOfInterest.message}
                    </span>
                  ) : (
                    "🎯 Áreas de interés"
                  )}
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {areaOfInterest.map((area) => (
                    <label
                      key={area.value}
                      className="group relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        {...register("areasOfInterest", {
                          required: "Seleccione al menos un área de interés",
                        })}
                        value={area.value}
                        className="peer sr-only"
                      />
                      <div className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:text-[#19e6b3] peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                        {area.label}
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {isEditMode && (
                <section className="rounded-2xl border-2 border-emerald-500/20 bg-linear-to-br from-emerald-500/5 via-transparent to-emerald-500/10 p-6">
                  <p className="text-lg font-semibold text-white/90 mb-1">
                    🔄 Estado del Voluntario
                  </p>
                  <p className="text-xs text-white/50 mb-6">
                    Cambia el estado de aprobación del voluntario
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="group relative cursor-pointer">
                      <input
                        type="radio"
                        {...register("status")}
                        value="pending"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-yellow-400 peer-checked:bg-yellow-500/10 peer-checked:shadow-[0_0_20px_rgba(234,179,8,0.2)] group-hover:border-white/30">
                        <svg
                          className="size-8 text-white/50 peer-checked:text-yellow-400 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-white/70 peer-checked:text-yellow-400 transition-colors">
                          Pendiente
                        </span>
                      </div>
                    </label>
                    <label className="group relative cursor-pointer">
                      <input
                        type="radio"
                        {...register("status")}
                        value="accepted"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-emerald-400 peer-checked:bg-emerald-500/10 peer-checked:shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:border-white/30">
                        <svg
                          className="size-8 text-white/50 peer-checked:text-emerald-400 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-white/70 peer-checked:text-emerald-400 transition-colors">
                          Aceptado
                        </span>
                      </div>
                    </label>
                    <label className="group relative cursor-pointer">
                      <input
                        type="radio"
                        {...register("status")}
                        value="rejected"
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-red-400 peer-checked:bg-red-500/10 peer-checked:shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:border-white/30">
                        <svg
                          className="size-8 text-white/50 peer-checked:text-red-400 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-white/70 peer-checked:text-red-400 transition-colors">
                          Rechazado
                        </span>
                      </div>
                    </label>
                  </div>
                </section>
              )}

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                  <p className="text-lg font-semibold text-white/90">
                    {errors.whyVolunteer ? (
                      <span className="text-red-500">
                        {errors.whyVolunteer.message}
                      </span>
                    ) : (
                      "💭 Motivación"
                    )}
                  </p>
                  <textarea
                    id="motivation"
                    {...register("whyVolunteer", {
                      required: "La motivación es obligatoria",
                    })}
                    rows={5}
                    placeholder="Describe por qué desea participar como voluntario..."
                    className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-2 focus:ring-[#19e6b3]/50 transition-all"
                  ></textarea>
                </div>
                <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                  <p className="text-lg font-semibold text-white/90">
                    {errors.specialSkills ? (
                      <span className="text-red-500">
                        {errors.specialSkills.message}
                      </span>
                    ) : (
                      "⭐ Habilidades"
                    )}
                  </p>
                  <textarea
                    id="specialSkills"
                    rows={5}
                    placeholder="Lista de habilidades relevantes (ej. recaudación, entrenamiento, eventos)..."
                    className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-2 focus:ring-[#19e6b3]/50 transition-all"
                    {...register("specialSkills", {
                      required: "Las habilidades son obligatorias",
                    })}
                  ></textarea>
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                <p className="text-lg font-semibold text-white/90">
                  {errors.emergencyContactName ? (
                    <span className="text-red-500">
                      {errors.emergencyContactName.message}
                    </span>
                  ) : (
                    "🚨 Contacto de emergencia"
                  )}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="emergencyContactName"
                      className="text-sm text-white/60"
                    >
                      {errors.emergencyContactName ? (
                        <span className="text-red-500">
                          {errors.emergencyContactName.message}
                        </span>
                      ) : (
                        "Nombre de contacto"
                      )}
                    </label>
                    <input
                      type="text"
                      id="emergencyContactName"
                      placeholder="Nombre de contacto"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("emergencyContactName", {
                        required:
                          "El nombre del contacto de emergencia es obligatorio",
                      })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="emergencyContactPhone"
                      className="text-sm text-white/60"
                    >
                      {errors.emergencyContactPhone ? (
                        <span className="text-red-500">
                          {errors.emergencyContactPhone.message}
                        </span>
                      ) : (
                        "Teléfono de contacto"
                      )}
                    </label>
                    <input
                      type="tel"
                      id="emergencyContactPhone"
                      {...register("emergencyContactPhone", {
                        required:
                          "El teléfono del contacto de emergencia es obligatorio",
                      })}
                      placeholder="123-456-7890"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border-2 border-white/10 bg-linear-to-br from-emerald-500/5 via-transparent to-[#19e6b3]/10 p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <label
                      htmlFor="terms"
                      className="group relative cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        {...register("privacyAgreement", {
                          required: "Debe aceptar los términos y condiciones",
                        })}
                        className="peer sr-only"
                      />
                      <div className="flex size-6 items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3] peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.3)] group-hover:border-white/40">
                        <svg
                          className="size-4 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="terms"
                      className="cursor-pointer text-sm text-white/80 leading-relaxed"
                    >
                      Confirmo que el voluntario es mayor de edad y acepta los
                      <span className="text-[#19e6b3] font-semibold">
                        {" "}
                        términos y condiciones{" "}
                      </span>
                      junto con la política de privacidad.
                    </label>
                    {errors.privacyAgreement && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.privacyAgreement.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <svg
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {isEditMode ? "Actualizar Registro" : "Guardar Registro"}
                    </>
                  )}
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                  onClick={handleClose}
                  type="button"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

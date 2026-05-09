"use client";
import { useEffect } from "react";
import { postVolunteer, updateVolunteer } from "@/api/api";
import { VolunteerSchemaType } from "@/schemas/volunteer-schema";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const daysOfWeek = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const areaOfInterest = [
  { label: "Animal Care", value: "Cuidado de animales" },
  { label: "Event Planning", value: "Planificación de eventos" },
  { label: "Fundraising", value: "Recaudación de fondos" },
  { label: "Administrative Support", value: "Apoyo administrativo" },
  { label: "Community Outreach", value: "Alcance comunitario" },
  { label: "Other", value: "Otro" },
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
        `Error ${isEditMode ? "updating" : "adding"} volunteer:`,
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
              {isEditMode ? "Edit Volunteer" : "Add New Volunteer"}
            </DialogTitle>

            <form
              className="my-4 space-y-8 text-white"
              onSubmit={handleSubmit(onSubmit)}
            >
              <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6">
                <p className="text-lg font-semibold text-white/90">
                  👤 Personal Information
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm text-white/60">
                      {errors.name ? (
                        <span className="text-red-500">
                          {errors.name.message}
                        </span>
                      ) : (
                        "Name"
                      )}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("name", {
                        required: "Name is required",
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
                        "Last Name"
                      )}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Smith"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("lastName", {
                        required: "Last name is required",
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
                        "Email"
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="email@email.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("email", {
                        required: "Email is required",
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
                        "Phone"
                      )}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="123-456-7890"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("phone", {
                        required: "Phone is required",
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
                    "📅 Availability"
                  )}
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
                      Available Days
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
                              required: "Select at least one day",
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
                        "Preferred Schedule"
                      )}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Select at least one time slot",
                          })}
                          value="morning"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">☀️</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Morning
                          </span>
                        </div>
                      </label>
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Select at least one time slot",
                          })}
                          value="afternoon"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">🌤️</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Afternoon
                          </span>
                        </div>
                      </label>
                      <label className="group relative cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("availability", {
                            required: "Select at least one time slot",
                          })}
                          value="evening"
                          className="peer sr-only"
                        />
                        <div className="flex items-center gap-3 rounded-xl border-2 border-white/10 bg-white/5 p-4 transition-all duration-200 peer-checked:border-[#19e6b3] peer-checked:bg-[#19e6b3]/10 peer-checked:shadow-[0_0_20px_rgba(25,230,179,0.2)] group-hover:border-white/30">
                          <span className="text-2xl">🌙</span>
                          <span className="font-semibold text-white/70 peer-checked:text-[#19e6b3]">
                            Evening
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
                    "🎯 Areas of Interest"
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
                          required: "Select at least one area of interest",
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
                    🔄 Volunteer Status
                  </p>
                  <p className="text-xs text-white/50 mb-6">
                    Change the volunteer&apos;s approval status
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
                          Pending
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
                          Accepted
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
                          Rejected
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
                      "💭 Motivation"
                    )}
                  </p>
                  <textarea
                    id="motivation"
                    {...register("whyVolunteer", {
                      required: "Motivation is required",
                    })}
                    rows={5}
                    placeholder="Describe why you want to volunteer..."
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
                      "⭐ Skills"
                    )}
                  </p>
                  <textarea
                    id="specialSkills"
                    rows={5}
                    placeholder="List of relevant skills (e.g., fundraising, training, events)..."
                    className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-[#19e6b3] focus:outline-none focus:ring-2 focus:ring-[#19e6b3]/50 transition-all"
                    {...register("specialSkills", {
                      required: "Skills are required",
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
                    "🚨 Emergency Contact"
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
                        "Contact Name"
                      )}
                    </label>
                    <input
                      type="text"
                      id="emergencyContactName"
                      placeholder="Contact Name"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/90 placeholder:text-white/30 focus:border-[#19e6b3] focus:outline-none focus:ring-1 focus:ring-[#19e6b3]"
                      {...register("emergencyContactName", {
                        required:
                          "Emergency contact name is required",
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
                        "Contact Phone"
                      )}
                    </label>
                    <input
                      type="tel"
                      id="emergencyContactPhone"
                      {...register("emergencyContactPhone", {
                        required:
                          "Emergency contact phone is required",
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
                          required: "You must accept the terms and conditions",
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
                      I confirm that the volunteer is of legal age and accepts the
                      <span className="text-[#19e6b3] font-semibold">
                        {" "}
                        terms and conditions{" "}
                      </span>
                      along with the privacy policy.
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
                      Saving...
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
                      {isEditMode ? "Update Record" : "Save Record"}
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
                  Cancel
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

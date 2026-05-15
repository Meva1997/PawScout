"use client";

import { useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  UserIcon,
  HeartIcon,
  BookOpenIcon,
  UsersIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  SunIcon,
  CloudIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import { CalendarIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { getVolunteerFormContent } from "@/lib/i18n/volunteer/form-volunteer";
import { volunteerFormAction } from "@/actions/volunteer/volunteer-form-action";
import Link from "next/link";

const interestIcons: Record<string, React.ReactNode> = {
  animalCare: <HeartIcon className="h-5 w-5" />,
  eventPlanning: <CalendarDaysIcon className="h-5 w-5" />,
  fundraising: <BanknotesIcon className="h-5 w-5" />,
  administrativeSupport: <ClipboardDocumentListIcon className="h-5 w-5" />,
  outreach: <UsersIcon className="h-5 w-5" />,
  other: <SparklesIcon className="h-5 w-5" />,
};

const timeIcons: Record<string, React.ReactNode> = {
  morning: <SunIcon className="h-4 w-4" />,
  afternoon: <CloudIcon className="h-4 w-4" />,
  evening: <MoonIcon className="h-4 w-4" />,
};

export default function VolunteerForm() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content } = getVolunteerFormContent(langParam);

  const [state, dispatch, isPending] = useActionState(volunteerFormAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      if (params?.lang === "es-mx") {
        toast.success("Formulario de voluntariado enviado con éxito");
      } else {
        toast.success(
          state.success || "Volunteer form submitted successfully!",
        );
      }
      router.push(`/${params?.lang || "en"}/volunteer/form/success`);
    }
  }, [state, params?.lang, router]);

  return (
    <article className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <form action={dispatch} className="space-y-4">
        <input type="hidden" name="lang" value={params?.lang || "en"} />
        <section>
          <h2 className="font-bold text-2xl pb-6">
            <UserIcon className="h-10 inline-block mr-2 text-emerald-600" />
            {content.personal.heading}
          </h2>
          <hr className="mb-6 text-gray-200" />
          <p className="text-gray-500 mb-6">{content.personal.description}</p>

          <div className="grid grid-cols-2">
            <div className="flex flex-col mb-4 mr-4">
              <label htmlFor="name" className="mb-2 font-semibold">
                {content.personal.fields.firstName.label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={(state.formData?.name as string) || ""}
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.firstName.placeholder}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="lastName" className="mb-2 font-semibold">
                {content.personal.fields.lastName.label}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={(state.formData?.lastName as string) || ""}
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.lastName.placeholder}
              />
            </div>
            <div className="flex flex-col mb-4 mr-4">
              <label htmlFor="email" className="mb-2 font-semibold">
                {content.personal.fields.email.label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={(state.formData?.email as string) || ""}
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.email.placeholder}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-2 font-semibold">
                {content.personal.fields.phone.label}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={(state.formData?.phone as string) || ""}
                className="border border-gray-300 p-2 rounded-full bg-gray-100"
                placeholder={content.personal.fields.phone.placeholder}
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-2xl py-6">
            {" "}
            <CalendarIcon className="h-10 inline-block mr-2 text-emerald-600" />{" "}
            {content.availability.heading}
          </h3>
          <hr className="mb-6 text-emerald-600" />

          <p className="text-gray-600 pb-3 font-medium">
            {content.availability.daysLabel}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {content.availability.days.map((day) => (
              <label key={day.value} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day.value}
                  defaultChecked={state.formData?.availableDays?.includes(
                    day.value,
                  )}
                  className="sr-only peer"
                />
                <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-full border-2 border-gray-200 bg-gray-50 text-gray-500 font-medium text-sm transition-all duration-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white hover:border-emerald-300 hover:bg-emerald-50 select-none">
                  {day.label}
                </span>
              </label>
            ))}
          </div>

          <p className="text-gray-600 pb-3 font-medium">
            {content.availability.preferredLabel}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {content.availability.preferredOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  defaultChecked={
                    state.formData?.availability?.[0] === option.value
                  }
                  className="sr-only peer"
                />
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gray-200 bg-gray-50 text-gray-500 font-medium text-sm transition-all duration-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white hover:border-emerald-300 hover:bg-emerald-50 select-none">
                  {timeIcons[option.value]}
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-bold text-2xl py-6">
            {" "}
            <HeartIcon className="h-10 inline-block mr-2 text-emerald-600" />{" "}
            {content.interests.heading}
          </h3>
          <hr className="mb-6 text-emerald-600" />
          <p className="text-gray-600 mb-4">{content.interests.intro}</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {content.interests.items.map((area) => (
              <label key={area.value} className="cursor-pointer group">
                <input
                  type="checkbox"
                  name="areasOfInterest"
                  value={area.value}
                  defaultChecked={state.formData?.areasOfInterest?.includes(
                    area.value,
                  )}
                  className="sr-only peer"
                />
                <span className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 font-medium text-sm transition-all duration-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/60 select-none h-full">
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 group-has-[input:checked]:bg-emerald-100 group-has-[input:checked]:text-emerald-600 transition-all duration-200">
                    {interestIcons[area.value]}
                  </span>
                  {area.label}
                </span>
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h4 className="font-bold text-2xl py-6">
            {" "}
            <BookOpenIcon className="h-10 inline-block mr-2 text-emerald-600" />{" "}
            {content.experience.heading}
          </h4>
          <hr className="mb-6 text-emerald-600" />
          <div>
            <p className="text-black">
              {content.experience.questions.motivation}
            </p>
            <textarea
              name="whyVolunteer"
              id="whyVolunteer"
              rows={4}
              defaultValue={(state.formData?.whyVolunteer as string) || ""}
              className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full h-32 mt-2"
              placeholder={content.experience.placeholders.motivation}
            ></textarea>
          </div>
          <div>
            <p className="text-black">{content.experience.questions.skills}</p>
            <textarea
              name="specialSkills"
              id="specialSkills"
              defaultValue={(state.formData?.specialSkills as string) || ""}
              className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full h-10 mt-2"
              placeholder={content.experience.placeholders.skills}
            ></textarea>
          </div>
        </section>
        <section className="space-y-4">
          <h5 className="font-bold text-2xl py-6">
            {" "}
            <IdentificationIcon className="h-10 inline-block mr-2 text-emerald-600" />{" "}
            {content.emergency.heading}
          </h5>
          <hr className="mb-6 text-emerald-600" />
          <div className="flex items-center justify-center">
            <div>
              <label htmlFor="">{content.emergency.nameLabel}</label>
              <input
                type="text"
                name="emergencyContactName"
                defaultValue={
                  (state.formData?.emergencyContactName as string) || ""
                }
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder={content.emergency.placeholders.name}
              />
            </div>
            <div className="ml-8">
              <label htmlFor="">{content.emergency.phoneLabel}</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                defaultValue={
                  (state.formData?.emergencyContactPhone as string) || ""
                }
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder={content.emergency.placeholders.phone}
              />
            </div>
          </div>
        </section>

        <hr className="my-10 text-emerald-600" />

        <section>
          <div className="flex items-center justify-center max-w-lg mx-auto gap-4">
            <input
              type="checkbox"
              className="mr-2"
              name="privacyAgreement"
              defaultChecked={state.formData?.privacyAgreement === true}
            />
            <p className="text-gray-400">
              {content.terms.text}{" "}
              <span className="text-emerald-600 font-bold hover:underline hover:text-emerald-800">
                <Link href={`/${params?.lang}/terms-conditions`}>
                  {content.terms.highlight}
                </Link>
              </span>
              .
            </p>
          </div>

          <input type="hidden" name="date" value={new Date().toISOString()} />
          <button
            type="submit"
            disabled={isPending}
            className="mt-8 bg-emerald-500 text-black font-bold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-300 mx-auto block cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? params?.lang === "es-mx"
                ? "Enviando..."
                : "Submitting..."
              : content.submitLabel}
          </button>
          <p className="text-center mt-6 text-gray-400">{content.reviewText}</p>
        </section>
      </form>
    </article>
  );
}

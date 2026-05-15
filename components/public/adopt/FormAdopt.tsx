"use client";

import { useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAdoptFormContent } from "@/lib/i18n/adopt/adopt-form";
import { toast } from "react-toastify";
import { adoptFormAction } from "@/actions/adopt/adopt-form-action";

type FormAdoptProps = {
  slug: number;
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent hover:border-emerald-300";

function FormSection({
  icon,
  title,
  children,
  accent = false,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 shadow-sm border ${
        accent
          ? "bg-emerald-50 border-emerald-100"
          : "bg-gray-50 border-gray-100"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div
          className={`h-px flex-1 ${accent ? "bg-emerald-200" : "bg-gray-200"}`}
        />
      </div>
      {children}
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-600 tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function FormAdopt({ slug }: FormAdoptProps) {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const { content } = getAdoptFormContent(params?.lang);
  const { fields } = content;

  const formDispatchWithId = adoptFormAction.bind(null, slug);
  const [state, dispatch, isPending] = useActionState(formDispatchWithId, {
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
        toast.success("Formulario de adopción enviado con éxito");
      } else if (params?.lang === "en") {
        toast.success(state.success || "Adoption form submitted successfully!");
      }
      router.push(`/${params?.lang || "en"}/adopt/${slug}/adopt-form/success`);
    }
  }, [state, params?.lang, router, slug]);

  return (
    <section className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Header banner */}
      <div className="bg-linear-to-br from-emerald-500 to-emerald-700 px-8 py-10 text-white">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🐾</span>
          <h2 className="text-3xl font-black tracking-tight">
            {content.personalInfoTitle}
          </h2>
        </div>
      </div>

      <form action={dispatch} className="bg-white p-6 md:p-8 space-y-6">
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="lang" value={params?.lang || "en"} />

        {/* Personal info */}
        <FormSection icon="👤" title={content.personalInfoTitle}>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldGroup label={fields.firstName.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="applicantName"
                  defaultValue={(state.formData?.applicantName as string) || ""}
                  placeholder={fields.firstName.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
              <FieldGroup label={fields.lastName.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="applicantLastName"
                  defaultValue={
                    (state.formData?.applicantLastName as string) || ""
                  }
                  placeholder={fields.lastName.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldGroup label={fields.email.label}>
                <input
                  type="email"
                  inputMode="email"
                  name="email"
                  defaultValue={(state.formData?.email as string) || ""}
                  placeholder={fields.email.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
              <FieldGroup label={fields.phone.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="phone"
                  defaultValue={(state.formData?.phone as string) || ""}
                  placeholder={fields.phone.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
            </div>

            <FieldGroup label={fields.address.label}>
              <input
                type="text"
                inputMode="text"
                name="address"
                defaultValue={(state.formData?.address as string) || ""}
                placeholder={fields.address.placeholder}
                className={inputClass}
              />
            </FieldGroup>

            <div className="grid md:grid-cols-3 gap-4">
              <FieldGroup label={fields.city.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="city"
                  defaultValue={(state.formData?.city as string) || ""}
                  placeholder={fields.city.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
              <FieldGroup label={fields.state.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="state"
                  defaultValue={(state.formData?.state as string) || ""}
                  placeholder={fields.state.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
              <FieldGroup label={fields.postalCode.label}>
                <input
                  type="text"
                  inputMode="numeric"
                  name="zipCode"
                  defaultValue={(state.formData?.zipCode as string) || ""}
                  placeholder={fields.postalCode.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldGroup label={fields.birthDate.label}>
                <input
                  type="date"
                  name="birthdate"
                  defaultValue={(state.formData?.birthdate as string) || ""}
                  inputMode="numeric"
                  className={inputClass}
                />
              </FieldGroup>
              <FieldGroup label={fields.occupation.label}>
                <input
                  type="text"
                  inputMode="text"
                  name="occupation"
                  defaultValue={(state.formData?.occupation as string) || ""}
                  placeholder={fields.occupation.placeholder}
                  className={inputClass}
                />
              </FieldGroup>
            </div>
          </div>
        </FormSection>

        {/* Reason for adoption */}
        <FormSection icon="❤️" title={content.interests.title} accent>
          <textarea
            name="reasonForAdoption"
            id="reasonForAdoption"
            defaultValue={(state.formData?.reasonForAdoption as string) || ""}
            className={`${inputClass} resize-none`}
            placeholder={content.interests.placeholder}
            rows={4}
          />
        </FormSection>

        {/* Experience with pets */}
        <FormSection icon="🐶" title={content.experience.title}>
          <textarea
            name="experienceWithPets"
            id="experienceWithPets"
            defaultValue={(state.formData?.experienceWithPets as string) || ""}
            className={`${inputClass} resize-none`}
            placeholder={content.experience.placeholder}
            rows={4}
          />
        </FormSection>

        {/* Home info */}
        <FormSection icon="🏡" title={content.homeInfo.title} accent>
          <p className="text-sm font-semibold text-gray-600 mb-3">
            {content.homeInfo.housingTypeLabel}
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-300 cursor-pointer transition-all duration-200 has-checked:border-emerald-400 has-checked:bg-emerald-50">
              <input
                type="radio"
                name="homeType"
                value="house"
                defaultChecked={state.formData?.homeType === "house"}
                className="accent-emerald-500 w-4 h-4"
              />
              <span className="text-2xl">🏠</span>
              <span className="font-semibold text-gray-700">
                {content.homeInfo.housingOptions.house}
              </span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-300 cursor-pointer transition-all duration-200 has-checked:border-emerald-400 has-checked:bg-emerald-50">
              <input
                type="radio"
                name="homeType"
                value="apartment"
                defaultChecked={state.formData?.homeType === "apartment"}
                className="accent-emerald-500 w-4 h-4"
              />
              <span className="text-2xl">🏢</span>
              <span className="font-semibold text-gray-700">
                {content.homeInfo.housingOptions.apartment}
              </span>
            </label>
          </div>

          <p className="text-sm font-semibold text-gray-600 mb-3">
            {content.homeInfo.householdLabel}
          </p>
          <textarea
            name="whoLivesInHouse"
            defaultValue={(state.formData?.whoLivesInHouse as string) || ""}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder={content.homeInfo.householdPlaceholder}
          />
        </FormSection>

        {/* Terms & submit */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              defaultChecked={state.formData?.agreeToTerms === true}
              className="mt-0.5 w-5 h-5 rounded accent-emerald-500 cursor-pointer shrink-0"
            />
            <p className="text-gray-500 text-sm leading-relaxed">
              {content.terms.text}{" "}
              <span className="underline text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                {content.terms.linkText}
              </span>
              {content.terms.suffix}
            </p>
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-lg py-4 px-8 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>
                  {params?.lang === "es-mx" ? "Enviando..." : "Sending..."}
                </span>
              </>
            ) : (
              <>
                <span>{content.terms.buttonLabel}</span>
                <span className="text-xl">🐾</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

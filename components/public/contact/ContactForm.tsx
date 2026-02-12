"use client";

import { useActionState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getContactFormContent } from "@/lib/i18n/contact/contact-form";
import { contactFormAction } from "@/actions/contact/contact-form-action";
import { toast } from "react-toastify";

export default function ContactForm() {
  const params = useParams<{ lang?: string }>();
  const { content } = getContactFormContent(params?.lang);

  const [state, dispatch, isPending] = useActionState(contactFormAction, {
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
        toast.success("Mensaje enviado con éxito");
      } else {
        toast.success(state.success || "Message sent successfully!");
      }
    }
  }, [state, params?.lang]);

  return (
    <form
      action={dispatch}
      className="bg-white p-6 rounded-lg shadow-md w-full"
    >
      <h3 className="font-bold text-xl">{content.heading}</h3>
      <p className="text-gray-500">{content.description}</p>
      <input type="hidden" name="lang" value={params?.lang || "en"} />
      <div className="flex flex-col pt-4 gap-4 md:flex-row">
        <div className="flex-1 md:mr-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {content.fields.name.label}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={(state.formData?.name as string) || ""}
            className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none"
            placeholder={content.fields.name.placeholder}
          />
        </div>
        <div className="flex-1 md:ml-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            {content.fields.lastName.label}
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={(state.formData?.lastName as string) || ""}
            className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none"
            placeholder={content.fields.lastName.placeholder}
          />
        </div>
      </div>
      <div className="pt-4 flex flex-col space-y-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          {content.fields.email.label}
          <input
            type="email"
            id="email"
            name="email"
            inputMode="email"
            defaultValue={(state.formData?.email as string) || ""}
            className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
            placeholder={content.fields.email.placeholder}
          />
        </label>
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">
          {content.subject.label}
          <select
            name="subject"
            id="subject"
            defaultValue={(state.formData?.subject as string) || ""}
            className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
          >
            <option value="">
              {params?.lang === "es-mx"
                ? "Selecciona un asunto"
                : "Select a subject"}
            </option>
            {content.subject.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          {content.message.label}
          <textarea
            id="message"
            name="message"
            rows={4}
            defaultValue={(state.formData?.message as string) || ""}
            className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
            placeholder={content.message.placeholder}
          ></textarea>
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-emerald-800 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? params.lang === "es-mx"
              ? "Enviando..."
              : "Sending..."
            : content.submitLabel}
        </button>
      </div>
    </form>
  );
}

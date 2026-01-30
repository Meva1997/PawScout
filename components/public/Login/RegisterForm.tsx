"use client";

import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register/create-account-action";
import { getRegisterFormContent } from "@/lib/i18n/register/register-form";

export default function RegisterForm() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const { content } = getRegisterFormContent(params?.lang);

  const [state, dispatch, isPending] = useActionState(register, {
    errors: [],
    success: "",
    formData: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      if (params?.lang === "es-mx") {
        toast.success("Cuenta creada exitosamente");
      } else if (params?.lang === "en") {
        toast.success(state.success || "Account created successfully");
      }

      router.push(`/${params?.lang || "en"}/login`);
    }
  }, [state, params?.lang, router]);

  return (
    <>
      <form action={dispatch} className="w-full max-w-sm">
        <input type="hidden" name="lang" value={params?.lang || "en"} />
        <div className="mb-6">
          <div className="flex gap-4 my-4">
            <div>
              <label htmlFor="firstName">{content.name}</label>
              <input
                type="text"
                id="firstName"
                inputMode="text"
                name="firstName"
                defaultValue={state.formData?.firstName || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder={content.namePlaceholder}
              />
            </div>
            <div>
              <label htmlFor="lastName">{content.lastName}</label>
              <input
                type="text"
                id="lastName"
                inputMode="text"
                name="lastName"
                defaultValue={state.formData?.lastName || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder={content.lastNamePlaceholder}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-black"
            >
              {content.email}
            </label>
            <input
              type="email"
              id="email"
              inputMode="email"
              name="email"
              defaultValue={state.formData?.email || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.emailPlaceholder}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-black"
            >
              {content.password}
            </label>
            <input
              type="password"
              id="password"
              inputMode="text"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.passwordPlaceholder}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1 text-black"
            >
              {content.confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.confirmPasswordPlaceholder}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            {isPending ? content.submittingLabel : content.submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}

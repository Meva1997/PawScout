"use client";
import { useActionState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLoginFormContent } from "@/lib/i18n/login/login-form";
import { login } from "@/actions/login/login-action";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const { content } = getLoginFormContent(params?.lang);
  const [state, dispatch, isPending] = useActionState(login, {
    errors: [],
    success: "",
    formData: {
      email: "",
      password: "",
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
        toast.success("Inicio de sesión exitoso");
      } else if (params?.lang === "en") {
        toast.success(state.success || "Login successful!");
      }
      router.push(`/${params?.lang || "en"}/home`);
    }
  }, [state, params?.lang, router]);

  return (
    <>
      <form action={dispatch} className="w-full max-w-sm">
        <input type="hidden" name="lang" value={params?.lang || "en"} />
        <div className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-black"
            >
              {content.emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.emailPlaceholder}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-black"
            >
              {content.passwordLabel}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.passwordPlaceholder}
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

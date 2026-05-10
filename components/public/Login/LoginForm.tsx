"use client";
import { useActionState, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLoginFormContent } from "@/lib/i18n/login/login-form";
import { login } from "@/actions/login/login-action";
import { toast } from "react-toastify";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const DEMO_CREDENTIALS = { email: "test@email.com", password: "password" };

export default function LoginForm() {
  const router = useRouter();
  const params = useParams<{ lang?: string }>();
  const [copied, setCopied] = useState<"email" | "password" | null>(null);

  function copyToClipboard(field: "email" | "password") {
    navigator.clipboard.writeText(DEMO_CREDENTIALS[field]);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }
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
      <div className="w-full max-w-sm mb-5 rounded-lg border border-emerald-400 bg-emerald-50 p-4">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
          Demo credentials — Admin access
        </p>
        <p className="text-xs text-gray-500 mb-3">
          General access credentials for recruiters.
        </p>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-20">Email</span>
              <span className="font-semibold text-black">test@email.com</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard("email")}
              className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
              title="Copy email"
            >
              {copied === "email" ? (
                <ClipboardDocumentCheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardDocumentIcon className="w-4 h-4" />
              )}
              {copied === "email" ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-20">Password</span>
              <span className="font-semibold text-black">password</span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard("password")}
              className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
              title="Copy password"
            >
              {copied === "password" ? (
                <ClipboardDocumentCheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardDocumentIcon className="w-4 h-4" />
              )}
              {copied === "password" ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

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

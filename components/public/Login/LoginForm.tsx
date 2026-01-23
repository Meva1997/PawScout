"use client";
import { useParams } from "next/navigation";
import { getLoginFormContent } from "@/lib/i18n/login/login-form";

export default function LoginForm() {
  const params = useParams<{ lang?: string }>();
  const { content } = getLoginFormContent(params?.lang);
  return (
    <>
      <form action="" className="w-full max-w-sm">
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
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.emailPlaceholder}
              required
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
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              required
              placeholder={content.passwordPlaceholder}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            {content.submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}

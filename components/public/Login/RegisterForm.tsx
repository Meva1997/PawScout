"use client";

import { getRegisterFormContent } from "@/lib/i18n/register/register-form";
import { useParams } from "next/navigation";

export default function RegisterForm() {
  const params = useParams<{ lang?: string }>();
  const { content } = getRegisterFormContent(params?.lang);

  return (
    <>
      <form action="" className="w-full max-w-sm">
        <div className="mb-6">
          <div className="flex gap-4 my-4">
            <div>
              <label htmlFor="firstName">{content.name}</label>
              <input
                type="text"
                id="firstName"
                inputMode="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder={content.namePlaceholder}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">{content.lastName}</label>
              <input
                type="text"
                id="lastName"
                inputMode="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder={content.lastNamePlaceholder}
                required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder={content.emailPlaceholder}
              required
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
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              required
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
              inputMode="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              required
              placeholder={content.confirmPasswordPlaceholder}
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

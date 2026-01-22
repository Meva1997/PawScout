"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getAdoptFormContent } from "@/lib/i18n/adopt/adopt-form";

type FormAdoptProps = {
  slug: number;
};

export default function FormAdopt({ slug }: FormAdoptProps) {
  const params = useParams<{ lang?: string }>();
  const { content } = getAdoptFormContent(params?.lang);
  const { fields } = content;
  return (
    <section className="bg-white p-6 rounded-lg">
      <h2 className="font-bold text-2xl py-8">{content.personalInfoTitle}</h2>

      <form action="" className="space-y-4">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              {fields.firstName.label}
            </p>
            <input type="hidden" name="slug" value={slug} />
            <input
              type="text"
              inputMode="text"
              name="firstname"
              placeholder={fields.firstName.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              {fields.lastName.label}
            </p>
            <input
              type="text"
              inputMode="text"
              name="lastname"
              placeholder={fields.lastName.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              {fields.email.label}
            </p>
            <input
              type="email"
              inputMode="email"
              name="email"
              placeholder={fields.email.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              {fields.phone.label}
            </p>
            <input
              type="text"
              inputMode="text"
              name="phone"
              placeholder={fields.phone.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              {fields.address.label}
            </p>
            <input
              type="text"
              inputMode="text"
              name="address"
              placeholder={fields.address.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-8 mb-4">
          <div>
            <p>{fields.city.label}</p>
            <input
              type="text"
              inputMode="text"
              name="city"
              placeholder={fields.city.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p>{fields.state.label}</p>
            <input
              type="text"
              inputMode="text"
              name="state"
              placeholder={fields.state.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p>{fields.postalCode.label}</p>
            <input
              type="text"
              inputMode="numeric"
              name="postalCode"
              placeholder={fields.postalCode.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="flex flex-col md:flex-row  my-6 gap-6">
          <div>
            <p>{fields.birthDate.label}</p>
            <input
              type="date"
              name="birthDate"
              inputMode="numeric"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p>{fields.occupation.label}</p>
            <input
              type="text"
              inputMode="text"
              name="occupation"
              placeholder={fields.occupation.placeholder}
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <hr className="border border-emerald-500 my-4" />

        {/*Skills and Experience section */}
        <section className="my-6 space-y-4">
          <h3 className="text-2xl font-bold">{content.interests.title}</h3>

          <textarea
            name="interests"
            id="interests"
            className="border border-gray-500 rounded-lg p-2 w-full"
            placeholder={content.interests.placeholder}
            rows={4}
          ></textarea>
        </section>

        <hr className="border border-emerald-500 my-4" />

        {/*Skills and Experience section */}
        <section className="my-6 space-y-4">
          <h3 className="text-2xl font-bold">{content.experience.title}</h3>

          <textarea
            name="experience"
            id="experience"
            className="border border-gray-500 rounded-lg p-2 w-full"
            placeholder={content.experience.placeholder}
            rows={4}
          ></textarea>
        </section>

        <hr className="border border-emerald-500 my-4" />

        {/* Home information section */}
        <section className="my-6 space-y-4">
          <h3 className="text-2xl font-bold">{content.homeInfo.title}</h3>
          <p className="text-gray-600 font-semibold">
            {content.homeInfo.housingTypeLabel}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <label className="text-gray-600 font-semibold flex items-center gap-2">
              <input type="radio" name="housingType" value="house" />
              {content.homeInfo.housingOptions.house}
            </label>
            <label className="text-gray-600 font-semibold flex items-center gap-2">
              <input type="radio" name="housingType" value="apartment" />
              {content.homeInfo.housingOptions.apartment}
            </label>
          </div>
          <p className="text-gray-600 font-semibold">
            {content.homeInfo.householdLabel}
          </p>
          <textarea
            name="householdMembers"
            rows={4}
            className="border border-gray-500 rounded-lg p-2 w-full"
            placeholder={content.homeInfo.householdPlaceholder}
          />
        </section>
        <section className="pt-10">
          <div className="flex items-center gap-4 justify-center">
            <input type="checkbox" />
            <p className="text-gray-400">
              {content.terms.text}{" "}
              <span className="underline text-emerald-600 font-bold">
                {content.terms.linkText}
              </span>
              {content.terms.suffix}
            </p>
          </div>
          {/* TODO: Implement form submission logic. Change Link to button and handle form submission */}
          <div className="mt-10 justify-center flex w-2/3 mx-auto">
            <Link
              href={`/${params?.lang}/adopt/${slug}/adopt-form/success`}
              className="mt-6 bg-emerald-500 p-4 rounded-lg text-center font-black hover:bg-emerald-700 transition-colors cursor-pointer w-full"
            >
              {content.terms.buttonLabel}
            </Link>
          </div>
        </section>
      </form>
    </section>
  );
}

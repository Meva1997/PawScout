"use client";

import { useParams } from "next/navigation";
import { UserIcon, HeartIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { getVolunteerFormContent } from "@/lib/i18n/volunteer/form-volunteer";

export default function VolunteerForm() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content } = getVolunteerFormContent(langParam);

  return (
    <article className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <form action="">
        <section>
          <h2 className="font-bold text-2xl pb-6">
            <UserIcon className="h-10 inline-block mr-2 text-emerald-600" />
            {content.personal.heading}
          </h2>
          <hr className="mb-6 text-gray-200" />
          <p className="text-gray-500 mb-6">{content.personal.description}</p>

          <div className="grid grid-cols-2">
            <div className="flex flex-col mb-4 mr-4">
              <label htmlFor="firstName" className="mb-2 font-semibold">
                {content.personal.fields.firstName.label}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.firstName.placeholder}
                required
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
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.lastName.placeholder}
                required
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
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder={content.personal.fields.email.placeholder}
                required
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
                className="border border-gray-300 p-2 rounded-full bg-gray-100"
                placeholder={content.personal.fields.phone.placeholder}
                required
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
          <p className="text-gray-600 pb-2">{content.availability.daysLabel}</p>
          <div className="flex gap-4">
            {content.availability.days.map((day) => (
              <label key={day.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="days"
                  value={day.value}
                  className="mr-2"
                />
                {day.label}
              </label>
            ))}
          </div>
          <div className="mt-4 mb-8">
            <p className="text-gray-600 pb-2">
              {content.availability.preferredLabel}
            </p>
            <select
              name="preferredTime"
              className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-xs"
            >
              {content.availability.preferredOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
          <div className="grid md:grid-cols-2">
            {content.interests.items.map((area) => (
              <label key={area.value} className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="areas"
                  value={area.value}
                  className="mr-2"
                />
                {area.label}
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
              name="textVolunteer"
              id="textVolunteer"
              rows={4}
              className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full h-32 mt-2"
              placeholder={content.experience.placeholders.motivation}
            ></textarea>
          </div>
          <div>
            <p className="text-black">{content.experience.questions.skills}</p>
            <textarea
              name="specialSkills"
              id="specialSkills"
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
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder={content.emergency.placeholders.name}
              />
            </div>
            <div className="ml-8">
              <label htmlFor="">{content.emergency.phoneLabel}</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder={content.emergency.placeholders.phone}
              />
            </div>
          </div>
        </section>

        <hr className="my-10 text-emerald-600" />

        <section>
          <div className="flex items-center justify-center max-w-lg mx-auto gap-4">
            <input type="checkbox" className="mr-2" name="terms" />
            <p className="text-gray-400">
              {content.terms.text}{" "}
              <span className="text-emerald-600 font-bold">
                {content.terms.highlight}
              </span>
              .
            </p>
          </div>
          <button
            type="submit"
            className="mt-8 bg-emerald-500 text-black font-bold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-300 mx-auto block cursor-pointer"
          >
            {content.submitLabel}
          </button>
          <p className="text-center mt-6 text-gray-400">{content.reviewText}</p>
        </section>
      </form>
    </article>
  );
}

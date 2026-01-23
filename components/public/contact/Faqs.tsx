"use client";
import { getContactFaqsContent } from "@/lib/i18n/contact/contact-faqs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";

export default function Faqs() {
  const params = useParams<{ lang?: string }>();
  const { content } = getContactFaqsContent(params?.lang);

  return (
    <div className="mx-auto flex flex-col gap-10 rounded-3xl bg-white p-8 shadow-xl md:flex-row md:items-start md:p-12">
      <header className="md:w-1/3">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">
          {content.titleLabel}
        </p>
        <h2 className="mt-3 text-3xl font-black text-gray-900">
          {content.title}
        </h2>
        <p className="mt-4 text-gray-700">{content.subtitle}</p>
      </header>
      <div className="flex-1 divide-y divide-gray-200">
        {content.faqs.map((faq, index) => (
          <Disclosure
            as="div"
            key={faq.question}
            className="py-5"
            defaultOpen={index === 0}
          >
            {({ open }) => (
              <>
                <DisclosureButton className="group flex w-full items-center justify-between text-left">
                  <span className="text-base font-semibold text-gray-900 group-data-hover:text-emerald-800">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`size-5 text-emerald-600 transition-transform ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-3 text-sm text-gray-700">
                  {faq.answer}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

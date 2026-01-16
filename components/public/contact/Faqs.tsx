"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const faqs = [
  {
    question: "¿Cómo puedo adoptar una mascota?",
    answer:
      "Completa el formulario de adopción desde la ficha de la mascota que te interese. Nuestro equipo revisará tu solicitud y se pondrá en contacto para los siguientes pasos.",
  },
  {
    question: "¿Aceptan donaciones en especie?",
    answer:
      "Sí. Además de aportes monetarios, recibimos alimento, medicamentos y artículos de higiene. Puedes coordinar la entrega a través del formulario de contacto.",
  },
  {
    question: "¿Puedo convertirme en voluntario?",
    answer:
      "Claro. Visita la sección de voluntariado y envía tu solicitud para participar en rescates, eventos o tareas de socialización.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer:
      "Actualmente operamos en Ciudad, País. Las visitas se programan con cita para asegurar que cada animal reciba la atención adecuada.",
  },
];

export default function Faqs() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="mx-auto flex flex-col gap-10 rounded-3xl bg-white p-8 shadow-xl md:flex-row md:items-start md:p-12">
        <header className="md:w-1/3">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-500">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl font-black text-gray-900">
            Todo lo que necesitas saber
          </h2>
          <p className="mt-4 text-gray-700">
            Si no encuentras la respuesta, escríbenos desde el formulario de
            contacto y te ayudaremos cuanto antes.
          </p>
        </header>
        <div className="flex-1 divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <Disclosure
              as="div"
              key={faq.question}
              className="py-5"
              defaultOpen={index === 0}
            >
              {({ open }) => (
                <>
                  <DisclosureButton className="group flex w-full items-center justify-between text-left">
                    <span className="text-base font-semibold text-gray-900 group-data-hover:text-emerald-600">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`size-5 text-emerald-500 transition-transform ${
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
    </section>
  );
}

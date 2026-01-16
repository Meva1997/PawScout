import React from "react";

type Step = {
  icon: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: "🔍",
    title: "Busca animales",
    description:
      "Explora perfiles detallados de mascotas disponibles para adopción. Filtra por raza, tamaño, edad y más.",
  },
  {
    icon: "📁",
    title: "Envía solicitud",
    description:
      "Completa un formulario para ayudarnos a entender tu estilo de vida y el ambiente en casa para asegurarnos de que eres el hogar adecuado para la mascota.",
  },
  {
    icon: "🤝",
    title: "Conoce a la mascota",
    description:
      "Agenda una visita para conocer a la mascota en persona. Pasa tiempo de calidad con ella para asegurarnos de que es el hogar adecuado para ambos.",
  },
];

export default function HowWorks() {
  return (
    <>
      <section className="bg-white px-4 py-14 max-w-6xl mx-auto my-20 rounded-3xl shadow-xl">
        <article className="mb-10 max-w-6xl mx-auto">
          <h3 className="text-3xl font-black text-black">¿Cómo funciona?</h3>
          <p className="text-gray-700 my-2 max-w-3xl">
            Nuestro proceso de adopción esta diseñado para ser simple,
            transparente y enfocado en encontrar el hogar perfecto para cada
            mascota.
          </p>
        </article>
        <article className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="flex grow">
              <div className="bg-gray-100 rounded-xl space-y-2 p-6 shadow-md">
                <p>{step.icon}</p>
                <p className="text-black font-bold text-xl ">{step.title}</p>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}

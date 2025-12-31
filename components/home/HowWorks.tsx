import React from "react";

export default function HowWorks() {
  return (
    <>
      <section className="bg-gray-100 px-4 py-14">
        <article className="mb-10 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-black">¿Cómo funciona?</h3>
          <p className="text-gray-500 my-2 max-w-3xl">
            Nuestro proceso de adopción esta diseñado para ser simple,
            transparente y enfocado en encontrar el hogar perfecto para cada
            mascota.
          </p>
        </article>
        <article className="grid grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          <div className="bg-white rounded-xl space-y-2 p-6 shadow-md">
            <p>🔍</p>
            <p className="text-black font-bold text-xl ">Busca animales</p>
            <p className="text-gray-500">
              Explora perfiles detallados de mascotas disponibles para adopción.
              Filtra por raza, tamaño, edad y más.
            </p>
          </div>
          <div className="bg-white rounded-xl space-y-2 p-6 shadow-md">
            <p>📁</p>
            <p className="text-black font-bold text-xl ">Envía solicitud</p>
            <p className="text-gray-500">
              Completa un formulario para ayudarnos a entender tu estilo de vida
              y el ambiente en casa para asegurarnos de que eres el hogar
              adecuado para la mascota. Usualmente tardamos 48 hrs en responder.
            </p>
          </div>
          <div className="bg-white rounded-xl space-y-2 p-6 shadow-md">
            <p>🤝</p>
            <p className="text-black font-bold text-xl ">Conoce a la mascota</p>
            <p className="text-gray-500">
              Agenda una visita para conocer a la mascota en persona. Pasa
              tiempo de calidad con ella para asegurarnos de que es el hogar
              adecuado para ambos.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

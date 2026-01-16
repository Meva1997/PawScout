"use client";

import Link from "next/link";

export default function HomeFooter() {
  return (
    <>
      <footer>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 mb-10 px-8 gap-8 max-w-6xl mx-auto">
          <article>
            <h2 className="font-bold text-black text-xl">🐾 PawScout</h2>
            <p className="text-gray-700 mt-4 max-w-xs text-sm">
              Conectando mascotas con hogares amorosos. Organizacion sin fines
              de lucro dedicada a rescatar y encontrar hogares para mascotas
              necesitadas.
            </p>
          </article>
          <article className="space-y-4 flex flex-col ">
            <h2 className="font-bold text-black text-xl">Adopta</h2>
            <Link
              href="/adopt"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              Busca mascotas
            </Link>
            <Link
              href="/"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              Como adoptar
            </Link>
          </article>
          <article className="space-y-4 flex flex-col ">
            <h2 className="font-bold text-black text-xl">Apoyanos</h2>
            <Link
              href="/donate"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              Donaciones
            </Link>
            <Link
              href="/volunteer"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
            >
              Voluntariado
            </Link>
          </article>
          <article className="space-y-4 flex flex-col">
            <h2 className="font-bold text-black text-xl">Contacto</h2>
            <p className="text-gray-700 text-sm">mevadev97@gmail.com</p>
            <p className="text-gray-700 text-sm"> +1 (956) 502-7164</p>
            <a
              href="https://github.com/Meva1997"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub: https://github.com/Meva1997
            </a>
            <a
              href="https://www.linkedin.com/in/alex-fullstack-developer/"
              className="text-gray-700 text-sm hover:underline hover:text-emerald-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin: https://www.linkedin.com/in/alex-fullstack-developer/
            </a>
          </article>
        </section>
        <hr className="max-w-6xl mx-auto my-10" />
        <section className="py-6 px-8 text-center text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} PawScout. Todos los derechos
          reservados.
        </section>
        <section className="bg-gray-50 px-8 py-6 text-gray-700 text-sm max-w-6xl mx-auto my-10 rounded-3xl shadow-xl">
          <h3 className="font-semibold text-black mb-2">Aviso legal</h3>
          <p>
            Las imágenes mostradas en este sitio han sido generadas con
            tecnologías de inteligencia artificial con fines de demostración y
            prototipado. Algunos perfiles o descripciones pueden ser ficticios o
            simplificados y no representan animales reales disponibles para
            adopción.
          </p>
          <p className="mt-2">
            PawScout es actualmente un proyecto personal y no una organización
            oficial. Para consultas o reportes, contacta a
            <a
              href="mailto:mevadev97@gmail.com"
              className="text-emerald-600 underline"
            >
              {" "}
              mevadev97@gmail.com
            </a>
            .
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Si utilizas el contenido de este sitio, hazlo bajo tu propia
            responsabilidad. Estamos abiertos a corregir cualquier información
            incorrecta; por favor contáctanos.
          </p>
        </section>
      </footer>
    </>
  );
}

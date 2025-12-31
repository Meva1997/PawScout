"use client";
export default function HomeFooter() {
  return (
    <>
      <footer>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 mb-10 px-8 gap-8 max-w-6xl mx-auto">
          <article>
            <h2 className="font-bold text-black text-xl">🐾 PawScout</h2>
            <p className="text-gray-500 mt-4 max-w-xs text-sm">
              Conectando mascotas con hogares amorosos. Organizacion sin fines
              de lucro dedicada a rescatar y encontrar hogares para mascotas
              necesitadas.
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="font-bold text-black text-xl">Adopta</h2>
            <p className="text-gray-500 text-sm">Busca mascotas</p>
            <p className="text-gray-500 text-sm">Como adoptar</p>
            <p className="text-gray-500 text-sm">Costos de adopción</p>
            <p className="text-gray-500 text-sm">Preguntas frecuentes</p>
          </article>
          <article className="space-y-4">
            <h2 className="font-bold text-black text-xl">Apoyanos</h2>
            <p className="text-gray-500 text-sm">Donaciones</p>
            <p className="text-gray-500 text-sm">Voluntariado</p>
            <p className="text-gray-500 text-sm">Programa de adopción</p>
            <p className="text-gray-500 text-sm">Eventos</p>
          </article>
          <article className="space-y-4">
            <h2 className="font-bold text-black text-xl">Contacto</h2>
            <p className="text-gray-500 text-sm">mevadev97@gmail.com</p>
            <p className="text-gray-500 text-sm"> +1 (956) 502-7164</p>
            <p className="text-gray-500 text-sm">
              GitHub: https://github.com/Meva1997
            </p>
            <p className="text-gray-500 text-sm">
              Linkedin: https://www.linkedin.com/in/alex-fullstack-developer/
            </p>
          </article>
        </section>
        <hr />
        <section className="py-6 px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PawScout. Todos los derechos
          reservados.
        </section>
      </footer>
    </>
  );
}

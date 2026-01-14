import VolunteerForm from "@/components/volunteer/VolunteerForm";

export default function page() {
  return (
    <main className="bg-gray-100 pb-30 pt-10">
      <article className=" flex flex-col justify-center items-center gap-4 p-8">
        <div className="bg-emerald-300 rounded-full px-2 mb-4">
          <p className="text-black font-bold text-sm">
            Formulario para voluntariado
          </p>
        </div>
        <h1 className="font-black text-4xl">
          Conviertete en{" "}
          <span className="text-emerald-400 uppercase">héroe</span> para los
          animales
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-center">
          Unete a nuestro equipo de voluntarios y ayuda a marcar la diferencia
          en la vida de los animales necesitados. Completa el formulario para
          comenzar tu viaje como voluntario.
        </p>
      </article>

      <VolunteerForm />
    </main>
  );
}

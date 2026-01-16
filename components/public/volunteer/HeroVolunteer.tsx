import Image from "next/image";
import Link from "next/link";

export default function HeroVolunteer() {
  return (
    <>
      <article className="grid md:grid-cols-2 max-w-6xl justify-center items-center mx-auto gap-10">
        <section className="flex flex-col justify-center items-start p-8 my-10">
          <h1 className="font-black text-4xl">
            Haz la diferencia,
            <span className="text-emerald-600 text-5xl underline decoration-amber-600">
              {" "}
              ayuda a cambiar vidas.
            </span>
          </h1>
          <p>
            Unete a nuestra comunidad de voluntarios y marca la diferencia hoy
            mismo.
          </p>
          <Link
            href="/volunteer/form"
            className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-all font-bold cursor-pointer"
          >
            Quiero ser voluntario
          </Link>
        </section>
        <section className="flex justify-center items-center md:mr-10 ">
          <Image
            src="/volunteer-pawscout.png"
            alt="Voluntariado"
            width={400}
            height={200}
            className="md:w-120 h-auto rounded-xl rotate-3"
          />
        </section>
      </article>
      <article className="mt-10 max-w-6xl mx-auto">
        <section className="grid md:grid-cols-3">
          <div className="p-8 text-center">
            <h2 className="font-bold text-3xl text-emerald-600">150+</h2>
            <p className="mt-2">Voluntarios activos</p>
          </div>
          <div className="p-8 text-center">
            <h2 className="font-bold text-3xl text-emerald-600">3000+</h2>
            <p className="mt-2">Horas de servicio al mes</p>
          </div>
          <div className="p-8 text-center">
            <h2 className="font-bold text-3xl text-emerald-600">500+</h2>
            <p className="mt-2">Mascotas ayudadas</p>
          </div>
        </section>
      </article>
    </>
  );
}

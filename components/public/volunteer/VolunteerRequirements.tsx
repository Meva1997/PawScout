"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

type VolunteerComment = {
  name: string;
  comment: string;
  image: string;
};

const volunteerComments: VolunteerComment[] = [
  {
    name: "María López",
    comment:
      "Ser voluntaria en esta organización ha sido una experiencia increíble. He aprendido mucho y he conocido a personas maravillosas.",
    image: "/volunteer1.jpg",
  },
  {
    name: "Carlos Sánchez",
    comment:
      "Ayudar a los animales necesitados me llena de satisfacción. Recomiendo a todos que se unan como voluntarios.",
    image: "/volunteer2.jpg",
  },
  {
    name: "Ana Gómez",
    comment:
      "El equipo es muy acogedor y siempre están dispuestos a apoyar. Ser voluntaria aquí ha sido una de las mejores decisiones de mi vida.",
    image: "/volunteer3.jpg",
  },
];

export default function VolunteerRequirements() {
  return (
    <>
      <motion.article
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="grid md:grid-cols-2 mx-auto rounded-lg overflow-hidden shadow-lg  bg-white gap-8 md:max-w-6xl w-2/3 md:w-full">
          <div className="space-y-4 p-8 mt-10">
            <h5 className="text-xl font-bold">
              Requisitos para ser voluntario
            </h5>
            <p className="text-gray-500">
              Para ser voluntario en nuestra organización, es importante cumplir
              con ciertos requisitos que aseguren una experiencia positiva tanto
              para el voluntario como para las personas a las que ayudamos. A
              continuación, se detallan los principales requisitos:
            </p>
            <ul className="space-y-3">
              {[
                "Ser mayor de 18 años.",
                "Comprometerse a un horario regular de voluntariado.",
                "Tener pasión por el bienestar animal.",
                "Ser responsable y confiable.",
                "Capacidad para trabajar en equipo.",
                "Disposición para aprender y seguir instrucciones.",
              ].map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image
              src="/volunteer-paw.png"
              alt="Voluntarios"
              width={500}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      </motion.article>
      <article>
        <section className="grid md:grid-cols-3 max-w-6xl mx-auto my-20">
          {volunteerComments.map((volunteer, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 m-4 rounded-lg shadow-md flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.3 }}
            >
              <Image
                src={volunteer.image}
                alt={volunteer.name}
                width={100}
                height={100}
                className="mb-4 text-center"
              />
              <h5 className="text-lg font-bold mb-2">{volunteer.name}</h5>
              <p className="text-gray-600 text-center">
                &quot;{volunteer.comment}&quot;
              </p>
            </motion.div>
          ))}
        </section>
      </article>
      <motion.article
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <section className="rounded-2xl bg-emerald-500 p-8 space-y-10  md:space-y-4 flex flex-col md:flex-row md:justify-between md:items-center max-w-6xl mx-auto">
          <div>
            <h6 className="font-bold text-xl">
              ¡Únete a nuestro equipo de voluntarios!
            </h6>
            <p>La aplicación toma menos de 10 minutos. ¡Comienza ahora!</p>
          </div>
          <div>
            <Link
              href="/volunteer/form"
              className="bg-black text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all"
            >
              Aplicar para ser voluntario
            </Link>
          </div>
        </section>
      </motion.article>
    </>
  );
}

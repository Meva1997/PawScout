"use client";
import VolunteerForm from "@/components/public/volunteer/VolunteerForm";
import { motion } from "framer-motion";

export default function page() {
  return (
    <motion.main
      className="bg-gray-200 pb-30 pt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <article className=" flex flex-col justify-center items-center gap-4 p-8">
        <div className="bg-emerald-500 rounded-full px-4 py-2 mb-4">
          <p className="text-black font-bold text-sm">
            Formulario para voluntariado
          </p>
        </div>
        <h1 className="font-black text-4xl">
          Conviertete en{" "}
          <span className="text-emerald-600 uppercase">héroe</span> para los
          animales
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-center">
          Unete a nuestro equipo de voluntarios y ayuda a marcar la diferencia
          en la vida de los animales necesitados. Completa el formulario para
          comenzar tu viaje como voluntario.
        </p>
      </article>

      <VolunteerForm />
    </motion.main>
  );
}

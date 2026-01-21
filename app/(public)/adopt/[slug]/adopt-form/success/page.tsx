"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function page() {
  return (
    <main className="bg-gray-200 py-10">
      <motion.section
        className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-20"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-600 mb-2">
            ¡Formulario de adopción enviado con éxito!
          </h1>
          <p className="text-gray-600">
            Gracias por tu interés en adoptar una mascota a través de PawScout.
          </p>
        </header>
        <article className="text-gray-700 space-y-4">
          <p>
            Hemos recibido tu formulario de adopción y nuestro equipo lo está
            revisando. Nos pondremos en contacto contigo pronto para los
            siguientes pasos del proceso de adopción.
          </p>
          <p>
            Mientras tanto, si tienes alguna pregunta o necesitas más
            información, no dudes en contactarnos a través de nuestro correo
            electrónico o número de teléfono.
          </p>
          <p className="text-emerald-600 font-bold">
            ¡Gracias por ayudar a brindar un hogar amoroso a una mascota
            necesitada!
          </p>
        </article>
        <article>
          <Link
            href="/adopt"
            className="inline-block mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Regresar a la página de adopción
          </Link>
        </article>
      </motion.section>
    </main>
  );
}

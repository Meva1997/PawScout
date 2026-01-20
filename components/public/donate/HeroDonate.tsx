"use client";
import Image from "next/image";
import { ShieldCheckIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function HeroDonate() {
  return (
    <motion.article
      className="flex flex-col gap-8 justify-center items-start"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    >
      <section>
        <h1 className="font-bold text-4xl max-w-md leading-snug">
          Se un heroe para una{" "}
          <span className="text-emerald-600 font-black text-5xl decoration-orange-400 underline">
            mascota sin hogar
          </span>
        </h1>
        <p className=" mt-6 text-gray-500 max-w-md">
          Tu donación puede cambiar vidas. Desde un lugar acogedor, hasta
          cirugias que salvan vidas. Cada contribución va directo a quienes más
          lo necesitan para que cada mascota tenga una segunda oportunidad.
        </p>
      </section>
      <section>
        <Image
          src="/dog-smiling-camera.png"
          alt="Dog Hero Donate"
          width={500}
          height={300}
          className="rounded-2xl shadow-xl object-cover h-90 w-140"
          loading="eager"
        />
      </section>
      <section className="flex gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-20 rounded-full bg-emerald-100 p-2" />
          <p className="font-bold">100% seguro</p>
        </div>
        <div className="flex items-center gap-2">
          <CheckBadgeIcon className="h-20 rounded-full bg-emerald-100 p-2" />
          <p className="font-bold">Deducible de impuestos</p>
        </div>
      </section>
    </motion.article>
  );
}

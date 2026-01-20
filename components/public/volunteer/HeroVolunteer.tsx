"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";

type Benefit = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const volunteerBenefits: Benefit[] = [
  {
    title: "Recompensa emocional",
    description:
      "Siente la alegría de salvar vidas y hacer una diferencia real.",
    icon: HeartIcon,
  },
  {
    title: "Comunidad",
    description:
      "Conéctate con personas que comparten tu pasión por los animales.",
    icon: UserGroupIcon,
  },
  {
    title: "Desarrollo de habilidades",
    description:
      "Aprende nuevas habilidades y gana experiencia en el cuidado de animales.",
    icon: AcademicCapIcon,
  },
  {
    title: "Salud y bienestar",
    description:
      "Mejora tu bienestar físico y mental al dedicar tiempo a una causa significativa.",
    icon: ShieldCheckIcon,
  },
];

export default function HeroVolunteer() {
  return (
    <>
      <motion.article
        className="grid md:grid-cols-2 max-w-6xl justify-center items-center mx-auto gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
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
      </motion.article>
      <motion.article
        className="mt-10 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
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
      </motion.article>
      <motion.article
        className="grid md:grid-cols-3 max-w-6xl justify-center items-center mx-auto gap-18 bg-white p-10 rounded-lg shadow-lg my-16"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="space-y-4 col-span-1">
          <p className="font-bold text-emerald-600 text-md">Beneficios</p>
          <h3 className="text-3xl font-black">¿Por qué ser voluntario?</h3>
          <p className="text-gray-500">
            Ser voluntario en nuestra organización de rescate de mascotas no
            solo transforma vidas, sino que también enriquece la tuya. Al unirte
            a nuestro equipo de voluntarios, tendrás la oportunidad de marcar
            una diferencia tangible en la vida de animales necesitados,
            brindándoles amor, cuidado y la esperanza de un hogar para siempre.
            ¡Únete a nosotros y sé el cambio que quieres ver en el mundo animal!
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-10 col-span-2">
          {volunteerBenefits.map((benefit, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 p-4 rounded-lg bg-gray-50 shadow-md"
            >
              <benefit.icon className="h-6 w-6 text-emerald-600 mb-2" />
              <h5 className="font-bold text-lg mb-2">{benefit.title}</h5>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </section>
      </motion.article>
    </>
  );
}

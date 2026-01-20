"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import {
  CakeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  PaintBrushIcon,
} from "@heroicons/react/20/solid";

export default function Page() {
  const params = useParams();
  const { slug } = params;

  const dog: DogsDataType | undefined = dogsData.find(
    (d) => d.id === Number(slug)
  );

  const infoCards = [
    {
      label: "Edad",
      value: dog?.age,
      Icon: CakeIcon,
    },
    {
      label: "Genero",
      value: dog?.gender,
      Icon: QuestionMarkCircleIcon,
    },
    {
      label: "Tamaño",
      value: dog?.size,
      Icon: ScaleIcon,
    },
    {
      label: "Raza",
      value: dog?.breed,
      Icon: PaintBrushIcon,
    },
  ];

  return (
    <>
      <motion.main
        className="max-w-6xl mx-auto p-8 bg-gray-200 py-20 my-20 rounded-3xl shadow-xl"
        aria-labelledby="dog-info-heading"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <article className="grid md:grid-cols-2 gap-6">
          <figure className="flex flex-col">
            <Link
              href="/adopt"
              className="text-emerald-600 font-bold mb-2 hover:text-emerald-800"
            >
              &larr; Regresar a la lista de adopción
            </Link>
            <Image
              src={dog?.imageUrl || "/placeholder-dog.png"}
              alt={dog?.name || "Dog Image"}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="sr-only">
              Galería de imágenes del perro seleccionado
            </figcaption>
          </figure>
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <header id="dog-info-heading">
              <h1 className="text-3xl font-bold mb-4">{dog?.name}</h1>
              <p className="text-gray-400">
                {dog?.breed} Id: {dog?.id}
              </p>
            </header>
            <div className="py-6">
              <dl className="flex space-x-2 gap-4 flex-wrap font-bold text-sm">
                <div
                  className={`${
                    dog?.attributes.goodWithKids
                      ? "bg-emerald-500"
                      : "bg-red-400"
                  } px-2 py-1 rounded-lg`}
                >
                  <dt className="sr-only">Bueno con niños</dt>
                  <dd>
                    Bueno con niños:{" "}
                    {dog?.attributes.goodWithKids ? "Sí" : "No"}
                  </dd>
                </div>
                <div
                  className={`${
                    dog?.attributes.goodWithDogs
                      ? "bg-emerald-500"
                      : "bg-red-400"
                  } px-2 py-1 rounded-lg`}
                >
                  <dt className="sr-only">Bueno con perros</dt>
                  <dd>
                    Bueno con perros:{" "}
                    {dog?.attributes.goodWithDogs ? "Sí" : "No"}
                  </dd>
                </div>
                <div
                  className={`${
                    dog?.attributes.houseTrained
                      ? "bg-emerald-500"
                      : "bg-red-400"
                  } px-2 py-1 rounded-lg`}
                >
                  <dt className="sr-only">Entrenado en casa</dt>
                  <dd>
                    Entrenado en casa:{" "}
                    {dog?.attributes.houseTrained ? "Sí" : "No"}
                  </dd>
                </div>
              </dl>
            </div>
            <section
              className="grid grid-cols-2 gap-4"
              aria-labelledby="dog-details-heading"
            >
              <h2 id="dog-details-heading" className="sr-only">
                Detalles clave del animal
              </h2>
              {infoCards.map(({ label, value, Icon }) => (
                <div key={label} className="bg-white p-4 rounded-lg mb-4">
                  <dl>
                    <div className="flex items-center mb-2">
                      <Icon className="h-6 w-6 inline-block mr-2 text-emerald-500" />
                      <dt>{label}</dt>
                    </div>
                    <dd className="font-bold text-black">{value}</dd>
                  </dl>
                </div>
              ))}
            </section>
            <section className="bg-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sobre {dog?.name} ✨</h2>
              <p className="text-gray-700 leading-relaxed">
                {dog?.longDescription}
              </p>
            </section>
            <section className="mt-6 bg-emerald-500 p-4 rounded-lg text-center font-black hover:bg-emerald-700 transition-colors cursor-pointer">
              <Link
                href={`/adopt/${dog?.id}/adopt-form`}
                role="button"
                aria-label={`Aplicar para adoptar a ${dog?.name}`}
              >
                Aplica para adoptar -&gt;{" "}
              </Link>
            </section>
          </motion.div>
        </article>
      </motion.main>
      <motion.hr
        className="text-emerald-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
    </>
  );
}

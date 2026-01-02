"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import FormAdopt from "./FormAdopt";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";

export default function ApplyHeader() {
  const params = useParams();
  const { slug } = params;

  const dog: DogsDataType | undefined = dogsData.find(
    (d) => d.id === Number(slug)
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-100 py-30 grid md:grid-cols-3 gap-6">
      <article className="md:col-span-2">
        <header className="pb-10">
          <h1 className="text-3xl font-bold mb-4">Formulario de Adopción</h1>
          <p className="text-gray-600">
            Completa el siguiente formulario para iniciar el proceso de
            adopción. Nos pondremos en contacto contigo pronto.
          </p>
        </header>
        <FormAdopt slug={Number(slug)} />
      </article>

      {/* Dog information */}
      <article className="flex flex-col items-center md:col-span-1 px-4">
        <section className="overflow-hidden rounded-t-lg">
          {dog?.imageUrl ? (
            <Image
              src={dog.imageUrl}
              alt={dog?.name ?? "Imagen de perro"}
              width={300}
              height={300}
              className="w-100 h-55 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-100 h-55 bg-gray-200 flex items-center justify-center text-gray-500">
              Sin imagen
            </div>
          )}
        </section>
        <section className="bg-white p-4 rounded-b-lg w-auto">
          <p className="text-emerald-400 font-medium">Aplicando para:</p>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mt-4 mb-2">{dog?.name}</h2>
            <p
              className={`font-medium ${
                dog?.gender === "Macho" ? "text-blue-500" : "text-pink-500"
              }`}
            >
              {dog?.gender}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-600 mb-4">{dog?.breed}</p>
            <span>-</span>
            <p className="text-gray-600 mb-4">{dog?.age}</p>
          </div>

          <div className="flex text-xs flex-wrap items-center gap-2 text-black font-bold">
            <div
              className={`${
                dog?.attributes.goodWithKids ? "bg-emerald-400" : "bg-red-400"
              } px-2 py-1 rounded-lg`}
            >
              <dt className="sr-only">Bueno con niños</dt>
              <dd>
                Bueno con niños: {dog?.attributes.goodWithKids ? "Sí" : "No"}
              </dd>
            </div>
            <div
              className={`${
                dog?.attributes.goodWithDogs ? "bg-emerald-400" : "bg-red-400"
              } px-2 py-1 rounded-lg`}
            >
              <dt className="sr-only">Bueno con perros</dt>
              <dd>
                Bueno con perros: {dog?.attributes.goodWithDogs ? "Sí" : "No"}
              </dd>
            </div>
            <div
              className={`${
                dog?.attributes.houseTrained ? "bg-emerald-400" : "bg-red-400"
              } px-2 py-1 rounded-lg`}
            >
              <dt className="sr-only">Entrenado en casa</dt>
              <dd>
                Entrenado en casa: {dog?.attributes.houseTrained ? "Sí" : "No"}
              </dd>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import { dogsData } from "@/db/dogs";
import type { DogsDataType } from "@/db/dogs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const { slug } = params;

  const dog: DogsDataType | undefined = dogsData.find(
    (d) => d.id === Number(slug)
  );

  return (
    <>
      <section className="max-w-6xl mx-auto p-8 bg-gray-100 py-30">
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
            <aside>
              <p>Carousel images</p>
            </aside>
          </figure>
          <div className="flex flex-col">
            <header>
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
                      ? "bg-emerald-400"
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
                      ? "bg-emerald-400"
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
                      ? "bg-emerald-400"
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
            <div className="grid grid-cols-2 gap-4">
              <div className=" bg-white p-4 rounded-lg mb-4">
                <span>Edad</span>
                <p className="font-bold text-black">{dog?.age}</p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <span>Genero</span>
                <p className="font-bold text-black">{dog?.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg mb-4">
                <span>Tamaño</span>
                <p className="font-bold text-black">{dog?.size}</p>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <span>Raza</span>
                <p className="font-bold text-black">{dog?.breed}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sobre {dog?.name} ✨</h2>
              <p className="text-gray-700 leading-relaxed">
                {dog?.longDescription}
              </p>
            </div>
            <div className="mt-6 bg-emerald-400 p-4 rounded-lg text-center font-black hover:bg-emerald-600 transition-colors cursor-pointer">
              <Link href={`/adopt/${dog?.id}/adopt-form`}>
                Aplica para adoptar -&gt;{" "}
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

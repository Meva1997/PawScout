import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <section className="bg-gray-100 ">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto gap-8 py-16 px-4">
          <article className="mx-auto">
            <div className="rounded-xl px-2 border border-emerald-400 bg-gray-200/20 inline-block mb-4">
              <p className="text-sm text-emerald-400 font-black">
                Mas de 50 criaturas añadidas esta semana
              </p>
            </div>
            <h2 className="text-4xl font-black leading-tight max-w-md">
              Encuentra a tu nuevo{" "}
              <span className="font-black text-6xl text-emerald-400">
                mejor amigo
              </span>{" "}
              hoy
            </h2>
            <p className="text-gray-500 mt-6 max-w-md">
              En PawScout, conectamos mascotas adorables con hogares amorosos.
              Explora perfiles detallados, fotos encantadoras y encuentra la
              compañía perfecta para ti.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/adopt"
                className="bg-emerald-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all cursor-pointer"
              >
                Explorar Mascotas
              </Link>
              <Link
                href="#"
                className="bg-gray-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all cursor-pointer"
              >
                Inicia Sesión
              </Link>
            </div>
          </article>
          <article className="relative mx-auto">
            <Image
              src="/dog-smiling-camera.png"
              alt="Descripción de la imagen"
              width={500}
              height={200}
              className="rounded-2xl shadow-xl object-cover h-90 w-140"
              loading="eager"
            />
            <div className="absolute bottom-2 left-4 bg-white text-black px-3 py-2 rounded-md text-sm font-semibold">
              <p className="font-bold text-lg">Conoce a Max</p>
              <p className="text-gray-400">Un amigo leal buscando un hogar</p>
            </div>
          </article>
        </div>
      </section>
      <section>
        <article className="md:flex grid grid-cols-2 gap-6 md:gap-0 justify-evenly max-w-6xl mx-auto py-12 px-4 text-center text-gray-600">
          <div>
            <p className="font-bold text-emerald-400 text-2xl">1,240</p>
            <p>Perros Adoptados</p>
          </div>
          <div>
            <p className="font-bold text-emerald-400 text-2xl">350+</p>
            <p>Voluntarios</p>
          </div>
          <div>
            <p className="font-bold text-emerald-400 text-2xl">12</p>
            <p>Refugios Asociados</p>
          </div>
          <div>
            <p className="font-bold text-emerald-400 text-2xl">100%</p>
            <p>Animales Sanos</p>
          </div>
        </article>
      </section>
    </>
  );
}

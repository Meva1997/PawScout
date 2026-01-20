"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import WaitingHomeDogCards from "@/components/ui/WaitingHomeDogCards";

type Item = {
  src: string;
  name: string;
  subtitle: string;
  breed: string;
  age: string;
};

const defaultDogs: Item[] = [
  {
    src: "/waiting-home-dog.png",
    name: "Bailey",
    subtitle: "Rescatado hace 2 semanas",
    breed: "Beagle",
    age: "3 años",
  },
  {
    src: "/waiting-home-dog.png",
    name: "Luna",
    subtitle: "Rescatada hace 1 mes",
    breed: "Labrador",
    age: "2 años",
  },
  {
    src: "/waiting-home-dog.png",
    name: "Max",
    subtitle: "Rescatado hace 3 semanas",
    breed: "Pastor Alemán",
    age: "4 años",
  },
  {
    src: "/waiting-home-dog.png",
    name: "Coco",
    subtitle: "Rescatado hace 2 días",
    breed: "Bulldog Francés",
    age: "1 año",
  },
];

export default function NewArrivals() {
  return (
    <motion.section
      className="py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <article>
        <h4 className="text-3xl font-black text-black">Esperando un hogar</h4>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between">
          <p className="text-gray-700 mt-2">
            Descubre las nuevas mascotas que buscan un hogar amoroso.
          </p>
          <Link
            href="/adopt"
            className="font-bold text-emerald-600 hover:text-emerald-700"
          >
            Ver más →
          </Link>
        </div>
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto justify-evenly gap-10 lg:gap-6 my-10">
        {defaultDogs.map((dog) => (
          <WaitingHomeDogCards
            key={dog.name}
            src={dog.src}
            name={dog.name}
            subtitle={dog.subtitle}
            breed={dog.breed}
            age={dog.age}
          />
        ))}
      </article>
    </motion.section>
  );
}

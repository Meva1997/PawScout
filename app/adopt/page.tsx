import AdoptCards from "@/components/ui/AdoptCards";

export default function page() {
  return (
    <main className="bg-gray-100 py-10">
      <section className="py-16 px-4 max-w-6xl mx-auto bg-white rounded-3xl my-20 shadow-xl">
        <h1 className="font-black text-4xl">
          Encuentra tu mascota ideal para adoptar
        </h1>
        <p className="pt-2 text-gray-500">
          Explora nuestra amplia selección de mascotas disponibles para adopción
          y encuentra el compañero perfecto para ti.
        </p>
      </section>
      <AdoptCards />
    </main>
  );
}

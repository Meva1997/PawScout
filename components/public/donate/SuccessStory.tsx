import Image from "next/image";

export default function SuccessStory() {
  return (
    <>
      <article className="grid md:grid-cols-2 bg-white max-w-6xl mx-auto my-20 shadow-lg rounded-lg overflow-hidden p-10 gap-10 items-center">
        <section>
          <p className="text-orange-500 pb-2 font-medium">Historia de éxito</p>
          <h4 className="font-bold text-xl">&quot;La historia de Luna&quot;</h4>
          <p className="text-gray-500 font-medium my-4">
            Luna llegó a nosotros en un estado crítico, desnutrida y asustada.
            Gracias a las generosas donaciones de personas como tú, pudimos
            brindarle la atención médica que necesitaba. Hoy, Luna es una perra
            feliz y saludable, lista para encontrar su hogar para siempre. Tu
            apoyo hace la diferencia en vidas como la de Luna.
          </p>
          <p className="font-bold mt-6">- El equipo de PawScout</p>
        </section>
        <section>
          <Image
            src="/dog-smiling-camera.png"
            alt="Luna's Success Story"
            width={500}
            height={300}
            className="w-full h-auto rounded-xl mb-4 rotate-4"
          />
        </section>
      </article>
    </>
  );
}

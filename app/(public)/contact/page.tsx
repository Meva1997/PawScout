import ContactForm from "@/components/public/contact/ContactForm";
import Faqs from "@/components/public/contact/Faqs";

type MisionType = {
  title: string;
  description: string;
};

const mision: MisionType[] = [
  {
    title: "Compasion",
    description:
      "Nos dedicamos a tratar a cada animal con el amor y respeto que merecen, asegurando su bienestar en cada paso del camino.",
  },
  {
    title: "Integridad",
    description:
      "Operamos con transparencia y honestidad, construyendo confianza con nuestra comunidad y asegurando que cada adopción sea ética y responsable.",
  },
  {
    title: "Comunidad",
    description:
      "Creemos en el poder de la comunidad para hacer una diferencia positiva en la vida de los animales, fomentando la colaboración y el apoyo mutuo.",
  },
];

export default function page() {
  return (
    <main className="bg-gray-100 py-10">
      <article className="max-w-6xl mx-auto pt-16 space-y-4 px-4">
        <h1 className="text-3xl font-black">Contactanos</h1>
        <p className="text-gray-500">
          Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes
          en contactarnos. Estamos aquí para ayudarte y asegurarnos de que
          tengas la mejor experiencia posible con PawScout.
        </p>
      </article>
      <article className="grid lg:grid-cols-3 my-20 gap-6 w-3/4 max-w-6xl mx-auto">
        <section className="md:col-span-1 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Información de Contacto
          </h2>
          <p className="mb-2">
            <strong>Dirección:</strong> 123 Calle Principal, Ciudad, País
          </p>
          <p className="mb-2">
            <strong>Teléfono:</strong> +1 (555) 123-4567
          </p>
        </section>
        <section className="md:col-span-1 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Correo electronico</h2>
          <p className="mb-2">
            <strong>Email:</strong> contacto@pawscout.com
          </p>
        </section>
        <section className="md:col-span-1 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
          <p className="mb-2">Visita el refugio</p>
          <p className="mb-2">123 Calle Principal</p>
          <p className="mb-2">Ciudad, País</p>
        </section>
      </article>
      <article className="flex flex-col md:flex-row py-20 max-w-6xl mx-auto p-6 gap-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019123456789!2d-122.419415484681!3d37.77492977975959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b5b5b5b%3A0x5e5e5e5e5e5e5e5e!2s123%20Calle%20Principal%2C%20Ciudad%2C%20Pa%C3%ADs!5e0!3m2!1ses!2sus!4v1610000000000!5m2!1ses!2sus"
          width="100%"
          height="570"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-md mx-auto"
        ></iframe>

        <ContactForm />
      </article>
      <article className="px-6">
        <section className="bg-white max-w-6xl mx-auto rounded-xl p-6 my-10 shadow-xl ">
          <h4 className="font-black text-2xl pb-4">Nuestra misión</h4>
          <p className="text-gray-500">
            En PawScout, nuestra misión es conectar a los animales necesitados
            con personas que puedan brindarles un hogar amoroso y seguro.
            Trabajamos incansablemente para rescatar, rehabilitar y encontrar
            familias responsables para cada uno de nuestros amigos peludos.
          </p>
          <div className="grid md:grid-cols-3 pt-6">
            {mision.map((item) => (
              <div key={item.title} className="p-6 bg-gray-100 rounded-lg m-2">
                <h5 className="font-bold mb-2">{item.title}</h5>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
      <article className="max-w-6xl mx-auto my-10">
        <Faqs />
      </article>
    </main>
  );
}

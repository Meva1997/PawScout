type Testimonial = {
  comment: string;
  name: string;
  adopted: string;
};

const testimonials: Testimonial[] = [
  {
    comment:
      "Adoptar a Max fue la mejor decisión que he tomado. Gracias a esta plataforma, encontré a mi compañero perfecto.",
    name: "Laura G.",
    adopted: "Max, el Labrador",
  },
  {
    comment:
      "Nunca pensé que adoptar sería tan fácil y gratificante. Ahora tengo a Bella, y no podría estar más feliz.",
    name: "Carlos M.",
    adopted: "Bella, la Beagle",
  },
  {
    comment:
      "Gracias a esta plataforma, pude darle un hogar a Rocky. Es un miembro más de la familia ahora.",
    name: "Ana S.",
    adopted: "Rocky, el Bulldog",
  },
];

export default function Testimonials() {
  return (
    <>
      <section className="bg-white max-w-6xl mx-auto p-6 my-20 text-center rounded-3xl shadow-xl">
        <article>
          <h5 className="text-3xl font-black">Nuestros Testimonios</h5>
          <p className="text-gray-500 py-4">
            Historias de personas que han encontrado un nuevo amigo peludo a
            través de nuestra plataforma.
          </p>
        </article>
        <article>
          <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between"
              >
                <p className="text-black mb-4">
                  &quot;{testimonial.comment}&quot;
                </p>
                <div className="mt-4">
                  <h6 className="font-semibold">-{testimonial.name}</h6>
                  <span className="text-sm text-gray-500">
                    Adoptó a {testimonial.adopted}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}

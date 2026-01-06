import Link from "next/link";

type FormAdoptProps = {
  slug: number;
};

export default function FormAdopt({ slug }: FormAdoptProps) {
  return (
    <section className="bg-white p-6 rounded-lg">
      <h2 className="font-bold text-2xl py-8">Información Personal</h2>

      <form action="" className="space-y-4">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">Primer Nombre</p>
            <input type="hidden" name="slug" value={slug} />
            <input
              type="text"
              inputMode="text"
              name="firstname"
              placeholder="María"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">Apellidos</p>
            <input
              type="text"
              inputMode="text"
              name="lastname"
              placeholder="González"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-8">
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              Correo Electrónico
            </p>
            <input
              type="email"
              inputMode="email"
              name="email"
              placeholder="maria@example.com"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">Teléfono</p>
            <input
              type="text"
              inputMode="text"
              name="phone"
              placeholder="(123) 456-7890"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section>
          <div className="mb-4">
            <p className="font-semibold pb-2 text-gray-600">
              Dirección Completa
            </p>
            <input
              type="text"
              inputMode="text"
              name="address"
              placeholder="Calle Falsa 123"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <section className="grid md:grid-cols-3 gap-8 mb-4">
          <div>
            <p>Ciudad</p>
            <input
              type="text"
              inputMode="text"
              name="city"
              placeholder="Ciudad"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p>Estado/Provincia</p>
            <input
              type="text"
              inputMode="text"
              name="state"
              placeholder="Estado/Provincia"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <p>Código Postal</p>
            <input
              type="text"
              inputMode="numeric"
              name="postalCode"
              placeholder="Código Postal"
              className="border border-gray-500 rounded-lg p-2 w-full"
            />
          </div>
        </section>
        <hr className="border border-emerald-400 my-4" />
        <section className="my-6 space-y-4">
          <h3 className="text-2xl font-bold">Información del Hogar</h3>
          <p className="text-gray-600 font-semibold">Tipo de vivienda</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="text-gray-600 font-semibold">
              <input type="radio" name="housingType" value="house" /> Casa
            </div>
            <div className="text-gray-600 font-semibold">
              <input type="radio" name="housingType" value="apartment" />{" "}
              Apartamento
            </div>
          </div>
          <p className="text-gray-600 font-semibold">
            Quienes residen en el hogar?
          </p>
          <textarea
            name="householdMembers"
            rows={4}
            className="border border-gray-500 rounded-lg p-2 w-full"
            placeholder="Porfavor agregue una lista de adultos (Mayores de 18 años), niños (con edades) y el ambiente familiar"
          />
        </section>
        <section className="pt-10">
          <div className="flex items-center gap-4 ">
            <input type="checkbox" />
            <p>
              Acepto los términos y condiciones. Estoy de acuerdo en que los
              datos proporcionados serán utilizados conforme a la política de
              privacidad.
            </p>
          </div>
          {/* TODO: Implement form submission logic. Change Link to button and handle form submission */}
          <div className="mt-10">
            <Link
              href={`/adopt/${slug}/adopt-form/success`}
              className="mt-6 bg-emerald-400 p-4 rounded-lg text-center font-black hover:bg-emerald-600 transition-colors cursor-pointer w-full  "
            >
              Enviar Solicitud de Adopción
            </Link>
          </div>
        </section>
      </form>
    </section>
  );
}

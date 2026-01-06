export default function MoneyInfo() {
  return (
    <>
      <article className="max-w-6xl mx-auto p-8 rounded-lg shadow-md bg-white my-20">
        <section className="text-center mb-10">
          <h3 className="text-3xl font-bold">Que se hace con tu donación</h3>
          <p className="text-gray-500 pt-2 max-w-2xl mx-auto">
            Creemos en la transparencia y en el impacto positivo que cada
            contribución puede generar en la vida de las mascotas que ayudamos.
          </p>
        </section>
        <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto p-8">
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p className="text-center py-2">🏥</p>
            <p className="text-center font-bold text-2xl">45%</p>
            <h4 className="font-bold text-lg mb-4">Atención Veterinaria</h4>
            <p className="text-gray-500">
              Costos de vacunas, tratamientos médicos y cirugías necesarias para
              la salud y bienestar de las mascotas rescatadas.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p className="text-center py-2">🍲</p>
            <p className="text-center font-bold text-2xl">30%</p>
            <h4 className="font-bold text-lg mb-4">Alimentación y Cuidado</h4>
            <p className="text-gray-500">
              Alimentos nutritivos, refugio y cuidados diarios a las mascotas
              mientras esperan ser adoptadas.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p className="text-center py-2">🏠</p>
            <p className="text-center font-bold text-2xl">25%</p>
            <h4 className="font-bold text-lg mb-4">Programas de Adopción</h4>
            <p className="text-gray-500">
              Ccampañas de adopción y eventos que conectan a las mascotas con
              sus futuros hogares amorosos.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

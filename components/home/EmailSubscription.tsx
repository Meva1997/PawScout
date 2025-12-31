export default function EmailSubscription() {
  return (
    <>
      <section className="bg-emerald-400 py-16 max-w-6xl mx-auto">
        <article className="text-center px-4">
          <h6 className="text-3xl font-black text-black mb-4">
            Suscribete a nuestro boletin de noticias
          </h6>
          <p className="text-black text-md max-w-3xl mx-auto">
            Suscribete para recibir nuestras novedades, mascotas recien
            rescatadas, historias y proximos eventos. Prometemos no enviar spam!
          </p>
        </article>
        <article>
          <form className="mt-8 flex flex-col md:flex-row justify-center max-w-md mx-auto gap-6">
            <input
              type="email"
              inputMode="email"
              placeholder="Ingresa tu correo electronico"
              className=" w-2/3 mx-auto md:w-full px-4 py-2 rounded-md focus:outline-none bg-white text-center"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer w-1/3 mx-auto md:w-full"
            >
              Suscribirse
            </button>
          </form>
        </article>
      </section>
    </>
  );
}

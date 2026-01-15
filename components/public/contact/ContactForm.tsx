export default function ContactForm() {
  return (
    <>
      <form action="" className="bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="font-bold text-xl">Envianos un mensaje</h3>
        <p className="text-gray-500">Usualmente respondemos en 24 horas</p>
        <div className="flex pt-4">
          <div className="flex-1 mr-2">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none"
              placeholder="Juan"
            />
          </div>
          <div className="flex-1 ml-2">
            <label htmlFor="email">Correo electronico</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none"
              placeholder="Perez"
            />
          </div>
        </div>
        <div className="pt-4 flex flex-col space-y-4">
          <label htmlFor="emailAddress">
            Correo electronico
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              required
              className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
              placeholder="email@email.com"
            />
          </label>
          <label htmlFor="subject">
            Asunto del mensaje
            <select
              name="subject"
              id="subject"
              className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
            >
              <option value="rescue">Rescate</option>
              <option value="adoption">Adopción</option>
              <option value="volunteering">Voluntariado</option>
              <option value="donations">Donaciones</option>
              <option value="others">Otros</option>
            </select>
          </label>
          <label htmlFor="message">
            Mensaje
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="rounded-xl border-2 px-2 py-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 w-full outline-none mt-2"
              placeholder="Escribe tu mensaje aqui..."
            ></textarea>
          </label>
          <button
            type="submit"
            className="bg-emerald-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Enviar mensaje
          </button>
        </div>
      </form>
    </>
  );
}

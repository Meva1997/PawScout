export default function RegisterForm() {
  return (
    <>
      <form action="" className="w-full max-w-sm">
        <div className="mb-6">
          <div className="flex gap-4 my-4">
            <div>
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder="Nombre"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-black"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              placeholder="correo@correo.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-black"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              required
              placeholder="contraseña"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1 text-black"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-100"
              required
              placeholder="confirmar contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Registrarse
          </button>
        </div>
      </form>
    </>
  );
}

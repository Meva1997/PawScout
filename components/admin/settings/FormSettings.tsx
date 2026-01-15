export default function FormSettings() {
  return (
    <>
      <form action="">
        <section className="bg-green-600/10 my-10 p-6 rounded-2xl max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-white text-lg font-medium">
              Detalles del refugio
            </h2>
          </div>
          {/*Shelter Logo */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p>Image logo</p>
            </div>
            <div>
              <p>Logo del Refugio</p>
              <span>Este logo representa la identidad visual del refugio.</span>
            </div>
          </div>
          {/*Shelter Name and description */}
          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="shelter-name"
                  className="block text-sm font-medium text-white"
                >
                  Nombre del Refugio
                </label>
                <input
                  type="text"
                  id="shelter-name"
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="Nombre del Refugio"
                />
              </div>
              <div>
                <label
                  htmlFor="shelter-description"
                  className="block text-sm font-medium text-white"
                >
                  Descripción del Refugio
                </label>
                <textarea
                  id="shelter-description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="Descripción del Refugio"
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/*Location & contact Settings */}
        <section className="my-10 p-6 bg-green-600/10 rounded-2xl max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-white text-lg font-medium">
              Ubicación y contacto
            </h2>
          </div>
          <div className="flex space-x-6 mt-6">
            <label htmlFor="email">
              Correo electrónico de contacto
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="Correo electrónico de contacto"
              />
            </label>
            <label htmlFor="phoneNumber">
              Número de teléfono de contacto
              <input
                type="tel"
                id="phoneNumber"
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="Número de teléfono de contacto"
              />
            </label>
          </div>
          <div className="mt-6">
            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              placeholder="Dirección"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                id="city"
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="Ciudad"
              />
            </div>
            <div className="col-span-2 flex space-x-6">
              <div>
                <label htmlFor="state">Estado</label>
                <input
                  type="text"
                  id="state"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="Estado"
                />
              </div>
              <div>
                <label htmlFor="zipCode">Código Postal</label>
                <input
                  type="text"
                  id="zipCode"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="Código Postal"
                />
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}

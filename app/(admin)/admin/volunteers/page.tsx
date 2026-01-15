export default function page() {
  const generalInfo = [
    { label: "Total de Voluntarios", value: "1,245" },
    { label: "Voluntarios Activos", value: "987" },
    { label: "Nuevos este Mes", value: "123" },
  ];

  const volunteers = [
    {
      id: "V12345",
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "+52 123 456 7890",
      registrationDate: "2024-01-15",
      status: "Activo",
    },
    {
      id: "V12346",
      name: "María Gómez",
      email: "maria.gomez@example.com",
      phone: "+52 987 654 3210",
      registrationDate: "2024-02-10",
      status: "Activo",
    },
  ];

  return (
    <>
      <section className="my-10 flex items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">Voluntarios</h1>
          <p className="mt-2 text-white/70">
            Administra los voluntarios registrados en la plataforma
          </p>
        </article>
      </section>

      {/* general info of users */}
      <section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {generalInfo.map((info) => (
            <article
              key={info.label}
              className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <p className="text-sm text-white/70">{info.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {info.value}
              </h2>
            </article>
          ))}
        </div>
      </section>

      {/* Volunteers Table */}
      <section className="mt-20 max-w-6xl mx-auto rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="grid gap-4 lg:hidden">
          {volunteers.map((volunteer) => (
            <article
              key={`${volunteer.id}-card`}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                <span>#{volunteer.id}</span>
                <span>{volunteer.status}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {volunteer.name}
              </h3>
              <p className="text-sm text-white/70">{volunteer.email}</p>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-white/50">Teléfono</span>
                  <span className="font-semibold text-white">
                    {volunteer.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-white/50">Registro</span>
                  <span className="font-semibold text-white">
                    {volunteer.registrationDate}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-180 w-full table-auto border-collapse text-left">
              <thead>
                <tr className="text-xs uppercase tracking-[0.3em] text-white/40">
                  <th className="px-4 py-3">ID de Voluntario</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Correo Electrónico</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Fecha de Registro</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr
                    key={volunteer.id}
                    className="border-t border-white/10 text-sm text-white/80 transition hover:bg-white/5"
                  >
                    <td className="px-4 py-4 font-semibold text-white">
                      {volunteer.id}
                    </td>
                    <td className="px-4 py-4 text-white">{volunteer.name}</td>
                    <td className="px-4 py-4 text-white wrap-break-word">
                      {volunteer.email}
                    </td>
                    <td className="px-4 py-4 text-white">{volunteer.phone}</td>
                    <td className="px-4 py-4 text-white">
                      {volunteer.registrationDate}
                    </td>
                    <td className="px-4 py-4 text-white">{volunteer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

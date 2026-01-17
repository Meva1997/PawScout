import Link from "next/link";

const volunteers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+52 123 456 7890",
    registrationDate: "2024-01-15",
    status: "Activo",
  },
  {
    id: 2,
    name: "María Gómez",
    email: "maria.gomez@example.com",
    phone: "+52 987 654 3210",
    registrationDate: "2024-02-10",
    status: "Activo",
  },
];

export default function VolunteerTable() {
  return (
    <>
      <div className="grid gap-4 lg:hidden">
        {volunteers.map((volunteer) => (
          <article
            key={`${volunteer.id}-card`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
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
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo Electrónico</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Fecha de Registro</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Info</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr
                  key={volunteer.id}
                  className="border-t border-white/10 text-sm text-white/80 transition hover:bg-white/5"
                >
                  <td className="px-4 py-4 font-semibold text-white">
                    {volunteer.name}
                  </td>
                  <td className="px-4 py-4 text-white">{volunteer.email}</td>
                  <td className="px-4 py-4 text-white wrap-break-word">
                    {volunteer.phone}
                  </td>
                  <td className="px-4 py-4 text-white wrap-break-word">
                    {volunteer.registrationDate}
                  </td>
                  <td className="px-4 py-4 text-white">{volunteer.status}</td>
                  <td className="px-4 py-4 text-white">
                    <Link
                      href={`/admin/volunteers/${volunteer.id}/details`}
                      className="rounded-2xl bg-[#19e6b3] px-3 py-2 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]"
                    >
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

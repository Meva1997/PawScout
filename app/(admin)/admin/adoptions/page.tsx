import Link from "next/link";

export default function page() {
  type AdoptionRequest = {
    id: number;
    applicantName: string;
    petName: string;
    petType: string;
    requestDate: string;
    status: "Pending" | "Approved" | "Rejected";
  };

  type FilterButton = {
    label: string;
    count: number;
  };

  const requests: AdoptionRequest[] = [
    {
      id: 1,
      applicantName: "Juan Pérez",
      petName: "Max",
      petType: "Perro",
      requestDate: "2024-06-15",
      status: "Pending",
    },
    {
      id: 2,
      applicantName: "María Gómez",
      petName: "Luna",
      petType: "Gato",
      requestDate: "2024-06-14",
      status: "Approved",
    },
    {
      id: 3,
      applicantName: "Carlos Rodríguez",
      petName: "Bella",
      petType: "Perro",
      requestDate: "2024-06-13",
      status: "Rejected",
    },
  ];
  const filterButtons: FilterButton[] = [
    { label: "All Requests", count: 48 },
    { label: "Pending", count: 12 },
    { label: "Approved", count: 24 },
    { label: "Rejected", count: 8 },
  ];

  return (
    <>
      <section className="my-10 flex items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">
            Solicitudes de Adopción
          </h1>
          <p className="mt-2 text-white/70">
            Administra las solicitudes de adopción recibidas de los usuarios
          </p>
        </article>
        <article>
          <button className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]">
            + Agregar Nueva Adopción
          </button>
        </article>
      </section>

      {/* Filter / controls */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">
              Filtro rápido
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {filterButtons.map((button) => (
                <button
                  key={button.label}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold ${
                    button.label === "All Requests"
                      ? "border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(25,230,179,0.25)]"
                      : "border-white/10 text-white/70 transition hover:border-white/40 hover:text-white"
                  }`}
                >
                  {button.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      button.label === "All Requests"
                        ? "bg-[#19e6b3]/20 text-[#19e6b3]"
                        : "bg-white/5 text-white/60"
                    }`}
                  >
                    {button.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center mt-6">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs uppercase tracking-[0.4em] text-white/40">
              Ordenar por
            </span>
            <span className="font-semibold text-white">Fecha de creación</span>
            <span aria-hidden className="text-white/40">
              ⇵
            </span>
          </div>
        </div>
      </section>

      {/* Adoption Requests Table */}

      <section className="my-20 bg-emerald-950/30 p-6 rounded-2xl max-w-6xl mx-auto ">
        {/* Table of adoption requests would go here */}
        <table className="text-center w-full table-auto border-collapse gap-6 ">
          <thead className="gap-6">
            <tr className="border-b border-white/10 pb-4">
              <th className=" text-white/70">Nombre del Solicitante</th>
              <th className=" text-white/70">Mascota</th>
              <th className=" text-white/70">Fecha de Solicitud</th>
              <th className=" text-white/70">Estado</th>
              <th className=" text-white/70">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            {requests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-4 text-white">{request.applicantName}</td>
                <td className="py-4 text-white">
                  {request.petName} ({request.petType})
                </td>
                <td className="py-4 text-white">{request.requestDate}</td>
                <td className="py-4 text-white">{request.status}</td>
                <td className="py-4 text-white flex flex-col xl:flex-row sm:items-center sm:gap-2 justify-center">
                  {request.status === "Pending" && (
                    <>
                      <Link
                        href={`adoptions/${request.id}/details`}
                        className="rounded-2xl bg-blue-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-600"
                      >
                        Detalles
                      </Link>
                      <button className="rounded-2xl bg-green-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-green-600">
                        Aprobar
                      </button>
                      <button className="rounded-2xl bg-red-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-600">
                        Rechazar
                      </button>
                    </>
                  )}
                  {request.status === "Approved" && (
                    <span className="text-green-400 font-semibold">
                      Aprobada
                    </span>
                  )}
                  {request.status === "Rejected" && (
                    <span className="text-red-400 font-semibold">
                      Rechazada
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

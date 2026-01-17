import Link from "next/link";

type AdoptionRequest = {
  id: number;
  applicantName: string;
  petName: string;
  petType: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
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

export default function AdoptionsTable() {
  const getStatusBadgeClass = (status: AdoptionRequest["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/15 text-green-300";
      case "Rejected":
        return "bg-red-500/15 text-red-300";
      default:
        return "bg-amber-500/15 text-amber-300";
    }
  };
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4 md:hidden">
          {requests.map((request) => (
            <article
              key={`mobile-${request.id}`}
              className="rounded-2xl border border-white/15 bg-white/5 p-4 text-white"
            >
              <header className="flex flex-col gap-1">
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                  Solicitud #{request.id}
                </p>
                <p className="text-xl font-semibold">{request.applicantName}</p>
                <p className="text-white/70">
                  {request.petName} · {request.petType}
                </p>
              </header>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/70">
                <div>
                  <dt className="text-white/50">Fecha</dt>
                  <dd>{request.requestDate}</dd>
                </div>
                <div>
                  <dt className="text-white/50">Estado</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusBadgeClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                {request.status === "Pending" ? (
                  <>
                    <Link
                      href={`adoptions/${request.id}/details`}
                      className="flex-1 min-w-30 rounded-2xl bg-blue-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      Detalles
                    </Link>
                    <button className="flex-1 min-w-30 rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600">
                      Aprobar
                    </button>
                    <button className="flex-1 min-w-30 rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
                      Rechazar
                    </button>
                  </>
                ) : (
                  <span
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold ${getStatusBadgeClass(
                      request.status
                    )}`}
                  >
                    {request.status === "Approved" ? "Aprobada" : "Rechazada"}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5/20">
            <table className="w-full min-w-180table-auto border-collapse text-center">
              <thead>
                <tr className="border-b border-white/10 pb-4">
                  <th className="px-4 py-3 text-left font-semibold text-white/70">
                    Nombre del Solicitante
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-white/70">
                    Mascota
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/70">
                    Fecha de Solicitud
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/70">
                    Estado
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/70">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-white/10 text-sm text-white transition hover:bg-white/5"
                  >
                    <td className="px-4 py-4 text-left font-semibold">
                      {request.applicantName}
                    </td>
                    <td className="px-4 py-4 text-left text-white/80">
                      {request.petName} ({request.petType})
                    </td>
                    <td className="px-4 py-4">{request.requestDate}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                        {request.status === "Pending" ? (
                          <>
                            <Link
                              href={`adoptions/${request.id}/details`}
                              className="rounded-2xl bg-blue-500 px-3 py-1 font-semibold text-white transition hover:bg-blue-600"
                            >
                              Detalles
                            </Link>
                            <button className="rounded-2xl bg-green-500 px-3 py-1 font-semibold text-white transition hover:bg-green-600">
                              Aprobar
                            </button>
                            <button className="rounded-2xl bg-red-500 px-3 py-1 font-semibold text-white transition hover:bg-red-600">
                              Rechazar
                            </button>
                          </>
                        ) : (
                          <span
                            className={`rounded-2xl px-3 py-1 font-semibold ${getStatusBadgeClass(
                              request.status
                            )}`}
                          >
                            {request.status === "Approved"
                              ? "Aprobada"
                              : "Rechazada"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

import { formatDate } from "@/lib/date";
import { AdoptSchemaType } from "@/schemas/adopt-schema";
import Link from "next/link";

type AdoptionsTableProps = {
  requests: AdoptSchemaType[];
  isError: boolean;
  isPending: boolean;
};

const tableHeaders = [
  "Solicitante",
  "Email",
  "Animal ID",
  "Status",
  "Fecha",
  "Acciones",
];

export default function AdoptionsTable({
  requests,
  isError,
  isPending,
}: AdoptionsTableProps) {
  const statusColors = (status: string) => {
    if (status === "approved") return "text-green-500";
    if (status === "rejected") return "text-red-500";
    return "text-yellow-500";
  };

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto text-red-500 font-semibold mb-6 text-center">
        Error al cargar las solicitudes de adopción.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto text-white font-semibold my-6 animate-pulse text-center">
        Cargando solicitudes de adopción...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4 md:hidden">
          {requests.length === 0 ? (
            <div className="text-center py-10 text-red-500 font-semibold">
              No hay solicitudes de adopción en este momento.
            </div>
          ) : (
            requests.map((request) => (
              <article
                key={`mobile-${request.id}`}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-white"
              >
                <header className="flex flex-col gap-1">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    Solicitud #{request.id}
                  </p>
                  <p className="text-xl font-semibold">
                    {request.applicantName} {request.applicantLastName}
                  </p>
                  <p className="text-white/70">Animal ID: {request.animalId}</p>
                  <p className={statusColors(request.status)}>
                    {request.status}
                  </p>
                </header>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <dt className="text-white/50">Fecha</dt>
                    <dd>{request.date}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Email</dt>
                    <dd className="truncate">{request.email}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
              </article>
            ))
          )}
        </div>

        <div className="hidden md:block">
          <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5/20">
            <table className="w-full min-w-180 table-auto border-collapse text-center">
              <thead>
                <tr className="border-b border-white/10 pb-4">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-4 text-center text-sm font-semibold text-white/70"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {requests.length === 0 ? (
                <tbody>
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="py-10 text-center text-red-500 font-semibold"
                    >
                      No hay solicitudes de adopción en este momento.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-white/10 text-sm text-white transition hover:bg-white/5 text-center wrap-break-word"
                    >
                      <td className="px-4 py-4 font-semibold text-white">
                        {request.applicantName} {request.applicantLastName}
                      </td>
                      <td className="px-4 py-4 text-white font-semibold">
                        {request.email}
                      </td>
                      <td className="px-4 py-4 text-white font-semibold">
                        {request.animalId}
                      </td>
                      <td
                        className={`px-4 py-4 text-white font-semibold ${statusColors(request.status)}`}
                      >
                        {request.status}
                      </td>

                      <td className="px-4 py-4">{formatDate(request.date)}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center justify-center gap-2 text-sm">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

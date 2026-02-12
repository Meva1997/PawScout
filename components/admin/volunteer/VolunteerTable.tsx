"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/date";
import { VolunteerSchemaType } from "@/schemas/volunteer-schema";
import ConfirmModalDelete from "@/components/ui/ConfirmModalDelete";
import { deleteVolunteer } from "@/api/api";

type VolunteerTableProps = {
  volunteers: VolunteerSchemaType[];
  token: string;
};

function statusBadgeColor(status: string) {
  if (status === "accepted")
    return "bg-emerald-500/10 px-4 py-2 rounded-2xl text-emerald-300 border-emerald-400";
  if (status === "pending")
    return "bg-yellow-500/10 px-4 py-2 rounded-2xl text-yellow-300 border-yellow-400";
  if (status === "rejected")
    return "bg-red-500/10 px-4 py-2 rounded-2xl text-red-300 border-red-400";
  return "bg-gray-500/10 px-4 py-2 rounded-2xl text-gray-300 border-gray-400";
}

function statusBadgeText(status: string) {
  const statusMap: { [key: string]: string } = {
    accepted: "Aceptado",
    pending: "Pendiente",
    rejected: "Rechazado",
  };
  return statusMap[status.toLowerCase()] || status;
}

export default function VolunteerTable({
  volunteers,
  token,
}: VolunteerTableProps) {
  const router = useRouter();

  const handleDeleteClick = (volunteerId: number) => {
    // Abrir el modal de confirmación con el ID del voluntario
    router.push(`?modal=delete&id=${volunteerId}`);
  };

  return (
    <>
      {volunteers.length === 0 ? (
        <div className="text-center text-white/70 py-10 animate-pulse">
          No hay voluntarios registrados.
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {volunteers.map((volunteer) => (
              <article
                key={`${volunteer.id}-card`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
                  <span className={`${statusBadgeColor(volunteer.status)}`}>
                    {statusBadgeText(volunteer.status)}
                  </span>
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
                      {formatDate(volunteer.date)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-180 w-full table-auto border-collapse text-center">
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
                      <td className="px-4 py-4 text-white">
                        {volunteer.email}
                      </td>
                      <td className="px-4 py-4 text-white wrap-break-word">
                        {volunteer.phone}
                      </td>
                      <td className="px-4 py-4 text-white wrap-break-word">
                        {formatDate(volunteer.date)}
                      </td>
                      <td className={`px-4 py-4 text-white `}>
                        <span
                          className={`${statusBadgeColor(volunteer.status)}`}
                        >
                          {statusBadgeText(volunteer.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white flex flex-col items-center justify-center">
                        <Link
                          href={`/admin/volunteers/${volunteer.id}/details`}
                          className="rounded-2xl bg-[#19e6b3] px-3 py-2 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0] cursor-pointer"
                        >
                          Detalles
                        </Link>
                        <button
                          className="mt-2 rounded-2xl  bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-800 cursor-pointer"
                          onClick={() => handleDeleteClick(volunteer.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <ConfirmModalDelete
        token={token}
        entityName="voluntario"
        entityNamePlural="este voluntario"
        deleteFnAction={deleteVolunteer}
        queryKey="volunteers"
        idParamName="id"
      />
    </>
  );
}

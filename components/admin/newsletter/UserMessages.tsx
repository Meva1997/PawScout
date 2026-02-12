"use client";
import { deleteContactMessage, getContactMessages } from "@/api/api";
import PendingSpinner from "@/components/ui/PendingSpinner";
import { formatDate } from "@/lib/date";
import { ContactMessageResponse } from "@/schemas/contact-schema";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ConfirmModalDelete from "@/components/ui/ConfirmModalDelete";

const tableHeaders = ["Nombre", "Asunto", "Mensaje", "Fecha", "Acciones"];

type UserMessagesProps = {
  token: string;
};

export default function UserMessages({ token }: UserMessagesProps) {
  const router = useRouter();

  const { data, isPending, isError } = useQuery<ContactMessageResponse>({
    queryKey: ["userMessages"],
    queryFn: () => getContactMessages(token),
  });

  const messageData = data?.contact_messages || [];

  const handleDeleteClick = (messageId: number) => {
    router.push(`?modal=delete&id=${messageId}`);
  };

  const translateSubject = (subject: string) => {
    switch (subject) {
      case "Rescue":
        return "Rescate";
      case "Adoption":
        return "Adopción";
      case "Volunteering":
        return "Voluntariado";
      case "Donations":
        return "Donaciones";
      case "Others":
        return "Otros";
      default:
        return subject;
    }
  };

  if (isPending) {
    return <PendingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar los mensajes.</p>;
  }

  return (
    <>
      <article className="my-6 max-w-7xl mx-auto">
        <div className="w-full overflow-x-auto rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/5">
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="border-b border-white/15 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/60"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messageData.map((message) => (
                <tr key={message.id} className="transition hover:bg-white/10">
                  <td className="border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-white text-base">
                        {message.name}
                      </span>
                      <span className="text-sm text-white/60 break-all">
                        {message.email}
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-white/10 px-6 py-4">
                    <span className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400">
                      {translateSubject(
                        message.subject.charAt(0).toUpperCase() +
                          message.subject.slice(1),
                      )}
                    </span>
                  </td>
                  <td className="border-b border-white/10 px-6 py-4 max-w-md">
                    <p className="text-white/80 line-clamp-2 text-sm">
                      {message.message}
                    </p>
                  </td>
                  <td className="border-b border-white/10 px-6 py-4 text-center">
                    <span className="text-white/80 font-medium text-sm">
                      {formatDate(message.date)}
                    </span>
                  </td>
                  <td className="border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="w-full rounded-xl bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/admin/newsletter/message/${message.id}/details`,
                          )
                        }
                      >
                        Detalles
                      </button>
                      <button
                        className="w-full rounded-xl bg-red-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                        onClick={() => handleDeleteClick(message.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <ConfirmModalDelete
        token={token}
        entityName="mensaje"
        entityNamePlural="este mensaje"
        deleteFnAction={deleteContactMessage}
        queryKey={["userMessages"]}
      />
    </>
  );
}

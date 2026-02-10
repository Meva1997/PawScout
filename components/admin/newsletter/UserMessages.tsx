"use client";
import { getContactMessages } from "@/api/api";
import PendingSpinner from "@/components/ui/PendingSpinner";
import { formatDate } from "@/lib/date";
import { ContactMessageResponse } from "@/schemas/contact-schema";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  if (isPending) {
    return <PendingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500">Error al cargar los mensajes.</p>;
  }

  return (
    <>
      <article className="my-6  max-w-7xl mx-auto table-auto rounded-2xl overflow-x-auto">
        <table>
          <thead className=" text-center">
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} className="px-4 py-2 text-white/70">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {messageData.map((message) => (
              <tr
                key={message.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="px-4 py-2 flex flex-col">
                  <p className="font-bold text-white text-lg">{message.name}</p>
                  <p className="text-white/70 wrap-break-word">
                    {message.email}
                  </p>
                </td>
                <td className="px-4 py-2 font-bold text-white">
                  {message.subject.charAt(0).toUpperCase() +
                    message.subject.slice(1)}
                </td>
                <td className="px-4 py-2 wrap-break-word ">
                  {message.message}
                </td>
                <td className="px-4 py-2">{formatDate(message.date)}</td>
                <td className="px-4 py-2 gap-4 flex flex-col">
                  <button className="text-red-500 hover:underline hover:cursor-pointer">
                    Eliminar
                  </button>
                  <button
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/newsletter/message/${message.id}/details`,
                      )
                    }
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

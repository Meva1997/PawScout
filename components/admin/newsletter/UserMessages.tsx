import { useRouter } from "next/navigation";

const tableHeaders = ["Nombre", "Asunto", "Mensaje", "Fecha", "Acciones"];

type MessageData = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
};

const messageData: MessageData[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    subject: "Interesado en el boletín",
    message: ' " Hola, me gustaría suscribirme al boletín de PawScout. " ',
    date: "18-01-26",
  },
  {
    id: 2,
    name: "María López",
    email: "maria.lopez@email.com",
    subject: "Consulta sobre adopción",
    message: ' " Quisiera saber más sobre el proceso de adopción. " ',
    date: "20-02-15",
  },
];

export default function UserMessages() {
  const router = useRouter();

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
            {/* Example row */}
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
                  {message.subject}
                </td>
                <td className="px-4 py-2 wrap-break-word ">
                  {message.message}
                </td>
                <td className="px-4 py-2">{message.date}</td>
                <td className="px-4 py-2 gap-4 flex flex-col">
                  <button className="text-red-500 hover:underline hover:cursor-pointer">
                    Eliminar
                  </button>
                  <button
                    className="text-blue-500 hover:underline hover:cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/admin/newsletter/message/${message.id}/details`
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

export default function page() {
  type DonationRecord = {
    id: string;
    donor: string;
    amount: string;
    date: string;
    method: string;
    status: string;
  };

  const tableInfo: DonationRecord[] = [
    {
      id: "DNT-00123",
      donor: "Juan Pérez",
      amount: "$100.00",
      date: "2024-06-15",
      method: "Tarjeta de Crédito",
      status: "Completado",
    },
    {
      id: "DNT-00124",
      donor: "María López",
      amount: "$250.00",
      date: "2024-06-14",
      method: "PayPal",
      status: "Pendiente",
    },
    // More donation records...
  ];

  const generalInfo = [
    { label: "Compensacion en total", value: "$5,430.00" },
    { label: "Donaciones recientes", value: "$1,250.00" },
    { label: "Promedio de donaciones", value: "$452.50" },
  ];

  return (
    <>
      <section className="my-10 flex items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">Donaciones</h1>
          <p className="mt-2 text-white/70">
            Administra las donaciones recibidas de los usuarios
          </p>
        </article>
        <article>
          <button className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]">
            + Agregar Nueva Donación
          </button>
          <button className="ml-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Reporte
          </button>
        </article>
      </section>

      {/* General donation info */}
      <section className="grid grid-cols-3 max-w-6xl mx-auto gap-6">
        {generalInfo.map((info) => (
          <article
            key={info.label}
            className="bg-emerald-950/30 rounded-2xl p-6 space-y-4"
          >
            <p className="text-white font-semibold">{info.label}:</p>
            <span className="font-bold text-2xl text-white">{info.value}</span>
          </article>
        ))}
      </section>

      {/* Donations Table */}
      <section className="my-20 bg-emerald-950/30 p-6 rounded-2xl max-w-6xl mx-auto ">
        {/* Table of donations would go here */}
        <table className="text-center w-full table-auto border-collapse gap-6 ">
          <thead className="gap-6">
            <tr>
              <th className="pb-4 text-white/70">ID de Donación</th>
              <th className="pb-4 text-white/70">Donante</th>
              <th className="pb-4 text-white/70">Cantidad</th>
              <th className="pb-4 text-white/70">Fecha</th>
              <th className="pb-4 text-white/70">Método de Pago</th>
              <th className="pb-4 text-white/70">Estado</th>
            </tr>
          </thead>
          <tbody>
            {tableInfo.map((donation) => (
              <tr
                key={donation.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-4 text-white">#{donation.id}</td>
                <td className="py-4 text-white">{donation.donor}</td>
                <td className="py-4 text-white">{donation.amount}</td>
                <td className="py-4 text-white">{donation.date}</td>
                <td className="py-4 text-white">{donation.method}</td>
                <td className="py-4 text-white">{donation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

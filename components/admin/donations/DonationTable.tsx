import React from "react";

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

export default function DonationTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500/15 text-green-300";
      case "Pendiente":
        return "bg-yellow-500/15 text-yellow-300";
      default:
        return "bg-white/10 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {tableInfo.map((donation) => (
          <article
            key={`donation-mobile-${donation.id}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white"
          >
            <header className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                {donation.id}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                  donation.status
                )}`}
              >
                {donation.status}
              </span>
            </header>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <p>
                <span className="text-white/50">Donante: </span>
                {donation.donor}
              </p>
              <p>
                <span className="text-white/50">Cantidad: </span>
                {donation.amount}
              </p>
              <p>
                <span className="text-white/50">Fecha: </span>
                {donation.date}
              </p>
              <p>
                <span className="text-white/50">Método: </span>
                {donation.method}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="w-full overflow-x-auto rounded-2xl bg-white/5/20">
          <table className="w-full min-w-180 table-auto text-center">
            <thead>
              <tr>
                <th className="px-4 pb-4 text-left text-white/70">
                  ID de Donación
                </th>
                <th className="px-4 pb-4 text-left text-white/70">Donante</th>
                <th className="px-4 pb-4 text-white/70">Cantidad</th>
                <th className="px-4 pb-4 text-white/70">Fecha</th>
                <th className="px-4 pb-4 text-white/70">Método de Pago</th>
                <th className="px-4 pb-4 text-white/70">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tableInfo.map((donation) => (
                <tr
                  key={donation.id}
                  className="border-b border-white/10 text-sm text-white transition hover:bg-white/5"
                >
                  <td className="px-4 py-4 text-left font-semibold">
                    #{donation.id}
                  </td>
                  <td className="px-4 py-4 text-left text-white/80">
                    {donation.donor}
                  </td>
                  <td className="px-4 py-4">{donation.amount}</td>
                  <td className="px-4 py-4">{donation.date}</td>
                  <td className="px-4 py-4">{donation.method}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                        donation.status
                      )}`}
                    >
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

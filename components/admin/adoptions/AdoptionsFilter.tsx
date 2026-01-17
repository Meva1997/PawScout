import React from "react";

type FilterButton = {
  label: string;
  count: number;
};

export default function AdoptionsFilter() {
  const filterButtons: FilterButton[] = [
    { label: "All Requests", count: 48 },
    { label: "Pending", count: 12 },
    { label: "Approved", count: 24 },
    { label: "Rejected", count: 8 },
  ];
  return (
    <>
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
    </>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DonationTable from "@/components/admin/donations/DonationTable";
import DonationModalForm from "@/components/admin/donations/DonationModalForm";

const generalInfo = [
  { label: "Compensacion en total", value: "$5,430.00" },
  { label: "Donaciones recientes", value: "$1,250.00" },
  { label: "Promedio de donaciones", value: "$452.50" },
];

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DonationsPageContent />
    </Suspense>
  );
}

function DonationsPageContent() {
  const router = useRouter();
  const params = useSearchParams();
  const isCreatingDonation = params.get("modal") === "new";

  const handleCloseModal = () => {
    router.push("/admin/donations");
  };

  const handleOpenModal = () => {
    router.push("/admin/donations?modal=new");
  };

  return (
    <>
      <section className="my-10 flex flex-col md:flex-row space-y-6 items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">Donaciones</h1>
          <p className="mt-2 text-white/70">
            Administra las donaciones recibidas de los usuarios
          </p>
        </article>
        <article>
          <button
            className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]"
            onClick={handleOpenModal}
          >
            + Agregar Nueva Donación
          </button>
          <button className="ml-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Reporte
          </button>
        </article>
      </section>

      {isCreatingDonation && (
        <DonationModalForm
          isOpen={isCreatingDonation}
          onClose={handleCloseModal}
        />
      )}

      {/* General donation info */}
      <section className="grid md:grid-cols-3 max-w-6xl mx-auto gap-6">
        {generalInfo.map((info) => (
          <article
            key={info.label}
            className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <p className="text-white font-semibold">{info.label}:</p>
            <span className="font-bold text-2xl text-white">{info.value}</span>
          </article>
        ))}
      </section>

      {/* Donations Table */}
      <section className="my-20 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
        <DonationTable />
      </section>
    </>
  );
}

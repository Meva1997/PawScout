"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VolunteerModalForm from "@/components/admin/volunteer/VolunteerModalForm";
import VolunteerTable from "@/components/admin/volunteer/VolunteerTable";
import { getAllVolunteers } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { VolunteerSchemaType } from "@/schemas/volunteer-schema";

type VolunteerPageProps = {
  token: string;
};

export default function VolunteerPage({ token }: VolunteerPageProps) {
  return (
    <Suspense fallback={null}>
      <VolunteersAdminMain token={token} />
    </Suspense>
  );
}

function VolunteersAdminMain({ token }: VolunteerPageProps) {
  const router = useRouter();
  const params = useSearchParams();
  const isCreatingVolunteer = params.get("modal") === "new";

  const handleCloseModal = () => {
    router.push("/admin/volunteers");
  };

  const handleOpenModal = () => {
    router.push("/admin/volunteers?modal=new");
  };

  const getVolunteersFromLastMonth = (volunteers: VolunteerSchemaType[]) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Set the date to 30 days ago

    return volunteers.filter((volunteer) => {
      const volunteerDate = new Date(volunteer.date);
      return volunteerDate >= thirtyDaysAgo;
    }).length;
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["volunteers"],
    queryFn: () => getAllVolunteers(token), // Prefetch volunteers data for the table
  });

  const volunteers: VolunteerSchemaType[] = data?.volunteers || [];

  const generalInfo = [
    { label: "Total de Voluntarios", value: volunteers.length },
    {
      label: "Voluntarios Activos",
      value: volunteers.filter((v) => v.status === "accepted").length,
    },
    { label: "Nuevos este Mes", value: getVolunteersFromLastMonth(volunteers) },
  ];

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-red-500">
          Error al cargar los voluntarios
        </h2>
        <p className="mt-2 text-red-500">
          Por favor, intenta nuevamente más tarde.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="my-10 flex items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">Voluntarios</h1>
          <p className="mt-2 text-white/70">
            Administra los voluntarios registrados en la plataforma
          </p>
        </article>
        <article>
          <button
            className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0] cursor-pointer"
            onClick={handleOpenModal}
          >
            + Agregar Nuevo Voluntario
          </button>
        </article>
      </section>

      {isCreatingVolunteer && (
        <VolunteerModalForm
          isOpen={isCreatingVolunteer}
          onCloseAction={handleCloseModal}
        />
      )}

      {/* general info of users */}
      <section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {generalInfo.map((info) => (
            <article
              key={info.label}
              className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <p className="text-sm text-white/70">{info.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                {info.value}
              </h2>
            </article>
          ))}
        </div>
      </section>

      {/* Volunteers Table */}
      <section className="mt-20 max-w-6xl mx-auto rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {isPending ? (
          <div className="text-center text-white font-semibold my-6 animate-pulse">
            Cargando voluntarios...
          </div>
        ) : (
          <VolunteerTable volunteers={volunteers} token={token} />
        )}
      </section>
    </>
  );
}

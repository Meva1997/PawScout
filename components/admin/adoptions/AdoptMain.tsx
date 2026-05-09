"use client";

import { useState, useCallback, useMemo } from "react";
import AdoptionsFilter from "@/components/admin/adoptions/AdoptionsFilter";
import AdoptionsTable from "@/components/admin/adoptions/AdoptionsTable";
// import NewAdoptForm from "@/components/admin/adoptions/NewAdoptForm";
import { useQuery } from "@tanstack/react-query";
import { getAdoptionRequests } from "@/api/api";
import type { AdoptSchemaType } from "@/schemas/adopt-schema";

type AdoptMainProps = {
  token: string;
};

export default function AdoptMain({ token }: AdoptMainProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All Requests");

  const { data, isError, isPending } = useQuery({
    queryKey: ["adoptionRequests"],
    queryFn: () => getAdoptionRequests(token),
  });

  const requests = useMemo(() => {
    const requests: AdoptSchemaType[] = Array.isArray(data?.requests)
      ? data.requests
      : [];
    return requests;
  }, [data]);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "All Requests") {
      return requests;
    }
    return requests.filter(
      (request) => request.status === activeFilter.toLowerCase(),
    );
  }, [activeFilter, requests]);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  return (
    <>
      <section className="my-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <article>
          <h1 className="text-3xl font-bold text-white">
            Adoption Requests
          </h1>
          <p className="mt-2 text-white/70">
            Manage adoption requests submitted by users
          </p>
        </article>
      </section>

      {/* Filter / controls */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
        <AdoptionsFilter
          requests={requests}
          activeFilter={activeFilter}
          onFilterChangeAction={handleFilterChange}
        />
      </section>

      {/* Adoption Requests Table */}
      <section className="my-20 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
        <AdoptionsTable
          requests={filteredRequests}
          isError={isError}
          isPending={isPending}
          token={token}
        />
      </section>
    </>
  );
}

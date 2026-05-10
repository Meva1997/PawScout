"use client";

import { getSubs } from "@/api/api";
import PendingSpinner from "@/components/ui/PendingSpinner";
import { useQuery } from "@tanstack/react-query";

export default function NewsSubscribers() {
  const { data, isError, isPending } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: () => getSubs(),
  });

  if (isError) {
    return (
      <div className="my-6  max-w-7xl mx-auto table-auto rounded-2xl overflow-x-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
        <p className="text-white">Error loading subscribers.</p>
      </div>
    );
  }

  if (isPending) {
    return <PendingSpinner />;
  }

  return (
    <>
      <article className="my-6  max-w-7xl mx-auto table-auto rounded-2xl overflow-x-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
        {data?.map((subscriber: { email: string }, id: number) => (
          <div
            key={`${subscriber.email}-${id}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white wrap-break-word"
          >
            {subscriber.email}
          </div>
        ))}
      </article>
    </>
  );
}

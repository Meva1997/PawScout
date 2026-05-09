"use client";

import PendingSpinner from "@/components/ui/PendingSpinner";
import { formatDate } from "@/lib/date";
import { AdoptSchemaType } from "@/schemas/adopt-schema";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdoptionRequest, updateAdoptionStatus } from "@/api/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModalDelete from "@/components/ui/ConfirmModalDelete";

type AdoptionsTableProps = {
  requests: AdoptSchemaType[];
  isError: boolean;
  isPending: boolean;
  token: string;
};

const tableHeaders = [
  "Applicant",
  "Email",
  "Animal ID",
  "Status",
  "Date",
  "Actions",
];

export default function AdoptionsTable({
  requests,
  isError,
  isPending,
  token,
}: AdoptionsTableProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const statusColors = (status: string) => {
    if (status === "approved") return "text-green-500";
    if (status === "rejected") return "text-red-500";
    return "text-yellow-500";
  };

  const statusBadge = (status: string) => {
    if (status === "approved") {
      return "bg-green-500/20 text-green-400 border border-green-500/40";
    }
    if (status === "rejected") {
      return "bg-red-500/20 text-red-400 border border-red-500/40";
    }
    return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40";
  };

  const statusMutation = useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: number;
      status: "approved" | "pending" | "rejected";
    }) => {
      return updateAdoptionStatus(token, applicationId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adoptionRequests"] });
      setUpdatingId(null);
    },
    onError: () => {
      setUpdatingId(null);
      alert("Error updating adoption status");
    },
  });

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    setUpdatingId(applicationId);
    statusMutation.mutate({
      applicationId,
      status: newStatus as "approved" | "pending" | "rejected",
    });
  };

  const handleDeleteClick = (applicationId: number) => {
    router.push(`?modal=delete&id=${applicationId}`);
  };

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto text-red-500 font-semibold mb-6 text-center">
        Error loading adoption requests.
      </div>
    );
  }

  if (isPending) {
    return (
      <>
        <div className="max-w-6xl mx-auto text-white font-semibold my-6 animate-pulse text-center">
          Loading adoption requests...
          <PendingSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4 md:hidden">
          {requests.length === 0 ? (
            <div className="text-center py-10 text-red-500 font-semibold">
              No adoption requests at this time.
            </div>
          ) : (
            requests.map((request) => (
              <article
                key={`mobile-${request.id}`}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-white"
              >
                <header className="flex flex-col gap-1">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    Request #{request.id}
                  </p>
                  <p className="text-xl font-semibold">
                    {request.applicantName} {request.applicantLastName}
                  </p>
                  <p className="text-white/70">Animal ID: {request.animalId}</p>
                  <p className={statusColors(request.status)}>
                    {request.status === "approved"
                      ? "Approved"
                      : request.status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                  </p>
                </header>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <dt className="text-white/50">Date</dt>
                    <dd>{request.date}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Email</dt>
                    <dd className="truncate">{request.email}</dd>
                  </div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`adoptions/${request.id}/details`}
                    className="flex-1 w-1/3 rounded-2xl bg-blue-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Details
                  </Link>
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id as number, e.target.value)
                    }
                    disabled={updatingId === request.id}
                    className="rounded-xl bg-green-500 px-2 py-1.5 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleDeleteClick(request.id as number)}
                    className="rounded-xl bg-red-500 px-3 py-1.5 font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="w-full overflow-x-auto rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm">
            <table className="w-full min-w-180 table-auto border-separate border-spacing-0 text-center">
              <thead>
                <tr className="bg-white/5">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="border-b border-white/15 px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/60"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              {requests.length === 0 ? (
                <tbody>
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="py-10 text-center text-red-500 font-semibold"
                    >
                      No adoption requests at this time.
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="text-sm text-white transition hover:bg-white/10 text-center wrap-break-word"
                    >
                      <td className="border-b border-white/10 px-4 py-4 text-left">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">
                            {request.applicantName} {request.applicantLastName}
                          </span>
                          <span className="text-xs text-white/50">
                            Request #{request.id}
                          </span>
                        </div>
                      </td>
                      <td className="border-b border-white/10 px-4 py-4 text-white/80 font-medium max-w-52 truncate">
                        {request.email}
                      </td>
                      <td className="border-b border-white/10 px-4 py-4">
                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                          Animal #{request.animalId}
                        </span>
                      </td>
                      <td className="border-b border-white/10 px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadge(request.status)}`}
                        >
                          {request.status === "approved"
                            ? "Approved"
                            : request.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                        </span>
                      </td>

                      <td className="border-b border-white/10 px-4 py-4 text-white/80 font-medium">
                        {formatDate(request.date)}
                      </td>
                      <td className="border-b border-white/10 px-4 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                          <Link
                            href={`adoptions/${request.id}/details`}
                            className="rounded-xl bg-blue-500 px-3 py-1.5 font-semibold text-white transition hover:bg-blue-600 cursor-pointer"
                          >
                            Details
                          </Link>
                          <select
                            value={request.status}
                            onChange={(e) =>
                              handleStatusChange(
                                request.id as number,
                                e.target.value,
                              )
                            }
                            disabled={updatingId === request.id}
                            className="rounded-xl bg-green-500 px-2 py-1.5 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            className="rounded-xl bg-red-500 px-3 py-1.5 font-semibold text-white transition hover:bg-red-600 cursor-pointer"
                            onClick={() => handleDeleteClick(request.id as number)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <ConfirmModalDelete
        token={token}
        entityName="adoption request"
        entityNamePlural="this request"
        deleteFnAction={deleteAdoptionRequest}
        queryKey={["adoptionRequests"]}
      />
    </>
  );
}

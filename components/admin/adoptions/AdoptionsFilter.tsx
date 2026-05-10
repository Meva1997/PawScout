"use client";
import { AdoptSchemaType } from "@/schemas/adopt-schema";

type FilterButton = {
  label: string;
  count: number;
};

type AdoptionsFilterProps = {
  requests: AdoptSchemaType[];
  activeFilter: string;
  onFilterChangeAction: (filter: string) => void;
};

export default function AdoptionsFilter({
  requests,
  activeFilter,
  onFilterChangeAction,
}: AdoptionsFilterProps) {
  const filterButtons: FilterButton[] = [
    { label: "All Requests", count: requests.length },
    {
      label: "Pending",
      count: requests.filter((request) => request.status === "pending").length,
    },
    {
      label: "Approved",
      count: requests.filter((request) => request.status === "approved").length,
    },
    {
      label: "Rejected",
      count: requests.filter((request) => request.status === "rejected").length,
    },
  ];

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          Quick Filter
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {filterButtons.map((button) => (
            <button
              key={button.label}
              onClick={() => onFilterChangeAction(button.label)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold ${
                button.label === activeFilter
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
  );
}

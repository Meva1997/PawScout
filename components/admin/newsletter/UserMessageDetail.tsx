"use client";

import { getContactMessaegById } from "@/api/api";
import PendingSpinner from "@/components/ui/PendingSpinner";
import { formatDate } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type UserInfo = {
  name: string;
  email: string;
  date: string;
  message: string;
  subject: string;
};

type UserMessageDetailProps = {
  token: string;
};

const getSubjectColor = (subject: string) => {
  const colors = {
    adoption: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    donations: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    volunteer: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    default: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  };
  return colors[subject as keyof typeof colors] || colors.default;
};

const getSubjectBadgeColor = (subject: string) => {
  const colors = {
    adoption: "bg-gradient-to-r from-purple-500 to-pink-500",
    donations: "bg-gradient-to-r from-emerald-500 to-teal-500",
    volunteer: "bg-gradient-to-r from-blue-500 to-cyan-500",
    default: "bg-gradient-to-r from-orange-500 to-amber-500",
  };
  return colors[subject as keyof typeof colors] || colors.default;
};

export default function UserMessageDetail({ token }: UserMessageDetailProps) {
  const params = useParams<{ slug: string }>();

  const { data, isError, isPending } = useQuery<UserInfo>({
    queryKey: ["userMessageDetail", params.slug],
    queryFn: () => getContactMessaegById(token, +params.slug),
  });

  if (isPending) {
    return <PendingSpinner />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-linear-to-br from-red-500/10 to-rose-500/10 border border-red-500/30 p-6 text-center">
        <svg
          fill="none"
          stroke="currentColor"
          className="w-12 h-12 text-red-500 mx-auto mb-3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
            strokeWidth={2}
          />
        </svg>
        <p className="text-red-400 text-lg font-medium">Error al cargar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header con Badge del Subject */}
      <div
        className={`rounded-2xl bg-linear-to-br ${getSubjectColor(data?.subject)} border p-6 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`${getSubjectBadgeColor(data?.subject)} px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg`}
          >
            {data?.subject.charAt(0).toUpperCase() + data?.subject.slice(1)}
          </span>
          <div className="h-8 w-px bg-white/20"></div>
          <div>
            <p className="text-gray-400 text-sm">ID del mensaje</p>
            <p className="text-white font-mono font-bold">#{params.slug}</p>
          </div>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <article className="group border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-emerald-500/5 hover:to-emerald-500/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(25,230,179,0.15)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <svg
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-emerald-500"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0m-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              Información del Usuario
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0m-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7"
                    strokeWidth={2}
                  />
                </svg>
                <span>Nombre</span>
              </div>
              <p className="font-bold text-white text-lg ml-6">{data?.name}</p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2"
                    strokeWidth={2}
                  />
                </svg>
                <span>Email</span>
              </div>
              <p className="font-semibold text-emerald-400 text-lg ml-6 break-all">
                {data?.email}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"
                    strokeWidth={2}
                  />
                </svg>
                <span>Fecha de envío</span>
              </div>
              <p className="font-semibold text-white text-lg ml-6">
                {formatDate(data?.date)}
              </p>
            </div>
          </div>
        </article>

        {/* Message Card */}
        <article className="group border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-purple-500/5 hover:to-purple-500/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <svg
                fill="none"
                stroke="currentColor"
                className="w-6 h-6 text-purple-500"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5z"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Mensaje</h2>
          </div>

          <div className="p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors min-h-50">
            <p className="whitespace-pre-wrap text-gray-200 leading-relaxed">
              {data?.message}
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}

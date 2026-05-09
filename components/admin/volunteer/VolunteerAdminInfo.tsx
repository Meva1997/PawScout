"use client";
import { useState } from "react";
import { getVolunteerById } from "@/api/api";
import { formatDate } from "@/lib/date";
import { VolunteerSchemaType } from "@/schemas/volunteer-schema";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import VolunteerModalForm from "./VolunteerModalForm";

type VolunteerAdminInfoProps = {
  params: string;
  token: string;
};

export default function VolunteerAdminInfo({
  params,
  token,
}: VolunteerAdminInfoProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["volunteer", params],
    queryFn: () => getVolunteerById(token, Number(params)),
  });

  const volunteer: VolunteerSchemaType = data;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  function statusBadgeColor(status: string) {
    if (status === "accepted")
      return "bg-emerald-500/10 text-emerald-300 border-emerald-400";
    if (status === "pending")
      return "bg-yellow-500/10 text-yellow-300 border-yellow-400";
    if (status === "rejected")
      return "bg-red-500/10 text-red-300 border-red-400";
    return "bg-gray-500/10 text-gray-300 border-gray-400";
  }

  function statusBadgeText(status: string) {
    const statusMap: { [key: string]: string } = {
      accepted: "Accepted",
      pending: "Pending",
      rejected: "Rejected",
    };
    return statusMap[status.toLowerCase()] || status;
  }

  function dictionaryDays(day: string) {
    const daysMap: { [key: string]: string } = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };
    return daysMap[day.toLowerCase()] || day;
  }

  function dictionaryAvailability(slot: string) {
    const availabilityMap: { [key: string]: string } = {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
    };
    return availabilityMap[slot.toLowerCase()] || slot;
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto text-red-500 font-semibold mb-6 text-center">
        Error loading volunteer details.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto text-white/60 font-semibold mb-6 text-center animate-pulse mt-20">
        Loading volunteer details...
      </div>
    );
  }

  return (
    <main className="space-y-8 pb-12">
      <div className="mb-4 text-md text-white/70">
        <Link
          href="/admin/volunteers"
          className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-all group"
        >
          <svg
            className="size-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to volunteer list
        </Link>
      </div>

      <header className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-[#19e6b3]/10 p-8 text-white shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/60">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Volunteer #{volunteer.id}
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              {volunteer.name} {volunteer.lastName}
            </h1>
            <div className="flex items-center gap-2 text-white/70">
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Registered on {formatDate(volunteer.date)}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span
              className={`rounded-full border-2 px-6 py-3 text-sm font-bold uppercase tracking-wider ${statusBadgeColor(volunteer.status)} shadow-lg`}
            >
              {statusBadgeText(volunteer.status)}
            </span>
            <button
              onClick={handleEditClick}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-[#19e6b3]/50 cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30">
              <svg
                className="size-6 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">
              Personal Information
            </h2>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                Full Name
              </p>
              <p className="text-white font-semibold">{`${volunteer.name} ${volunteer.lastName}`}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                Email
              </p>
              <p className="text-white font-semibold break-all">
                {volunteer.email}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                Phone
              </p>
              <p className="text-white font-semibold">{volunteer.phone}</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30">
              <svg
                className="size-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Availability</h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-white/50 mb-3">
                Available Days
              </p>
              <div className="flex flex-wrap gap-2">
                {volunteer.availableDays.map((day) => (
                  <span
                    key={day}
                    className="rounded-xl border-2 border-[#19e6b3]/30 bg-[#19e6b3]/10 px-4 py-2 text-sm font-semibold text-[#19e6b3] shadow-[0_0_15px_rgba(25,230,179,0.15)]"
                  >
                    {dictionaryDays(day)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-white/50 mb-3">
                Preferred Schedule
              </p>
              <div className="space-y-2">
                {volunteer.availability.map((slot) => (
                  <div
                    key={slot}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-xl">
                      {slot === "morning"
                        ? "☀️"
                        : slot === "afternoon"
                          ? "🌤️"
                          : "🌙"}
                    </span>
                    <span className="font-semibold text-white">
                      {dictionaryAvailability(slot)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30">
            <svg
              className="size-6 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Areas of Interest</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {volunteer.areasOfInterest.map((area) => (
            <div
              key={area}
              className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-center font-semibold text-white/80 transition-all duration-200 hover:border-[#19e6b3]/50 hover:bg-[#19e6b3]/5 hover:text-white"
            >
              {area.charAt(0).toUpperCase() + area.slice(1)}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💭</span>
            <h2 className="text-xl font-bold text-white">Motivation</h2>
          </div>
          <p className="mt-4 text-white/80 leading-relaxed border-l-4 border-emerald-500/50 pl-4 italic">
            &quot;{volunteer.whyVolunteer}&quot;
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⭐</span>
            <h2 className="text-xl font-bold text-white">Skills</h2>
          </div>
          <p className="mt-4 text-white/80 leading-relaxed">
            {volunteer.specialSkills || (
              <span className="text-white/50 italic">No information</span>
            )}
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/5 p-6 backdrop-blur shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-red-500/20 to-red-600/10 border border-red-500/30">
            <svg
              className="size-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">
            Emergency Contact
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Name
            </p>
            <p className="text-white font-semibold">
              {volunteer.emergencyContactName}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Phone
            </p>
            <p className="text-white font-semibold">
              {volunteer.emergencyContactPhone}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-white/10 bg-linear-to-br from-emerald-500/5 via-transparent to-[#19e6b3]/10 p-6 backdrop-blur shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30">
            <svg
              className="size-6 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Authorizations</h2>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
          <div
            className={`flex items-center justify-center size-12 rounded-xl border-2 ${
              volunteer.privacyAgreement
                ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "border-red-400 bg-red-500/20"
            }`}
          >
            {volunteer.privacyAgreement ? (
              <svg
                className="size-7 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="size-7 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p
              className={`font-semibold ${volunteer.privacyAgreement ? "text-emerald-400" : "text-red-400"}`}
            >
              {volunteer.privacyAgreement
                ? "✓ Terms Accepted"
                : "✗ Pending Acceptance"}
            </p>
            <p className="mt-1 text-sm text-white/70 leading-relaxed">
              {volunteer.privacyAgreement
                ? "The volunteer accepted the terms and conditions along with the privacy policy."
                : "Pending acceptance of terms and conditions."}
            </p>
          </div>
        </div>
      </section>

      <VolunteerModalForm
        isOpen={isEditModalOpen}
        onCloseAction={handleCloseModal}
        volunteer={volunteer}
        token={token}
      />
    </main>
  );
}

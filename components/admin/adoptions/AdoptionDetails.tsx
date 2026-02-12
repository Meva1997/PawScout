"use client";
import Link from "next/link";
import { getAdoptionRequestById, getAnimalById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { AdoptSchemaType } from "@/schemas/adopt-schema";
import Image from "next/image";
import PendingSpinner from "@/components/ui/PendingSpinner";

export default function AdoptionDetails({ token }: { token: string }) {
  const params = useParams<{ slug: string }>();

  const { data, isError, isPending } = useQuery({
    queryKey: ["adoptionRequestDetails", params.slug],
    queryFn: () => getAdoptionRequestById(token, Number(params.slug)),
  });

  const {
    data: pet,
    isError: isPetError,
    isPending: isPetPending,
  } = useQuery({
    queryKey: ["animal", data?.animalId],
    queryFn: () => getAnimalById(Number(data?.animalId)),
  });

  const request: AdoptSchemaType = data;

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto text-red-500 font-semibold mb-6 text-center">
        Error al cargar la solicitud de adopción.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto text-white font-semibold my-6 pt-10 animate-pulse text-center">
        Cargando solicitud de adopción...
        <PendingSpinner />
      </div>
    );
  }

  return (
    <>
      {/* Scrollable Content */}
      <section className="flex justify-center rounded-4xl border border-white/10 bg-[#0f1614]/80 p-6 lg:p-10 shadow-[0_35px_120px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/50">
              <Link
                href="/admin/adoptions"
                className="font-semibold text-white/70 hover:text-white"
              >
                Solicitudes
              </Link>
              <span>/</span>
              <span className="text-white">
                {request.applicantName} {request.applicantLastName}
              </span>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                    Perfil del Solicitante
                  </p>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                    {request.applicantName} {request.applicantLastName}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                      request.status === "pending"
                        ? "border-yellow-400/30 bg-yellow-500/10 text-yellow-300"
                        : request.status === "approved"
                          ? "border-green-400/30 bg-green-500/10 text-green-300"
                          : "border-red-400/30 bg-red-500/10 text-red-300"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full animate-pulse ${
                        request.status === "pending"
                          ? "bg-yellow-300"
                          : request.status === "approved"
                            ? "bg-green-300"
                            : "bg-red-300"
                      }`}
                      aria-hidden
                    ></span>
                    {request.status}
                  </span>
                  <span>{`ID de Solicitud: ${request.id}`}</span>
                  <span>•</span>
                  <span>{`Enviado el: ${new Date(request.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}`}</span>
                </div>
              </div>
              {/* <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white">
                  ✉︎ Email
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:text-white">
                  ✕ Rechazar
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#19e6b3] px-5 py-2.5 text-sm font-bold text-[#0d1513] shadow-[0_0_25px_rgba(25,230,179,0.35)] transition hover:scale-[1.02]">
                  ✓ Aprobar
                </button>
              </div> */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <article className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur">
                <div className="mx-auto mb-4 size-32 rounded-full border-4 border-white/20 bg-linear-to-br from-[#19e6b3] to-emerald-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {request.applicantName.charAt(0)}
                    {request.applicantLastName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {request.applicantName} {request.applicantLastName}
                </h3>
                <p className="text-sm text-white/60">{request.occupation}</p>
              </article>
              <article className=" rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  Contacto
                </p>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-white wrap-break-word">
                      {request.email}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Teléfono
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {request.phone}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Dirección
                    </p>
                    <p className="text-sm font-semibold text-white wrap-break-word">
                      {request.address}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {request.city}, {request.state} {request.zipCode}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  Información del Hogar
                </p>
                <div className="mt-4 flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Tipo de Vivienda
                    </p>
                    <p className="text-sm font-semibold text-white capitalize">
                      {request.homeType === "house"
                        ? "Casa"
                        : request.homeType === "apartment"
                          ? "Apartamento"
                          : request.homeType}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Quién vive en casa
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {request.whoLivesInHouse}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              {isPetPending ? (
                <p>Cargando información del animal...</p>
              ) : isPetError ? (
                <p>Error al cargar la información del animal.</p>
              ) : (
                <article className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  Animal a adoptar
                  <div className="mt-4 flex items-center gap-4">
                    <div className="size-20 rounded-2xl border border-white/20">
                      <Image
                        src={
                          pet?.media?.[0]?.url || "/images/placeholder-dog.png"
                        }
                        alt={pet?.name || "Pet Image"}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover rounded-2xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {pet?.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {pet?.type === "Dog"
                          ? "Perro"
                          : pet?.type === "Cat"
                            ? "Gato"
                            : pet?.type}{" "}
                        • {pet?.breed} • {pet?.age} años •{" "}
                        {pet?.gender === "Female"
                          ? "Hembra"
                          : pet?.gender === "Male"
                            ? "Macho"
                            : pet?.gender}
                      </p>
                    </div>
                  </div>
                </article>
              )}
              <article className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    Detalles de la solicitud
                  </h3>
                </div>
                <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Fecha de nacimiento
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {new Date(request.birthdate).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Ocupación
                    </p>
                    <p className="mt-1 text-sm font-medium text-white capitalize">
                      {request.occupation}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Términos Aceptados
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {request.agreeToTerms ? "✓ Sí" : "✗ No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Animal ID
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      #{request.animalId}
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="border-b border-white/5 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    Cuestionario
                  </h3>
                </div>
                <div className="flex flex-col gap-6 px-6 py-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      ¿Por qué desea adoptar esta mascota?
                    </p>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      &quot;{request.reasonForAdoption}&quot;
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      ¿Cuál es su experiencia con mascotas?
                    </p>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      &quot;{request.experienceWithPets}&quot;
                    </p>
                  </div>
                </div>
              </article>

              {/* Sección de notas internas - por implementar */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

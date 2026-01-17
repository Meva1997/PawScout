import Link from "next/link";
import type { ReactNode } from "react";
const dayLabels: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

const areaLabels: Record<string, string> = {
  animalCare: "Cuidado de animales",
  eventPlanning: "Planificación de eventos",
  fundraising: "Recaudación de fondos",
  administrativeSupport: "Apoyo administrativo",
  outreach: "Alcance comunitario",
  other: "Otro",
};

type VolunteerDetails = {
  id: string;
  status: "Activo" | "Pendiente" | "Inactivo";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  availability: string[];
  preferredTime: string;
  areas: string[];
  motivation: string;
  specialSkills: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  acceptedTerms: boolean;
  createdAt: string;
};

const volunteers: VolunteerDetails[] = [
  {
    id: "1",
    status: "Activo",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    phone: "+52 123 456 7890",
    availability: ["monday", "wednesday", "friday"],
    preferredTime: "morning",
    areas: ["animalCare", "outreach"],
    motivation:
      "Quiero apoyar al refugio porque amo a los perros rescatados y puedo comprometerme varias veces por semana.",
    specialSkills: "Entrenamiento básico, fotografía",
    emergencyContactName: "María López",
    emergencyContactPhone: "+52 555 321 9999",
    acceptedTerms: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    status: "Pendiente",
    firstName: "Ana",
    lastName: "Ruiz",
    email: "ana.ruiz@example.com",
    phone: "+52 555 666 7777",
    availability: ["tuesday", "thursday"],
    preferredTime: "afternoon",
    areas: ["fundraising", "eventPlanning", "other"],
    motivation:
      "Tengo experiencia organizando eventos de recaudación y quiero aplicarlo en PawScout.",
    specialSkills: "Gestión de proyectos, copywriting",
    emergencyContactName: "Carlos Ruiz",
    emergencyContactPhone: "+52 555 888 4444",
    acceptedTerms: true,
    createdAt: "2024-02-02",
  },
];

const formatPreferredTime: Record<string, string> = {
  morning: "Mañana",
  afternoon: "Tarde",
  evening: "Noche",
};

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        {label}
      </p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default function VolunteerDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const volunteer =
    volunteers.find((person) => person.id === params.slug) ?? volunteers[0];

  return (
    <main className="space-y-8">
      <div className="mb-4 text-md text-white/70">
        Regresar a{" "}
        <Link
          href="/admin/volunteers"
          className="text-emerald-300 hover:underline cursor-pointer transition-all"
        >
          la lista de voluntarios
        </Link>
      </div>
      <header className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/40">
              Voluntario #{volunteer.id}
            </p>
            <h1 className="text-3xl font-semibold">
              {volunteer.firstName} {volunteer.lastName}
            </h1>
            <p className="text-white/70">Registrado el {volunteer.createdAt}</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            {volunteer.status}
          </span>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">
            Información Personal
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <DetailItem
              label="Nombre"
              value={`${volunteer.firstName} ${volunteer.lastName}`}
            />
            <DetailItem label="Correo" value={volunteer.email} />
            <DetailItem label="Teléfono" value={volunteer.phone} />
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Disponibilidad</h2>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-white/60">Días disponibles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {volunteer.availability.map((day) => (
                  <span
                    key={day}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-white"
                  >
                    {dayLabels[day]}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-white/60">Horario preferido</p>
              <p className="text-lg font-semibold text-white">
                {formatPreferredTime[volunteer.preferredTime]}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Áreas de interés</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {volunteer.areas.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80"
            >
              {areaLabels[area]}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Motivación</h2>
          <p className="mt-4 text-white/80">{volunteer.motivation}</p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Habilidades</h2>
          <p className="mt-4 text-white/80">
            {volunteer.specialSkills || "Sin información"}
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">
          Contacto de emergencia
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <DetailItem label="Nombre" value={volunteer.emergencyContactName} />
          <DetailItem
            label="Teléfono"
            value={volunteer.emergencyContactPhone}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Autorizaciones</h2>
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`size-10 rounded-full border-2 ${
              volunteer.acceptedTerms
                ? "border-emerald-400 bg-emerald-500/20"
                : "border-red-400 bg-red-500/20"
            }`}
          />
          <p className="text-white/80">
            {volunteer.acceptedTerms
              ? "El voluntario aceptó los términos y condiciones."
              : "Pendiente de aceptar términos y condiciones."}
          </p>
        </div>
      </section>
    </main>
  );
}

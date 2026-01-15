import Link from "next/link";

const applicantProfile = {
  name: "Sarah Jenkins",
  status: "Pending Review",
  applicationId: "Application #4923",
  submittedAt: "Enviado hace 2 días",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqJHtKVt5_KujYopBR36FRNfPlVs28iarAj5QKgWCdj_ChojJIRo5DA8YtPlYoPfT2FKScOLwwdrGx1v06RecL3Gi6XOT2ZTkyE3t1eBOwl3pVBemZQVnwOPplLbor5wb5qLuh5oh5cnPKWl2eLUyqZVhgZcFW0-_XXF60No4UlFmcCLKWaVZe86hs1GfTMlOH3nCZ-Ej58R7aLKrkCCARwcAQ3Vi4LmcW4_S9ZG9BPqwwSYMAYxjBEgooODGsiw-zshUs-oCS_M",
  title: "Aplicante a adopción",
  location: "Portland, OR",
};

const contactFields = [
  { label: "Teléfono", value: "+1 (555) 123-4567" },
  { label: "Email", value: "sarah.j@example.com" },
  { label: "Ubicación", value: "Portland, OR" },
];

const interestTags = ["Paseos", "Eventos", "Hogar temporal", "Fotografía"];

const skillMatrix = [
  { label: "Dog Handling", level: 4 },
  { label: "Administración", level: 2 },
  { label: "Eventos comunitarios", level: 3 },
];

const questionnaire = [
  {
    question: "¿Por qué quieres adoptar con PawScout?",
    answer:
      "Siempre he tenido perros rescatados en casa. Mudarnos a Portland me dejó tiempo libre los fines de semana y quiero dedicarlo a un proceso responsable. Me inspira la política no-kill y los programas comunitarios de PawScout.",
  },
  {
    question: "Experiencia previa cuidando mascotas",
    answer:
      "Crecí con dos Golden Retrievers y he sido hogar temporal en tres ocasiones. Manejo refuerzo positivo básico y no tengo problema con razas grandes.",
  },
];

const notes = [
  {
    author: "Alex Morgan (Admin)",
    timestamp: "Ayer • 14:30",
    text: "Revisión de referencias completa. La anterior familia de acogida resaltó su puntualidad y paciencia.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoPNTgDyfEOJjyIw59TB6OHIIkBLYi9PDxalXDSnFIm1yOK7ZZvU4hfb2bQg_GqjkJ0-KSSbj2fdmQiXLzTS10ov01SiePX63wRxy0YppkpvaGcuj1UUJQH4Vp5gpHljKSUlORB-c4lssWKjU5XEhHzjstQp7u95PsyXcT3qbKZdzyxf5V8-qSL_yGPrcjkcKDZq50GzGi-4WPCrGFXMmZs86ggLrf3WH7XRhUx_oJNZrJtqr0-2D9cHfjWECHwKsupEgYZALmRRg",
  },
];

export default function page() {
  return (
    <>
      <section className="my-8">
        <Link
          href="/admin/adoptions"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/50 transition hover:text-[#19e6b3]"
        >
          <span aria-hidden>←</span>
          Volver a solicitudes
        </Link>
      </section>

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
              <span className="text-white">{applicantProfile.name}</span>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                    Perfil
                  </p>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                    {applicantProfile.name}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow-300">
                    <span
                      className="size-2 rounded-full bg-yellow-300 animate-pulse"
                      aria-hidden
                    ></span>
                    {applicantProfile.status}
                  </span>
                  <span>{applicantProfile.applicationId}</span>
                  <span>•</span>
                  <span>{applicantProfile.submittedAt}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white">
                  ✉︎ Email
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:text-white">
                  ✕ Rechazar
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#19e6b3] px-5 py-2.5 text-sm font-bold text-[#0d1513] shadow-[0_0_25px_rgba(25,230,179,0.35)] transition hover:scale-[1.02]">
                  ✓ Aprobar
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <article className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur">
                <div
                  className="mx-auto mb-4 size-32 rounded-full border-4 border-white/20"
                  style={{
                    backgroundImage: `url(${applicantProfile.avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <h3 className="text-xl font-bold text-white">
                  {applicantProfile.name}
                </h3>
                <p className="text-sm text-white/60">
                  {applicantProfile.title}
                </p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-[#111c19] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  Contacto
                </p>
                <div className="mt-4 flex flex-col gap-4">
                  {contactFields.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left"
                    >
                      <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-white wrap-break-word">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-[#111c19] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                  Intereses
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interestTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-2xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/40">
                  Habilidades
                </p>
                <div className="mt-3 flex flex-col gap-3">
                  {skillMatrix.map((skill) => (
                    <div
                      key={skill.label}
                      className="flex items-center justify-between lg:flex-col xl:flex-row text-center xl:text-left text-sm text-white/70"
                    >
                      <span>{skill.label}</span>
                      <div className="flex flex-row gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`size-2 rounded-full ${
                              index < skill.level
                                ? "bg-[#19e6b3]"
                                : "bg-white/15"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-8">
              <article className="rounded-3xl border border-white/10 bg-[#0e1816] p-6">
                Animal a adoptar
                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="size-20 rounded-2xl border border-white/20"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Maximus
                    </h3>
                    <p className="text-sm text-white/70">
                      Labrador Retriever • 3 años • Macho
                    </p>
                  </div>
                </div>
              </article>
              <article className="rounded-3xl border border-white/10 bg-[#0e1816]">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    Detalles de la solicitud
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                    Edición
                  </span>
                </div>
                <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Fecha de nacimiento
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      15 Marzo 1994 (29 años)
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Licencia
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Vigente • Estado OR
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Ocupación
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Diseñadora gráfica (freelance)
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Contacto de emergencia
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Michael Jenkins • +1 (555) 987-6543
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-[#0e1816]">
                <div className="border-b border-white/5 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    Cuestionario
                  </h3>
                </div>
                <div className="flex flex-col gap-6 px-6 py-6">
                  {questionnaire.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm font-semibold text-white">
                        {item.question}
                      </p>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        “{item.answer}”
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-[#0e1816] p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Notas internas
                  </h3>
                  <button className="rounded-2xl border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    Añadir
                  </button>
                </div>
                <div className="mt-4 flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div
                    className="size-12 rounded-full border border-white/20"
                    style={{
                      backgroundImage: `url(${notes[0].avatar})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <textarea
                    className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-transparent p-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    placeholder="Añade una observación sobre esta solicitud..."
                  ></textarea>
                </div>
                <div className="mt-6 space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.timestamp}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span className="font-semibold text-white">
                          {note.author}
                        </span>
                        <span>{note.timestamp}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/80">{note.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

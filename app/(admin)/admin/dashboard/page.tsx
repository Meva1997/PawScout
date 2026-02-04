import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth/dal";
import { getAdminStats, getAllAnimals } from "@/api/api";
import { DashboardSchema } from "@/schemas/dashboard-schema";
import { DogsDataType } from "@/db/dogs";

type Stat = {
  title: string;
  value: number;
};

export default async function page() {
  await verifySession();

  // Recuperar el token de la cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("pawscout_token")?.value;

  // Si no hay token, verifySession ya debería haber redirigido
  if (!token) {
    throw new Error("No authentication token found");
  }

  const adminStats: DashboardSchema = await getAdminStats(token);
  const animalsResponse = await getAllAnimals();
  const animals: DogsDataType[] = animalsResponse.animals;

  const generalStats: Stat[] = [
    { title: "Animales en total", value: adminStats.stats.total_animals },
    { title: "Adopciones este mes", value: adminStats.stats.total_adoptions },
    { title: "Usuarios", value: adminStats.stats.total_users },
    { title: "Voluntarios", value: adminStats.stats.total_volunteers },
  ];

  return (
    <>
      <section className="my-6 flex items-center justify-between">
        <article>
          <h1 className="text-3xl font-bold text-white">
            Panel de Administración
          </h1>
          <p>Bienvenido al panel de administración de PawScout.</p>
        </article>
        <article>
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition-all hover:cursor-pointer">
            Ultimos 30 días ▼
          </button>
        </article>
      </section>
      <section className="my-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {generalStats.map((stat) => (
          <article
            key={stat.title}
            className="bg-emerald-950/30 p-6 flex flex-col wrap-break-word gap-4
            rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <p>{stat.title}:</p>
            <span className="text-4xl font-bold">{stat.value}</span>
          </article>
        ))}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-20">
        <article className="md:col-span-2 flex flex-col">
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-6 p-6">
            <h2 className="text-xl font-semibold text-white">
              Actividad Reciente de adopciones
            </h2>
            <p>Variaciones en las adopciones de los ultimos meses.</p>
            <div>
              {/* Placeholder for chart or data visualization TODO:Chart */}
              <div className="mt-6 h-48 bg-white/10 rounded-2xl flex items-center justify-center text-white/50">
                [Gráfico de Actividad de Adopciones]
              </div>
            </div>
          </div>
          <div className="rounded-2xl space-y-6 border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            {/* Placeholder for recent activities list */}
            <h3 className=" text-lg font-semibold text-white">
              Animales agregados recientemente
            </h3>
            <ul className="space-y-4">
              {animals.map((animal) => (
                <li
                  key={animal.name}
                  className="flex justify-between border-b border-white/10 pb-2"
                >
                  <div>
                    <p className="font-semibold text-white">{animal.name}</p>
                    <p className="text-sm text-white/60">{animal.breed}</p>
                  </div>
                  <div className="flex flex-col justify-end">
                    <span className="text-white/80 text-sm">
                      ID: {animal.id}
                    </span>
                    {/*TODO: Add date field to animal data */}
                    <span className="text-white/80 text-sm">
                      Date added: {/* Placeholder date */}2024-06-01
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Donation statistics and urgent cases section */}
        <article className=" flex flex-col col-span-1 mx-auto w-full">
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-6 p-6 ">
            <h3 className="text-xl font-semibold text-white">
              Estadísticas de Donaciones
            </h3>
            <p>Resumen de las donaciones recibidas.</p>
            <div>
              {/* Placeholder for chart or data visualization TODO:Chart */}
              <div className="mt-6 h-48 bg-white/10 rounded-2xl flex items-center justify-center text-white/50">
                [Gráfico de Estadísticas de Donaciones]
              </div>
            </div>
          </div>
          {/*Urgent cases section*/}
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-6 p-6 ">
            <h3 className="text-xl font-semibold text-white">Casos Urgentes</h3>
            <p>Animales que necesitan atención inmediata.</p>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between">
                <span>Perro herido encontrado en la calle</span>
                <span className="text-red-500 font-semibold">¡Urgente!</span>
              </li>
              <li className="flex justify-between">
                <span>Gato enfermo necesita medicación</span>
                <span className="text-red-500 font-semibold">¡Urgente!</span>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}

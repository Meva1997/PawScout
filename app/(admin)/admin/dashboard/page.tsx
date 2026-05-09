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

  const cookieStore = await cookies();
  const token = cookieStore.get("pawscout_token")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const adminStats: DashboardSchema = await getAdminStats(token);
  const animalsResponse = await getAllAnimals();
  const animals: DogsDataType[] = animalsResponse.animals;

  const generalStats: Stat[] = [
    { title: "Total Animals", value: adminStats.stats.total_animals },
    { title: "Adoptions This Month", value: adminStats.stats.total_adoptions },
    { title: "Users", value: adminStats.stats.total_users },
    { title: "Volunteers", value: adminStats.stats.total_volunteers },
  ];

  return (
    <>
      <section className="my-6 flex items-center justify-between">
        <article>
          <h1 className="text-3xl font-bold text-white">
            Administration Panel
          </h1>
          <p>Welcome to the PawScout administration panel.</p>
        </article>
        <article>
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition-all hover:cursor-pointer">
            Last 30 Days ▼
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
              Recent Adoption Activity
            </h2>
            <p>Adoption trends over the past months.</p>
            <div>
              {/* Placeholder for chart or data visualization TODO:Chart */}
              <div className="mt-6 h-48 bg-white/10 rounded-2xl flex items-center justify-center text-white/50">
                [Adoption Activity Chart]
              </div>
            </div>
          </div>
          <div className="rounded-2xl space-y-6 border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <h3 className=" text-lg font-semibold text-white">
              Recently Added Animals
            </h3>
            <ul className="space-y-4">
              {animals.map((animal) => (
                <li
                  key={animal.id}
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
              Donation Statistics
            </h3>
            <p>Summary of donations received.</p>
            <div>
              {/* Placeholder for chart or data visualization TODO:Chart */}
              <div className="mt-6 h-48 bg-white/10 rounded-2xl flex items-center justify-center text-white/50">
                [Donation Statistics Chart]
              </div>
            </div>
          </div>
          {/*Urgent cases section*/}
          <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mb-6 p-6 ">
            <h3 className="text-xl font-semibold text-white">Urgent Cases</h3>
            <p>Animals that need immediate attention.</p>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between">
                <span>Injured dog found on the street</span>
                <span className="text-red-500 font-semibold">Urgent!</span>
              </li>
              <li className="flex justify-between">
                <span>Sick cat needs medication</span>
                <span className="text-red-500 font-semibold">Urgent!</span>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}

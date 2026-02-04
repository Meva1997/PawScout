import { getAllAnimals } from "@/api/api";
import { DogsDataType } from "@/db/dogs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const tableHeaders = [
  "Imagen",
  "Nombre",
  "Especie / Edad",
  "Status",
  "Acciones",
];

export default function PetsTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: getAllAnimals,
  });

  const animals: DogsDataType[] = Array.isArray(data?.animals)
    ? data.animals
    : [];

  const statusBadge = (available: string) => {
    if (available === "available") {
      return "text-green-500";
    } else if (available === "adopted") {
      return "text-red-500";
    } else {
      return "text-yellow-500";
    }
  };

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 animate-pulse">
        Error al cargar los datos de las mascotas.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-10 text-white/60 animate-pulse">
        Cargando datos de las mascotas...
      </div>
    );
  }

  return (
    <>
      {/* Mobile-friendly cards */}
      <div className="space-y-4 md:hidden">
        {animals.map((animal) => (
          <article
            key={`${animal.id}`}
            className="rounded-2xl border border-white/10 bg-white/5/20 p-4 text-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="size-14 rounded-xl bg-white/10">
                <Image
                  src={animal.media?.[0]?.url}
                  alt={animal.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {animal.name}
                </p>
                <p className="text-sm text-white/60">
                  {animal.breed} · {animal.age}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p className={statusBadge(animal.availableForAdoption)}>
                {animal.availableForAdoption}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <button className="text-[#19e6b3] hover:underline hover:cursor-pointer">
                Editar
              </button>
              <button className="text-red-500 hover:underline hover:cursor-pointer">
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden rounded-2xl border border-white/10 bg-white/5/10 p-2 md:block">
        <div className="w-full overflow-x-auto">
          <table className="min-w-180 w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-white/60">
                {tableHeaders.map((header, index) => (
                  <th key={index} className="py-3 px-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {animals.map((animal, index) => (
                <tr
                  key={`${animal.name}-desktop-${index}`}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 px-4">
                    <div className="size-12 rounded-lg bg-white/10">
                      <Image
                        src={animal.media?.[0]?.url}
                        alt={animal.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">{animal.name}</td>
                  <td className="py-3 px-4">
                    {animal.breed} / {animal.age}
                  </td>

                  <td
                    className={`py-3 px-4 ${statusBadge(animal.availableForAdoption)}`}
                  >
                    {animal.availableForAdoption}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                      <button className="text-sm text-[#19e6b3] hover:underline hover:cursor-pointer">
                        Editar
                      </button>
                      <button className="text-sm text-red-500 hover:underline hover:cursor-pointer">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*TODO: Pagination */}
    </>
  );
}

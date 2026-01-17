type AnimalInfo = {
  name: string;
  species: string;
  age: string;
  location: string;
  status: string;
};

const tableHeaders = [
  "Imagen",
  "Nombre",
  "Especie / Edad",
  "Ubicación",
  "Status",
  "Acciones",
];

const animalInfo: AnimalInfo[] = [
  {
    name: "Max",
    species: "Perro",
    age: "3 años",
    location: "Cuarto numero 5",
    status: "Adoptado",
  },
  {
    name: "Luna",
    species: "Gato",
    age: "2 años",
    location: "Cuarto numero 3",
    status: "Disponible",
  },
  {
    name: "Charlie",
    species: "Perro",
    age: "4 años",
    location: "Cuarto numero 1",
    status: "Adoptado",
  },
  {
    name: "Bella",
    species: "Gato",
    age: "1 año",
    location: "Cuarto numero 4",
    status: "Disponible",
  },
];

export default function PetsTable() {
  function getStatusClass(status: string) {
    switch (status) {
      case "Adoptado":
        return "text-green-500";
      case "Disponible":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  }
  return (
    <>
      {/* Mobile-friendly cards */}
      <div className="space-y-4 md:hidden">
        {animalInfo.map((animal, index) => (
          <article
            key={`${animal.name}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/5/20 p-4 text-white/80"
          >
            <div className="flex items-center gap-3">
              <div className="size-14 rounded-xl bg-white/10"></div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {animal.name}
                </p>
                <p className="text-sm text-white/60">
                  {animal.species} · {animal.age}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-white/50">Ubicación:</span>{" "}
                {animal.location}
              </p>
              <p className={getStatusClass(animal.status)}>{animal.status}</p>
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
              {animalInfo.map((animal, index) => (
                <tr
                  key={`${animal.name}-desktop-${index}`}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="py-3 px-4">
                    <div className="size-12 rounded-lg bg-white/10"></div>
                  </td>
                  <td className="py-3 px-4">{animal.name}</td>
                  <td className="py-3 px-4">
                    {animal.species} / {animal.age}
                  </td>
                  <td className="py-3 px-4">{animal.location}</td>
                  <td className={`py-3 px-4 ${getStatusClass(animal.status)}`}>
                    {animal.status}
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

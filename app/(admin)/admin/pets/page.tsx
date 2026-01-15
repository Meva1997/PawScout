export default function page() {
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
      <section className="my-10 flex items-center justify-between ">
        <article>
          <h1 className="text-3xl font-bold text-white">Gestión de Animales</h1>
          <p className="mt-2 text-white/70">
            Administra la información de los animales en el refugio.
          </p>
        </article>
        <article>
          <button className="rounded-2xl bg-[#19e6b3] px-3 py-3 text-sm font-semibold text-[#0c1412] transition hover:bg-[#16caa0]">
            + Agregar Nuevo Animal
          </button>
          <button className="ml-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Filtros
          </button>
        </article>
      </section>
      <section>
        <table className="w-full table-auto border-collapse">
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
            {/* Ejemplo de fila */}
            {animalInfo.map((animal, index) => (
              <tr
                key={index}
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
                <td className="py-3 px-4 flex flex-col">
                  <button className="text-sm text-[#19e6b3] hover:underline hover:cursor-pointer">
                    Editar
                  </button>
                  <button className="text-sm text-red-500 hover:underline hover:cursor-pointer">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*TODO: Pagination */}
      </section>
    </>
  );
}

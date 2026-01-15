"use client";
import { useState, useEffect } from "react";
import type { DogsDataType } from "@/db/dogs";

interface AdoptListFilterProps {
  dogs: DogsDataType[];
  onFilterChange?: (filteredDogs: DogsDataType[]) => void;
}

export default function AdoptListFilter({
  dogs,
  onFilterChange,
}: AdoptListFilterProps) {
  const [filters, setFilters] = useState({
    age: [] as string[],
    size: [] as string[],
    gender: [] as string[],
    availability: ["Disponible"] as string[],
  });
  const [sortBy, setSortBy] = useState("name");

  // Opciones de filtrado extraídas de los datos
  const ageOptions = ["1 año", "6 años", "7 años", "8 años", "10 años"];
  const sizeOptions = ["Pequeño", "Mediano", "Grande"];
  const genderOptions = ["Macho", "Hembra"];
  const availabilityOptions = ["Disponible", "Adoptado"];

  // Función para alternar filtros
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Filtrar y ordenar perros
  useEffect(() => {
    if (!dogs || !Array.isArray(dogs)) {
      if (onFilterChange && typeof onFilterChange === "function") {
        onFilterChange([]);
      }
      return;
    }

    const filtered = dogs.filter((dog) => {
      return (
        (filters.age.length === 0 || filters.age.includes(dog.age)) &&
        (filters.size.length === 0 || filters.size.includes(dog.size)) &&
        (filters.gender.length === 0 || filters.gender.includes(dog.gender)) &&
        (filters.availability.length === 0 ||
          filters.availability.includes(dog.availability))
      );
    });

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return parseInt(a.age) - parseInt(b.age);
        case "size":
          const sizeOrder = { Pequeño: 1, Mediano: 2, Grande: 3 };
          return (
            sizeOrder[a.size as keyof typeof sizeOrder] -
            sizeOrder[b.size as keyof typeof sizeOrder]
          );
        default:
          return 0;
      }
    });

    if (onFilterChange && typeof onFilterChange === "function") {
      onFilterChange(filtered);
    }
  }, [filters, sortBy, dogs, onFilterChange]);

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({
      age: [],
      size: [],
      gender: [],
      availability: ["Disponible"],
    });
  };

  return (
    <section className="sticky top-0 z-40 max-w-6xl mx-auto rounded-3xl shadow-xl border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Filtros */}
        <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center gap-2 pr-4">
            <span className="flex items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-600">
              🔍
            </span>
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              Filtros:
            </span>
          </div>

          {/* Filtros de Edad */}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          {ageOptions.map((age) => (
            <button
              key={age}
              onClick={() => toggleFilter("age", age)}
              className={`flex h-8 shrink-0 items-center justify-center rounded-full border px-4 transition-all ${
                filters.age.includes(age)
                  ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="text-sm font-medium">{age}</span>
            </button>
          ))}

          {/* Filtros de Tamaño */}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => toggleFilter("size", size)}
              className={`flex h-8 shrink-0 items-center justify-center rounded-full border px-4 transition-all ${
                filters.size.includes(size)
                  ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="text-sm font-medium">{size}</span>
            </button>
          ))}

          {/* Filtros de Género */}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          {genderOptions.map((gender) => (
            <button
              key={gender}
              onClick={() => toggleFilter("gender", gender)}
              className={`flex h-8 shrink-0 items-center justify-center rounded-full border px-4 transition-all ${
                filters.gender.includes(gender)
                  ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="text-sm font-medium">{gender}</span>
            </button>
          ))}

          {/* Filtros de Disponibilidad */}
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          {availabilityOptions.map((status) => (
            <button
              key={status}
              onClick={() => toggleFilter("availability", status)}
              className={`flex h-8 shrink-0 items-center justify-center rounded-full border px-4 transition-all ${
                filters.availability.includes(status)
                  ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="text-sm font-medium">{status}</span>
            </button>
          ))}

          {/* Botón Limpiar */}
          <button
            onClick={clearAllFilters}
            className="ml-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Limpiar todo
          </button>
        </div>

        {/* Ordenamiento y contador */}
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-sm text-gray-500">
            Mostrando{" "}
            {!dogs || !Array.isArray(dogs)
              ? 0
              : dogs.filter((dog) => {
                  return (
                    (filters.age.length === 0 ||
                      filters.age.includes(dog.age)) &&
                    (filters.size.length === 0 ||
                      filters.size.includes(dog.size)) &&
                    (filters.gender.length === 0 ||
                      filters.gender.includes(dog.gender)) &&
                    (filters.availability.length === 0 ||
                      filters.availability.includes(dog.availability))
                  );
                }).length}{" "}
            perros
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 rounded-lg border-gray-200 bg-white text-sm text-gray-700 focus:border-emerald-400 focus:ring-emerald-400"
            >
              <option value="name">Nombre</option>
              <option value="age">Edad</option>
              <option value="size">Tamaño</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

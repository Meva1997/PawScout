"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { DogsDataType } from "@/db/dogs";
import { useParams } from "next/navigation";
import {
  getAdoptFilterContent,
  getAdoptCardsContent,
} from "@/lib/i18n/ui/adopt-cards";

interface AdoptListFilterProps {
  animals: DogsDataType[];
  onFilterChange?: (filteredDogs: DogsDataType[]) => void;
}

export default function AdoptListFilter({
  animals,
  onFilterChange,
}: AdoptListFilterProps) {
  const params = useParams<{ lang?: string }>();
  const { content: filterContent } = getAdoptFilterContent(params?.lang);
  const { content: cardsContent } = getAdoptCardsContent(params?.lang);

  const [filters, setFilters] = useState({
    age: [] as string[],
    size: [] as string[],
    gender: [] as string[],
    availability: [] as string[],
  });
  const [sortBy, setSortBy] = useState("name");

  // Clasificar edad en categorías
  const getAgeCategory = (age: number): string => {
    if (age >= 0 && age <= 2) return "Puppy";
    if (age > 2 && age <= 5) return "Young";
    if (age > 5 && age <= 10) return "Adult";
    return "Senior";
  };

  // Filtrar por categoría de edad
  const filterByAgeCategory = (
    dog: DogsDataType,
    categories: string[],
  ): boolean => {
    if (categories.length === 0) return true;
    const ageCategory = getAgeCategory(dog.age);
    return categories.includes(ageCategory);
  };

  // Opciones de filtrado
  const ageCategories = ["Puppy", "Young", "Adult", "Senior"];
  const sizeOptions = ["Small", "Medium", "Large"];
  const genderOptions = ["Male", "Female"];
  const availabilityOptions = ["available", "pending", "adopted"];

  // Alternar filtros
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    if (!animals || !Array.isArray(animals)) {
      onFilterChange?.([]);
      return;
    }

    const filtered = animals.filter((dog) => {
      return (
        filterByAgeCategory(dog, filters.age) &&
        (filters.size.length === 0 || filters.size.includes(dog.size)) &&
        (filters.gender.length === 0 || filters.gender.includes(dog.gender)) &&
        (filters.availability.length === 0 ||
          filters.availability.includes(dog.availableForAdoption))
      );
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "age":
          return a.age - b.age;
        case "size":
          const sizeOrder = { Small: 1, Medium: 2, Large: 3 };
          return (
            sizeOrder[a.size as keyof typeof sizeOrder] -
            sizeOrder[b.size as keyof typeof sizeOrder]
          );
        default:
          return 0;
      }
    });

    onFilterChange?.(filtered);
  }, [filters, sortBy, animals]);

  // Limpiar filtros
  const clearAllFilters = () => {
    setFilters({
      age: [],
      size: [],
      gender: [],
      availability: [],
    });
  };

  // Contador por categoría
  const getAgeCount = (category: string) => {
    return animals.filter((dog) => getAgeCategory(dog.age) === category).length;
  };

  // Iconos para cada categoría
  const ageIcons = {
    Puppy: "🐶",
    Young: "🐕",
    Adult: "🦮",
    Senior: "🐕‍🦺",
  };

  const sizeIcons = {
    Small: "🐾",
    Medium: "🐾🐾",
    Large: "🐾🐾🐾",
  };

  const genderIcons = {
    Male: "♂️",
    Female: "♀️",
  };

  const statusIcons = {
    available: "✅",
    pending: "⏳",
    adopted: "❤️",
  };

  const filteredCount = animals.filter((dog) => {
    return (
      filterByAgeCategory(dog, filters.age) &&
      (filters.size.length === 0 || filters.size.includes(dog.size)) &&
      (filters.gender.length === 0 || filters.gender.includes(dog.gender)) &&
      (filters.availability.length === 0 ||
        filters.availability.includes(dog.availableForAdoption))
    );
  }).length;

  return (
    <motion.section
      className="top-0 z-40 max-w-6xl mx-auto rounded-3xl shadow-2xl bg-linear-to-br from-white via-emerald-50/30 to-white backdrop-blur-xl border border-emerald-100/50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header con gradiente */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-black bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {filterContent.title}
            </h2>
            <motion.div
              className="px-4 py-2 bg-emerald-100 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-emerald-700 font-bold text-sm">
                {filteredCount} {filterContent.animals}
              </span>
            </motion.div>
          </div>
          <p className="text-gray-500 text-sm">
            {filterContent.showing} {filteredCount} de {animals.length}
          </p>
        </div>

        {/* Grid de filtros con diseño moderno */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Edad */}
          <div className="bg-white/80 rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <span className="text-xl">🎂</span>
              {filterContent.ageLabel}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ageCategories.map((category) => {
                const isActive = filters.age.includes(category);
                return (
                  <motion.button
                    key={category}
                    onClick={() => toggleFilter("age", category)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">
                        {ageIcons[category as keyof typeof ageIcons]}
                      </span>
                      {filterContent.ageCategories[category]}
                      <span
                        className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                          isActive
                            ? "bg-white/30"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {getAgeCount(category)}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Tamaño */}
          <div className="bg-white/80 rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <span className="text-xl">📏</span>
              {filterContent.sizeLabel}
            </h3>
            <div className="flex flex-col gap-2">
              {sizeOptions.map((size) => {
                const isActive = filters.size.includes(size);
                return (
                  <motion.button
                    key={size}
                    onClick={() => toggleFilter("size", size)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-base">
                          {sizeIcons[size as keyof typeof sizeIcons]}
                        </span>
                        {cardsContent.sizeValues[size]}
                      </span>
                      {isActive && (
                        <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
                          ✓
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Género */}
          <div className="bg-white/80 rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <span className="text-xl">🎭</span>
              {filterContent.genderLabel}
            </h3>
            <div className="flex flex-col gap-2">
              {genderOptions.map((gender) => {
                const isActive = filters.gender.includes(gender);
                return (
                  <motion.button
                    key={gender}
                    onClick={() => toggleFilter("gender", gender)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-base">
                          {genderIcons[gender as keyof typeof genderIcons]}
                        </span>
                        {cardsContent.genderValues[gender]}
                      </span>
                      {isActive && (
                        <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
                          ✓
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="bg-white/80 rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
              <span className="text-xl">📋</span>
              {filterContent.statusLabel}
            </h3>
            <div className="flex flex-col gap-2">
              {availabilityOptions.map((status) => {
                const isActive = filters.availability.includes(status);
                return (
                  <motion.button
                    key={status}
                    onClick={() => toggleFilter("availability", status)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-base">
                          {statusIcons[status as keyof typeof statusIcons]}
                        </span>
                        {filterContent.statusValues[status]}
                      </span>
                      {isActive && (
                        <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
                          ✓
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Barra inferior mejorada */}
        <div className="flex items-center justify-between bg-linear-to-r from-gray-50 to-emerald-50/50 rounded-2xl px-6 py-4 border border-gray-100">
          <motion.button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 hover:text-emerald-600 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">🔄</span>
            {filterContent.clearFilters}
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

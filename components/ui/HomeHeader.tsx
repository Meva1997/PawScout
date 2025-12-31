import React from "react";

export default function HomeHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md max-w-6xl mx-auto">
      <h1 className="font-bold text-2xl">🐾 PawScout</h1>
      <nav>
        <ul className="flex space-x-4 font-medium">
          <li className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all">
            Adopta
          </li>
          <li className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all">
            Donaciones
          </li>
          <li className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all">
            Voluntariado
          </li>
          <li className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all">
            Contacto
          </li>
        </ul>
      </nav>
    </header>
  );
}

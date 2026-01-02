"use client";
import Link from "next/link";
import { useState } from "react";

export default function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md max-w-6xl mx-auto">
      <Link href="/">
        <h1 className="font-bold text-2xl">
          <span className="md:pr-4 lg:pr-0">🐾</span> PawScout
        </h1>
      </Link>

      <nav className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="md:hidden bg-emerald-400 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {open ? (
            /* X icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/*Desktop Menu*/}
        <ul className="hidden md:flex space-x-6 font-medium">
          <Link
            href="/adopt"
            className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all"
          >
            Adopta
          </Link>
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

        {/*Mobile Menu*/}
        {open && (
          <div className="md:hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20">
            <ul className="flex flex-col space-y-2 p-4 font-medium">
              <Link
                href="/adopt"
                className="hover:bg-emerald-400 rounded-lg p-2 cursor-pointer transition-all"
              >
                Adopta
              </Link>
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
          </div>
        )}
      </nav>
    </header>
  );
}

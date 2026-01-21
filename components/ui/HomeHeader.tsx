"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/home", label: "Inicio" },
  { href: "/adopt", label: "Adopta" },
  { href: "/donate", label: "Donaciones" },
  { href: "/volunteer", label: "Voluntariado" },
  { href: "/contact", label: "Contacto" },
  { href: "/admin/dashboard", label: "Admin" },
];

export default function HomeHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="flex items-center justify-between p-4 bg-white max-w-6xl mx-auto"
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/home">
        <h1 className="font-bold text-2xl">
          <span className="md:pr-4 lg:pr-0">🐾</span> PawScout
        </h1>
      </Link>

      <nav className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          className="md:hidden bg-emerald-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer hover:bg-emerald-700 transition-all hover:scale-105"
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
        <ul className="hidden md:flex space-x-2 font-medium" role="menubar">
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={`hover:bg-emerald-600 hover:text-white rounded-lg p-2 cursor-pointer transition-all ${isActive(item.href) ? "bg-emerald-600 text-white" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/*Mobile Menu*/}
        {open && (
          <motion.div
            className="md:hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20"
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              opacity: { duration: 1 },
            }}
          >
            <ul
              className="flex flex-col space-y-2 p-4 font-medium"
              role="menubar"
            >
              {navItems.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={`hover:bg-emerald-600 hover:text-white rounded-lg p-2 cursor-pointer transition-all block ${isActive(item.href) ? "bg-emerald-600 text-white" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

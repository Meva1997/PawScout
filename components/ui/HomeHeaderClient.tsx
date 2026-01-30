"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type NavItem = {
  href: string;
  label: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  lastName: string;
  isAdmin: boolean;
} | null;

type HomeHeaderClientProps = {
  user: User;
};

export default function HomeHeaderClient({ user }: HomeHeaderClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const langSegment = segments[0];
  const currentLang = langSegment === "en" ? "en" : "es-mx";
  const remainingPath = segments.slice(1).join("/");
  const nextLang = currentLang === "en" ? "es-mx" : "en";

  const navItems: NavItem[] = [
    {
      href: `/${currentLang}/home`,
      label: currentLang === "en" ? "Home" : "Inicio",
    },
    {
      href: `/${currentLang}/adopt`,
      label: currentLang === "en" ? "Adopt" : "Adopta",
    },
    {
      href: `/${currentLang}/donate`,
      label: currentLang === "en" ? "Donate" : "Donaciones",
    },
    {
      href: `/${currentLang}/volunteer`,
      label: currentLang === "en" ? "Volunteer" : "Voluntariado",
    },
    {
      href: `/${currentLang}/contact`,
      label: currentLang === "en" ? "Contact" : "Contacto",
    },
  ];

  // Add admin link if user is admin
  if (user?.isAdmin) {
    navItems.push({
      href: "/admin/dashboard",
      label: "Admin",
    });
  }

  const isActive = (href: string) => pathname === href;

  const [open, setOpen] = useState(false);

  const handleLanguageToggle = () => {
    const nextPath = `/${nextLang}/${remainingPath || "home"}`;
    router.push(nextPath);
  };

  return (
    <motion.header
      className="flex items-center justify-between p-4 bg-white max-w-6xl mx-auto"
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/${currentLang}/home`}>
        <h1 className="font-bold text-2xl">
          <span className="md:pr-4 lg:pr-0">🐾</span> PawScout
        </h1>
      </Link>

      <nav className="relative flex items-center gap-3">
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
            className="md:hidden absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20"
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
              <li role="none">
                <button
                  onClick={() => {
                    handleLanguageToggle();
                    setOpen(false);
                  }}
                  className="w-full mt-2 px-3 py-2 border border-emerald-600 text-emerald-600 rounded-lg text-sm font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
                  aria-label={`Cambiar idioma a ${nextLang === "en" ? "inglés" : "español"}`}
                >
                  {nextLang === "en" ? "EN 🇺🇸" : "ES 🇲🇽"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
        <button
          onClick={handleLanguageToggle}
          className="hidden md:inline-flex items-center justify-center px-3 py-1 border border-emerald-600 text-emerald-600 rounded-lg text-sm font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
          aria-label={`Cambiar idioma a ${nextLang === "en" ? "inglés" : "español"}`}
        >
          {nextLang === "en" ? "EN 🇺🇸" : "ES 🇲🇽"}
        </button>
      </nav>
    </motion.header>
  );
}

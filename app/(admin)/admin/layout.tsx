"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavigationItem = {
  name: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { name: "Panel General", href: "/admin/dashboard" },
  { name: "Mascotas", href: "/admin/pets" },
  { name: "Adopciones", href: "/admin/adoptions" },
  { name: "Donaciones", href: "/admin/donations" },
  { name: "Voluntarios", href: "/admin/volunteers" },
  { name: "Mensajes", href: "/admin/newsletter" },
  { name: "Configuración", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh w-full bg-[#0c1412] text-white">
      <div className="flex h-dvh w-full overflow-hidden bg-[#111f1c] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <aside className="hidden w-72 flex-col border-r border-white/5 bg-[#0f1a18] px-6 py-8 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#19e6b3]/15 text-[#19e6b3]">
              <span aria-hidden className="text-lg font-bold">
                PS
              </span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                Admin
              </p>
              <p className="text-xl font-semibold tracking-tight text-white">
                PawScout
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">
                Overview
              </p>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition hover:bg-white/5 hover:text-white ${
                      pathname === item.href
                        ? "bg-white/10  font-semibold text-white"
                        : "text-white/60"
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/5 bg-[#111f1c]/80 px-6 py-4 backdrop-blur">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
                className="flex size-11 items-center justify-center rounded-2xl border border-white/10 text-white/70 transition hover:border-white/40 hover:text-white lg:hidden"
              >
                ☰
              </button>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/home"
                className="text-lg font-semibold text-white hover:underline hover:text-emerald-400 transition-all"
              >
                Home
              </Link>
              <button className="relative rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                ES
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex flex-col text-right text-xs leading-tight">
                  <span className="font-semibold text-white">Alex Medina</span>
                  <span className="text-white/50">Shelter Lead</span>
                </div>
                <div className="size-10 rounded-2xl bg-linear-to-br from-[#19e6b3] to-[#0a8d67]"></div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-[#0c1412] px-6 py-8 text-white/80">
            {children}
          </main>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            aria-hidden
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-full border-l border-white/5 bg-[#0f1a18] px-6 py-8 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.35em] text-white/40">
                Menu
              </p>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                className="flex size-10 items-center justify-center rounded-2xl border border-white/15 text-white/70 transition hover:border-white/50 hover:text-white"
              >
                ×
              </button>
            </div>
            <nav className="mt-8 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm transition hover:bg-white/5 hover:text-white ${
                    pathname === item.href
                      ? "bg-white/10 font-semibold text-white"
                      : "text-white/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

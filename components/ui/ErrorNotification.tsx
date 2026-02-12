"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function ErrorNotification() {
  const router = useRouter();

  useEffect(() => {
    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleClose = () => {
    router.replace("/");
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top duration-300">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900 mb-1">
            Servidor no disponible
          </h3>
          <p className="text-sm text-red-700">
            No se pudo verificar tu sesión. Por favor intenta nuevamente más
            tarde.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 text-red-400 hover:text-red-600 transition-colors"
          aria-label="Cerrar notificación"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

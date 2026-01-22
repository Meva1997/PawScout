import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PawScout - Login",
  description: "Inicia sesión en tu cuenta de PawScout.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-200">
      {children}
    </div>
  );
}

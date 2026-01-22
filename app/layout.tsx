import type { Metadata } from "next";
import "./globals.css";
import { googleSansFlex } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "PawScout",
  description: "Adopta, cuida y encuentra el hogar perfecto para una mascota.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params?: Promise<{ lang?: string }>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = params ? await params : { lang: undefined };
  const lang = resolvedParams.lang ?? "es-mx";
  return (
    <html lang={lang}>
      <body className={`${googleSansFlex.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

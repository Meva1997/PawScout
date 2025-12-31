import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import HomeHeader from "@/components/ui/HomeHeader";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawScout",
  description: "Adopta, cuida y encuentra el hogar perfecto para una mascota.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HomeHeader />
      <body className={`${googleSansFlex.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

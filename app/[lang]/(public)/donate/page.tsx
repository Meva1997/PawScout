import type { Metadata } from "next";

import AmountForm from "@/components/public/donate/AmountForm";
import HeroDonate from "@/components/public/donate/HeroDonate";
import MoneyInfo from "@/components/public/donate/MoneyInfo";

export const metadata: Metadata = {
  title: "PawScout - Donar",
  description:
    "Apoya nuestra misión donando para ayudar a más animales a encontrar un hogar",
};

export default function page() {
  return (
    <>
      <main className="bg-gray-200 py-20">
        <section className="grid md:grid-cols-2 py-20 max-w-6xl mx-auto p-8 gap-10 items-start">
          <HeroDonate />
          <AmountForm />
        </section>
        <section>
          <MoneyInfo />
        </section>
      </main>
    </>
  );
}

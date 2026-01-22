"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  getDonateFormContent,
  type DonationPreset,
} from "@/lib/i18n/donate/donate-form";

export default function AmountForm() {
  const params = useParams<{ lang?: string }>();
  const langParam = typeof params?.lang === "string" ? params.lang : undefined;
  const { content } = getDonateFormContent(langParam);
  const {
    heading,
    subheading,
    customLabel,
    customPlaceholder,
    presetAmounts,
    amountInfo,
    submitLabel,
  } = content;

  const [selected, setSelected] = useState<DonationPreset | null>(null);
  const [customAmount, setCustomAmount] = useState<number | "">("");

  const handleSelect = (amount: DonationPreset) => {
    setSelected(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? "" : Number(e.target.value);
    setCustomAmount(val);
    setSelected(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount =
      selected ?? (typeof customAmount === "number" ? customAmount : null);
    console.log("Donating:", amount);
    // aquí agregar la lógica real de pago
  };

  return (
    <motion.article
      className="flex flex-col bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    >
      <section>
        <h2 className="font-bold text-2xl">{heading}</h2>
        <p className="text-gray-500 pt-2">{subheading}</p>
      </section>
      <section>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleSelect(amt)}
                className={`font-bold py-3 rounded-lg transition-colors ${
                  selected === amt
                    ? "border-2 border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <div>
            <label
              htmlFor="custom-amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {customLabel}
            </label>
            <input
              type="number"
              id="custom-amount"
              name="custom-amount"
              placeholder={customPlaceholder}
              inputMode="numeric"
              value={customAmount as number | ""}
              onChange={handleCustomChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          {/* Nota informativa según monto seleccionado */}
          {selected && amountInfo[selected] && (
            <div className="mt-6 p-3 rounded-md bg-blue-200 text-blue-700 text-sm text-center">
              {amountInfo[selected]}
            </div>
          )}
          <button
            type="submit"
            className="my-4 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-800 transition-all cursor-pointer"
          >
            {submitLabel}
          </button>
        </form>
      </section>
    </motion.article>
  );
}

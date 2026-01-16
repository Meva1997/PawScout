"use client";
import React, { useState } from "react";

export default function AmountForm() {
  const presetAmounts = [50, 100, 150, 200, 300, 500];
  const [selected, setSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | "">("");

  const amountInfo: Record<number, string> = {
    50: "$50: puedes cubrir las vacunas básicas para una mascota.",
    100: "$100: puedes proporcionar desparasitaciones y revisiones.",
    150: "$150: puedes costear pruebas y tratamiento iniciales.",
    200: "$200: puedes pagar una cirugía menor o atención especializada.",
    300: "$300: puedes cubrir cirugías importantes o cuidados prolongados.",
    500: "$500: puedes financiar rescates y tratamientos complejos.",
  };

  const handleSelect = (amount: number) => {
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
    <article className="flex flex-col bg-white p-8 rounded-lg shadow-lg ">
      <section>
        <h2 className="font-bold text-2xl">Elige la cantidad a donar</h2>
        <p className="text-gray-500 pt-2">Cambia una vida hoy</p>
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
              Cantidad personalizada
            </label>
            <input
              type="number"
              id="custom-amount"
              name="custom-amount"
              placeholder="$"
              inputMode="numeric"
              value={customAmount as number | ""}
              onChange={handleCustomChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          {/* Nota informativa según monto seleccionado */}
          {selected && (
            <div className="mt-6 p-3 rounded-md bg-blue-200 text-blue-700 text-sm text-center">
              {amountInfo[selected]}
            </div>
          )}
          <button
            type="submit"
            className="my-4 bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-800 transition-all cursor-pointer"
          >
            Donar Ahora
          </button>
        </form>
      </section>
    </article>
  );
}

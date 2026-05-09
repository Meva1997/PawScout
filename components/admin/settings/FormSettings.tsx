"use client";

import { useEffect, useState } from "react";
import {
  getSettingsAction,
  updateSettingsAction,
  UpdateSettingsData,
} from "@/actions/settings/update-settings-action";
import { useRouter } from "next/navigation";
import LogoSettings from "./LogoSettings";

interface Settings {
  shelter_name?: string;
  shelter_email?: string;
  shelter_phone?: string;
  shelter_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  logo_url?: string;
}

export default function FormSettings() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<Settings>({
    shelter_name: "",
    shelter_email: "",
    shelter_phone: "",
    shelter_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  useEffect(() => {
    // Fetch current settings on mount
    const fetchSettings = async () => {
      const result = await getSettingsAction();
      if (result.success && result.settings) {
        setFormData({
          shelter_name: result.settings.shelter_name || "",
          shelter_email: result.settings.shelter_email || "",
          shelter_phone: result.settings.shelter_phone || "",
          shelter_address: result.settings.shelter_address || "",
          city: result.settings.city || "",
          state: result.settings.state || "",
          zip_code: result.settings.zip_code || "",
        });
      }
      setIsFetching(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("-", "_")]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const dataToUpdate: UpdateSettingsData = {};

    // Only include fields that have changed and are not empty
    if (formData.shelter_name)
      dataToUpdate.shelter_name = formData.shelter_name;
    if (formData.shelter_email)
      dataToUpdate.shelter_email = formData.shelter_email;
    if (formData.shelter_phone)
      dataToUpdate.shelter_phone = formData.shelter_phone;
    if (formData.shelter_address)
      dataToUpdate.shelter_address = formData.shelter_address;
    if (formData.city) dataToUpdate.city = formData.city;
    if (formData.state) dataToUpdate.state = formData.state;
    if (formData.zip_code) dataToUpdate.zip_code = formData.zip_code;

    const result = await updateSettingsAction(dataToUpdate);

    if (result.success) {
      // Check if no changes were detected
      const isNoChanges = result.message?.toLowerCase().includes("no changes");

      setMessage({
        type: isNoChanges ? "info" : "success",
        text: result.message || "Settings updated successfully",
      });

      if (!isNoChanges) {
        router.refresh();
      }
    } else {
      setMessage({
        type: "error",
        text: result.error || "Error updating settings",
      });
    }

    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="max-w-6xl mx-auto text-center py-10">
        <p className="text-white animate-pulse">Loading settings...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {message && (
          <div
            className={`max-w-6xl mx-auto mb-4 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                : message.type === "info"
                  ? "bg-blue-500/20 border border-blue-500 text-blue-400"
                  : "bg-red-500/20 border border-red-500 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-white text-xl font-semibold">
              Shelter Details
            </h2>
          </div>
          {/*Shelter Logo */}
          <LogoSettings onMessage={setMessage} />
          {/*Shelter Name and description */}
          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="shelter_name"
                  className="block text-sm font-medium text-white"
                >
                  Shelter Name
                </label>
                <input
                  type="text"
                  id="shelter_name"
                  inputMode="text"
                  value={formData.shelter_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="Shelter Name"
                />
              </div>
            </div>
          </div>
        </section>

        {/*Location & contact Settings */}
        <section className="my-10 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] max-w-6xl mx-auto">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-white text-lg font-medium">
              Location &amp; Contact
            </h2>
          </div>
          <div className="flex space-x-6 mt-6">
            <label htmlFor="shelter_email" className="flex-1">
              <span className="block text-sm font-medium text-white mb-1">
                Contact Email
              </span>
              <input
                type="email"
                id="shelter_email"
                inputMode="email"
                value={formData.shelter_email}
                onChange={handleChange}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="contacto@refugio.com"
              />
            </label>
            <label htmlFor="shelter_phone" className="flex-1">
              <span className="block text-sm font-medium text-white mb-1">
                Contact Phone Number
              </span>
              <input
                type="tel"
                id="shelter_phone"
                inputMode="tel"
                value={formData.shelter_phone}
                onChange={handleChange}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="+1-555-0123"
              />
            </label>
          </div>
          <div className="mt-6">
            <label htmlFor="shelter_address">
              <span className="block text-sm font-medium text-white mb-1">
                Address
              </span>
              <input
                type="text"
                id="shelter_address"
                inputMode="text"
                value={formData.shelter_address}
                onChange={handleChange}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="123 Main Street"
              />
            </label>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <label htmlFor="city">
                <span className="block text-sm font-medium text-white mb-1">
                  City
                </span>
                <input
                  type="text"
                  id="city"
                  inputMode="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="City"
                />
              </label>
            </div>
            <div className="col-span-2 flex space-x-6">
              <div className="flex-1">
                <label htmlFor="state">
                  <span className="block text-sm font-medium text-white mb-1">
                    State
                  </span>
                  <input
                    type="text"
                    id="state"
                    inputMode="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                    placeholder="State"
                  />
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="zip_code">
                  <span className="block text-sm font-medium text-white mb-1">
                    Postal Code
                  </span>
                  <input
                    type="text"
                    id="zip_code"
                    inputMode="numeric"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                    placeholder="12345"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-500 text-white px-6 py-2 rounded-2xl hover:bg-emerald-600 transition cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

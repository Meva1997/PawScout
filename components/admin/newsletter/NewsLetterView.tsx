"use client";
import { useState } from "react";
import UserMessages from "./UserMessages";
import NewsSubscribers from "./NewsSubscribers";

export default function NewsLetterView() {
  const [activeTab, setActiveTab] = useState<"messages" | "subscribers">(
    "messages"
  );

  return (
    <>
      <div className="flex">
        <nav className="space-x-4">
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "messages"
                ? "bg-emerald-400 text-black"
                : "text-white hover:bg-emerald-600 hover:text-black"
            }`}
            onClick={() => setActiveTab("messages")}
          >
            Mensajes Recibidos
          </button>
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === "subscribers"
                ? "bg-emerald-400 text-black"
                : "text-white hover:bg-emerald-600 hover:text-black"
            }`}
            onClick={() => setActiveTab("subscribers")}
          >
            Suscriptores
          </button>
        </nav>
      </div>
      {activeTab === "messages" && <UserMessages />}
      {activeTab === "subscribers" && <NewsSubscribers />}
    </>
  );
}

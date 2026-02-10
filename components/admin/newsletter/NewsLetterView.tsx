"use client";
import { useState } from "react";
import UserMessages from "./UserMessages";
import NewsSubscribers from "./NewsSubscribers";

type NewsLetterViewProps = {
  token: string;
};

export default function NewsLetterView({ token }: NewsLetterViewProps) {
  const [activeTab, setActiveTab] = useState<"messages" | "subscribers">(
    "messages",
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
      {activeTab === "messages" && <UserMessages token={token} />}
      {activeTab === "subscribers" && <NewsSubscribers />}
    </>
  );
}

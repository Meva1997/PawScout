import NewsLetterView from "@/components/admin/newsletter/NewsLetterView";

type InfoItem = {
  label: string;
  value: string;
};

const generalInfo: InfoItem[] = [
  { label: "Suscriptores totales", value: "1,284" },
  { label: "Nuevos mensajes recibidos", value: "56" },
  { label: "Nuevos usuarios en noticias", value: "123" },
];

export default function page() {
  return (
    <>
      <section className="my-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl text-white">Noticias y mensajes</h1>
        <p>
          Aquí puedes gestionar las noticias y mensajes enviados a los
          suscriptores.
        </p>
      </section>
      <section className="grid md:grid-cols-3 gap-6 my-10 max-w-6xl mx-auto">
        {generalInfo.map((item) => (
          <div
            key={item.label}
            className="flex flex-col text-left space-y-2 p-4 border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] mx-2"
          >
            <span>{item.label}:</span>
            <p className="text-white font-medium text-xl">{item.value}</p>
          </div>
        ))}
      </section>
      <section className="max-w-7xl mx-auto my-10 flex flex-col text-left space-y-2 p-4 border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ">
        <NewsLetterView />
      </section>
    </>
  );
}

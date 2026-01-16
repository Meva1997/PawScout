import Link from "next/link";

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  date: string;
};

const userInfo: UserInfo = {
  name: "Juan Perez",
  email: "juan.perez@example.com",
  phone: "+1234567890",
  date: "26-01-2018",
};

export default function page() {
  return (
    <>
      {/*Meesage Subject*/}
      <section className="my-10">
        <nav className="pb-2">
          <Link
            href="/admin/newsletter"
            className="text-emerald-400 hover:underline hover:cursor-pointer transition-all"
          >
            &larr; Volver a Mensajes
          </Link>
        </nav>

        <h1 className="font-bold text-white text-2xl">
          <span className="text-gray-400">Asunto:</span> Interesado en el
          boletín
        </h1>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {/*User Info*/}
        <article className="border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Información del Usuario
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <p>Nombre:</p>
              <p className="font-semibold text-white">{userInfo.name}</p>
            </div>
            <div className="space-y-2">
              <p>Email:</p>
              <p className="font-semibold text-white">{userInfo.email}</p>
            </div>
            <div className="space-y-2">
              <p>Numero de teléfono:</p>
              <p className="font-semibold text-white">{userInfo.phone}</p>
            </div>
            <div className="space-y-2">
              <p>Fecha de envío:</p>
              <p className="font-semibold text-white">{userInfo.date}</p>
            </div>
          </div>
        </article>
        <article className="border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4">
          <h2 className="text-xl font-semibold text-white mb-4">Mensaje</h2>
          <p className="whitespace-pre-wrap">
            Hola, me gustaría suscribirme al boletín de PawScout.
          </p>
        </article>
      </section>
    </>
  );
}

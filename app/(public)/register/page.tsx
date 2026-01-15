import RegisterForm from "@/components/public/Login/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <main className="grid md:grid-cols-2 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-20">
        <section className="col-span-1 flex flex-col items-center justify-center p-4">
          <h1 className="font-black text-4xl">Crea tu cuenta</h1>
          <p className="my-4 text-gray-500">
            Por favor, crea una cuenta para continuar.
          </p>
          <RegisterForm />
          <div className="mt-2">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:underline hover:text-emerald-400 transition-colors"
            >
              Ya tienes una cuenta? Inicia sesión
            </Link>
            <Link
              href="/forgot-password"
              className="ml-4 text-sm text-gray-500 hover:underline hover:text-emerald-400 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </section>
        <section className="col-span-1">
          <Image
            src="/dog-smiling-camera.png"
            alt="Illustration of a person logging in"
            width={600}
            height={600}
            className="hidden md:block w-full h-full object-cover"
            loading="lazy"
          />
        </section>
      </main>
    </>
  );
}

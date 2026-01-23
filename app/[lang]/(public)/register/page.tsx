"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/public/Login/RegisterForm";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { getRegisterHeaderContent } from "@/lib/i18n/register/register-header";

export default function RegisterPage() {
  const params = useParams<{ lang?: string }>();
  const { content } = getRegisterHeaderContent(params?.lang);

  return (
    <>
      <motion.main
        className="grid md:grid-cols-2 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <section className="col-span-1 flex flex-col items-center justify-center p-4">
          <h1 className="font-black text-4xl">{content.title}</h1>
          <p className="my-4 text-gray-500">{content.subtitle}</p>
          <RegisterForm />
          <div className="mt-2">
            <Link
              href={`/${params?.lang}/login`}
              className="text-sm text-gray-500 hover:underline hover:text-emerald-400 transition-colors"
            >
              {content.account}
            </Link>
            <Link
              href={`/${params?.lang}/forgot-password`}
              className="ml-4 text-sm text-gray-500 hover:underline hover:text-emerald-400 transition-colors"
            >
              {content.forgotPassword}
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
      </motion.main>
    </>
  );
}

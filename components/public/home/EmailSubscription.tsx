"use client";
import { motion } from "framer-motion";
import { getNewsEmailContent } from "@/lib/i18n/home/news-email";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { subscribeEmailAction } from "@/actions/register/subscribe-email-action";
import { toast } from "react-toastify";

export default function EmailSubscription() {
  const params = useParams<{ lang?: string }>();
  const { content } = getNewsEmailContent(params?.lang);

  const [state, dispatch] = useActionState(subscribeEmailAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        // if (params?.lang === "es-mx") {
        //   toast.error("Error al suscribir el correo");
        // } else {
        //   toast.error(error);
        // }
        toast.error(error);
      });
    }

    if (state.success) {
      if (params?.lang === "es-mx") {
        toast.success("Correo suscrito exitosamente");
      } else {
        toast.success(state.success);
      }
    }
  }, [state, params?.lang]);

  return (
    <>
      <motion.section
        className="bg-emerald-500 py-16 max-w-6xl mx-auto rounded-3xl my-20 shadow-lg shadow-emerald-200/40"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <article className="text-center px-4">
          <h6 className="text-3xl font-black text-black mb-4">
            {content.title}
          </h6>
          <p className="text-black text-md max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </article>
        <article>
          <form
            action={dispatch}
            className="mt-8 flex flex-col md:flex-row justify-center max-w-xl mx-auto gap-6"
          >
            <input
              type="email"
              inputMode="email"
              name="email"
              placeholder={content.placeholderText}
              className="mx-auto w-2/3 md:w-full px-4 py-2 rounded-md focus:outline-none bg-white text-center"
            />
            <input type="hidden" name="lang" value={params?.lang || "en"} />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer w-1/3 mx-auto md:w-full"
            >
              {content.buttonText}
            </button>
          </form>
        </article>
      </motion.section>
    </>
  );
}

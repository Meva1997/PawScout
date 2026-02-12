"use server";

import { getContactSchema } from "@/schemas/contact-schema";

type ContactFormData = {
  name: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  subject: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
  date: string;
  lang: string;
};

type ActionStateType = {
  errors: string[];
  success: string;
  formData?: ContactFormData;
};

export async function contactFormAction(
  prevState: ActionStateType,
  formData: FormData,
) {
  const contactData = {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    date: new Date().toISOString(),
    lang: (formData.get("lang") as string) || "en",
  };

  const contactSchema = getContactSchema(contactData.lang);
  const validatedData = contactSchema.safeParse(contactData);

  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
      formData: contactData,
    };
  }

  try {
    const url = `${process.env.API_URL}/contact`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!req.ok) {
      try {
        const json = await req.json();
        const detail = json.detail || "Error al enviar el mensaje";
        return {
          errors: [detail],
          success: "",
          formData: contactData,
        };
      } catch {
        return {
          errors: [
            contactData.lang === "es-mx"
              ? "Error del servidor. Por favor intenta más tarde."
              : "Server error. Please try again later.",
          ],
          success: "",
          formData: contactData,
        };
      }
    }

    const json = await req.json();
    const success = json.success;

    return {
      errors: [],
      success,
    };
  } catch (error) {
    // Network error or backend unavailable
    return {
      errors: [
        contactData.lang === "es-mx"
          ? "No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta nuevamente."
          : "Unable to connect to server. Please check your connection and try again.",
      ],
      success: "",
      formData: contactData,
    };
  }
}

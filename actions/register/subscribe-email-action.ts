"use server";

import { getEmailSubscriptionSchema } from "@/schemas/register-schema";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function subscribeEmailAction(
  prevState: ActionStateType,
  formData: FormData,
) {
  const emailData = {
    email: formData.get("email"),
    lang: (formData.get("lang") as string) || "en",
  };

  const emailSchema = getEmailSubscriptionSchema(emailData.lang);
  const validatedData = emailSchema.safeParse(emailData);

  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/subs`;
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
      const detail = json.detail || "Error al suscribir el correo";
      return {
        errors: [detail],
        success: "",
      };
    } catch {
      return {
        errors: [
          emailData.lang === "es-mx"
            ? "Error al suscribir el correo"
            : "Error subscribing the email",
        ],
        success: "",
      };
    }
  }

  const json = await req.json();
  const success = json.success;

  return {
    errors: [],
    success,
  };
}

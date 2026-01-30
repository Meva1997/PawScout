"use server";

import { getRegisterSchema } from "@/schemas/register-schema";
import { translateBackendError } from "@/lib/i18n/login/translations";

type ActionStateType = {
  errors: string[];
  success: string;
  formData?: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    lang: (formData.get("lang") as string) || "en",
  };

  const registerSchema = getRegisterSchema(registerData.lang);
  const register = registerSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
      formData: {
        firstName: registerData.firstName as string,
        lastName: registerData.lastName as string,
        email: registerData.email as string,
      },
    };
  }

  const url = `${process.env.API_URL}/users/register`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: register.data?.firstName,
      lastName: register.data?.lastName,
      email: register.data?.email,
      password: register.data?.password,
    }),
  });

  const json = await req.json();
  const detail = json.detail;

  if (detail) {
    const translatedError = translateBackendError(detail, registerData.lang);

    return {
      errors: [translatedError],
      success: "",
      formData: {
        firstName: register.data?.firstName as string,
        lastName: register.data?.lastName as string,
        email: register.data?.email as string,
      },
    };
  }
  const success = json.success;

  return {
    errors: [],
    success,
  };
}

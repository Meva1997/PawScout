"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { getLoginSchema } from "@/schemas/login-schema";
import { translateBackendError } from "@/lib/i18n/login/translations";

type ActionStateType = {
  errors: string[];
  success: string;
  formData?: {
    email: string;
    password: string;
  };
};

type TokenPayload = {
  sub: string;
  user_id: number;
  isAdmin: boolean;
  name: string;
  lastName: string;
  exp: number;
};

export async function login(prevState: ActionStateType, formData: FormData) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
    lang: (formData.get("lang") as string) || "en",
  };

  const loginSchema = getLoginSchema(loginData.lang);
  const login = loginSchema.safeParse(loginData);

  if (!login.success) {
    const errors = login.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
      formData: {
        email: loginData.email as string,
        password: loginData.password as string,
      },
    };
  }

  // Check if user is already logged in
  const cookieStore = await cookies();
  const existingToken = cookieStore.get("pawscout_token")?.value;

  if (existingToken) {
    try {
      const decoded = jwtDecode<TokenPayload>(existingToken);

      // Check if token is still valid
      if (decoded.exp * 1000 > Date.now()) {
        // Same user trying to login again
        if (decoded.sub === login.data?.email) {
          const errorMessage =
            loginData.lang === "es-mx"
              ? "Ya has iniciado sesión con esta cuenta."
              : "You are already logged in with this account.";

          return {
            errors: [errorMessage],
            success: "",
            formData: {
              email: loginData.email as string,
              password: loginData.password as string,
            },
          };
        }
      }
    } catch (error) {
      // Token is invalid, continue with login
      // console.log("Invalid token, proceeding with login");
    }
  }

  const req = await fetch(`${process.env.API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.data?.email as string,
      password: login.data?.password as string,
    }),
  });

  const json = await req.json();
  const detail = json.detail;

  if (detail) {
    const translatedError = translateBackendError(detail, loginData.lang);

    return {
      errors: [translatedError],
      success: "",
      formData: {
        email: loginData.email as string,
        password: loginData.password as string,
      },
    };
  }

  const success = json.success;

  const cookie = await cookies();

  // Delete old session (if exists) and set new token
  cookie.delete("pawscout_token");

  cookie.set({
    name: "pawscout_token",
    value: json.access_token,
    httpOnly: true,
    path: "/",
  });

  return {
    errors: [],
    success,
  };
}

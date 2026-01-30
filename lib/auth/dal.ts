//Data Access Layer for authentication-related operations

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionSchema } from "@/schemas/login-schema";

//use cache to optimize repeated calls and improve performance
export const verifySession = cache(async () => {
  const cookie = await cookies();
  const sessionCookie = cookie.get("pawscout_token");
  const token = sessionCookie?.value;

  if (!token) {
    redirect("/login");
  }

  const url = `${process.env.API_URL}/users/me`;
  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await req.json();

  const result = sessionSchema.safeParse(session);

  if (!result.success) {
    redirect("/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});

"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  sub: string;
  user_id: number;
  isAdmin: boolean;
  name: string;
  lastName: string;
  exp: number;
};

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("pawscout_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    //Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return {
      id: decoded?.user_id,
      email: decoded?.sub,
      name: decoded.name,
      lastName: decoded.lastName,
      isAdmin: decoded.isAdmin,
    };
  } catch (error) {
    // console.error("Error decoding token:", error);
    return null;
  }
}

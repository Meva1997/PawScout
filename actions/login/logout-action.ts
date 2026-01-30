"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LogoutState = {
  error?: string;
};

export async function logout(prevState: LogoutState): Promise<LogoutState> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("pawscout_token");
    redirect("/login");
  } catch (error) {
    // console.error("Logout error:", error);
    return {
      error: "Error al cerrar sesión. Por favor, intenta de nuevo.",
    };
  }
}

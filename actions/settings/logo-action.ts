"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function uploadLogoAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("pawscout_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "No autorizado. Por favor inicia sesión.",
      };
    }

    const response = await fetch(`${process.env.API_URL}/admin/logo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.detail || "Error al subir el logo",
      };
    }

    const result = await response.json();

    // Revalidar las páginas que muestran el logo
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: result.message,
      logo_url: result.logo_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading logo:", error);
    return {
      success: false,
      error:
        "Error de conexión. Por favor verifica que el servidor esté corriendo.",
    };
  }
}

export async function getLogoAction() {
  try {
    const response = await fetch(`${process.env.API_URL}/admin/logo`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        logo_url: null,
      };
    }

    const result = await response.json();

    return {
      success: true,
      logo_url: result.logo_url,
    };
  } catch (error) {
    console.error("Error fetching logo:", error);
    return {
      success: false,
      logo_url: null,
    };
  }
}

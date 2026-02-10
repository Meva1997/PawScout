"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateSettingsData {
  shelter_name?: string;
  shelter_email?: string;
  shelter_phone?: string;
  shelter_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

export async function updateSettingsAction(data: UpdateSettingsData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("pawscout_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "No autorizado. Por favor inicia sesión.",
      };
    }

    const response = await fetch(`${process.env.API_URL}/admin/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.detail || "Error al actualizar la configuración",
      };
    }

    const result = await response.json();

    // Revalidar la página de configuración
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: result.message,
      settings: result.settings,
    };
  } catch (error) {
    console.error("Error updating settings:", error);
    return {
      success: false,
      error:
        "Error de conexión. Por favor verifica que el servidor esté corriendo.",
    };
  }
}

export async function getSettingsAction() {
  try {
    const response = await fetch(`${process.env.API_URL}/admin/settings`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Error al obtener la configuración",
      };
    }

    const settings = await response.json();

    return {
      success: true,
      settings,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      success: false,
      error:
        "Error de conexión. Por favor verifica que el servidor esté corriendo.",
    };
  }
}

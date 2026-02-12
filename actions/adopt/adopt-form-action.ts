"use server";

import { getAdoptSchema } from "@/schemas/adopt-schema";
import { revalidatePath } from "next/cache";

type AdoptionFormData = {
  animalId: number;
  applicantName: FormDataEntryValue | null;
  applicantLastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  address: FormDataEntryValue | null;
  city: FormDataEntryValue | null;
  state: FormDataEntryValue | null;
  zipCode: FormDataEntryValue | null;
  birthdate: FormDataEntryValue | null;
  occupation: FormDataEntryValue | null;
  reasonForAdoption: FormDataEntryValue | null;
  experienceWithPets: FormDataEntryValue | null;
  homeType: FormDataEntryValue | null;
  whoLivesInHouse: FormDataEntryValue | null;
  agreeToTerms: boolean;
  date: string;
  status: string;
  lang: string;
};

type ActionStateType = {
  errors: string[];
  success: string;
  formData?: AdoptionFormData;
};

export async function adoptFormAction(
  slug: number,
  prevState: ActionStateType,
  formData: FormData,
) {
  // Simulate form processing logic

  const adoptionData = {
    animalId: slug,
    applicantName: formData.get("applicantName"),
    applicantLastName: formData.get("applicantLastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zipCode: formData.get("zipCode"),
    birthdate: formData.get("birthdate"),
    occupation: formData.get("occupation"),
    reasonForAdoption: formData.get("reasonForAdoption"),
    experienceWithPets: formData.get("experienceWithPets"),
    homeType: formData.get("homeType"),
    whoLivesInHouse: formData.get("whoLivesInHouse"),
    agreeToTerms: formData.get("agreeToTerms") === "on",
    date: new Date().toISOString(),
    status: "pending",
    lang: (formData.get("lang") as string) || "en",
  };

  const adoptionSchema = getAdoptSchema(adoptionData.lang);
  const validatedData = adoptionSchema.safeParse(adoptionData);

  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
      formData: adoptionData,
    };
  }

  try {
    const url = `${process.env.API_URL}/adopt/${adoptionData.animalId}`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!req.ok) {
      // Si la respuesta no es OK, intentar parsear el error
      try {
        const json = await req.json();
        const detail = json.detail || "Error al enviar la solicitud";
        return {
          errors: [detail],
          success: "",
          formData: adoptionData,
        };
      } catch {
        // Si no se puede parsear JSON, es un error HTML del servidor
        return {
          errors: [
            adoptionData.lang === "es-mx"
              ? "Error del servidor. Por favor intenta más tarde."
              : "Server error. Please try again later.",
          ],
          success: "",
          formData: adoptionData,
        };
      }
    }

    const json = await req.json();
    const success = json.success;

    revalidatePath("/adopt");

    return {
      errors: [],
      success,
    };
  } catch (error) {
    // Network error or backend unavailable
    return {
      errors: [
        adoptionData.lang === "es-mx"
          ? "No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta nuevamente."
          : "Unable to connect to server. Please check your connection and try again.",
      ],
      success: "",
      formData: adoptionData,
    };
  }
}

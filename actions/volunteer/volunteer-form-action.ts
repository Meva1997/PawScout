"use server";

import { getVolunteerSchema } from "@/schemas/volunteer-schema";

type VolunteerFormData = {
  name: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  availability: string[];
  availableDays: string[];
  areasOfInterest: string[];
  whyVolunteer: FormDataEntryValue | null;
  specialSkills: FormDataEntryValue | null;
  emergencyContactName: FormDataEntryValue | null;
  emergencyContactPhone: FormDataEntryValue | null;
  privacyAgreement: boolean;
  date: string;
  lang: string;
};

type ActionStateType = {
  errors: string[];
  success: string;
  formData?: VolunteerFormData;
};

export async function volunteerFormAction(
  prevState: ActionStateType,
  formData: FormData,
) {
  const availableDays = formData.getAll("availableDays") as string[];
  const areasOfInterest = formData.getAll("areasOfInterest") as string[];
  const availabilityValue = formData.get("availability") as string;

  const volunteerData = {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    availability: availabilityValue ? [availabilityValue] : [],
    availableDays: availableDays,
    areasOfInterest: areasOfInterest,
    whyVolunteer: formData.get("whyVolunteer"),
    specialSkills: formData.get("specialSkills"),
    emergencyContactName: formData.get("emergencyContactName"),
    emergencyContactPhone: formData.get("emergencyContactPhone"),
    privacyAgreement: formData.get("privacyAgreement") === "on",
    date: new Date().toISOString(),
    lang: (formData.get("lang") as string) || "en",
  };

  const volunteerSchema = getVolunteerSchema(volunteerData.lang);
  const validatedData = volunteerSchema.safeParse(volunteerData);

  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
      formData: volunteerData,
    };
  }

  const url = `${process.env.API_URL}/volunteer`;
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
      const detail = json.detail || "Error al enviar la solicitud";
      return {
        errors: [detail],
        success: "",
        formData: volunteerData,
      };
    } catch {
      return {
        errors: [
          volunteerData.lang === "es-mx"
            ? "Error del servidor. Por favor intenta más tarde."
            : "Server error. Please try again later.",
        ],
        success: "",
        formData: volunteerData,
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

import { CreateAnimalFormData } from "@/schemas/dashboard-schema";
import { VolunteerSchemaType } from "@/schemas/volunteer-schema";

export async function getAllAnimals() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/animals`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await req.json();
  return json;
}

export async function getAnimalById(id: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/animals/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await req.json();
  return json;
}

export async function getAdminStats(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
}

export async function createAnimal(
  token: string,
  animalData: CreateAnimalFormData,
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/animals`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(animalData),
  });

  const json = await req.json();
  return json;
}

export async function uploadMultipleImages(token: string, files: FileList) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/media/upload-multiple`;

  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  const req = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = await req.json();
  return json;
}

export async function updateAnimal(
  token: string,
  animalId: number,
  animalData: CreateAnimalFormData,
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/animals/${animalId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(animalData),
  });

  const json = await req.json();
  return json;
}

export async function deleteImage(
  token: string,
  publicId: string,
  resourceType: string = "image",
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/media/delete`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      public_id: publicId,
      resource_type: resourceType,
    }),
  });

  const json = await req.json();
  return json;
}

export async function deleteAnimal(token: string, animalId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/animals/${animalId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
}

export async function getAdoptionRequests(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/adoptions`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
}

export async function getAdoptionRequestById(token: string, requestId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/adopt/${requestId}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
}

export async function getAllVolunteers(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
}

export async function getVolunteerById(token: string, volunteerId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer/${volunteerId}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  return json;
}

export async function postVolunteer(volunteerData: VolunteerSchemaType) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(volunteerData),
  });

  const json = await req.json();
  return json;
}

export async function deleteVolunteer(token: string, volunteerId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer/${volunteerId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  return json;
}

export async function updateVolunteer(
  token: string,
  volunteerId: number,
  volunteerData: VolunteerSchemaType,
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/volunteer/${volunteerId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(volunteerData),
  });

  const json = await req.json();
  return json;
}

export async function getShelterSettings() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/settings`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Failed to fetch shelter settings");
  }

  const json = await req.json();
  return { settings: json };
}

export async function getContactMessages(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contact`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Failed to fetch contact messages");
  }

  const json = await req.json();
  return json;
}

export async function getContactMessaegById(token: string, messageId: number) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contact/${messageId}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Failed to fetch contact message details");
  }

  const json = await req.json();
  return json;
}

export async function getSubs() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/subs`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!req.ok) {
    throw new Error("Failed to fetch subscribers");
  }

  const json = await req.json();
  return json;
}

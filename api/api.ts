import { CreateAnimalFormData } from "@/schemas/dashboard-schema";

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

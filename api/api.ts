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

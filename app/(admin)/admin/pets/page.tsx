import PetsMain from "@/components/admin/pets/PetsMain";
import { cookies } from "next/headers";

export default async function PetsPage() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")?.value || "";

  return (
    <>
      <PetsMain token={token} />
    </>
  );
}

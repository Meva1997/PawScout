import VolunteerPage from "@/components/admin/volunteer/VolunteerAdminMain";
import { cookies } from "next/headers";

export default async function page() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")!.value;

  return (
    <>
      <VolunteerPage token={token} />
    </>
  );
}

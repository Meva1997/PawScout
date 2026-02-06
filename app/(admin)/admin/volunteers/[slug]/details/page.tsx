import VolunteerAdminInfo from "@/components/admin/volunteer/VolunteerAdminInfo";
import { cookies } from "next/headers";

export default async function VolunteerDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")!.value;

  return (
    <>
      <VolunteerAdminInfo params={slug} token={token} />
    </>
  );
}

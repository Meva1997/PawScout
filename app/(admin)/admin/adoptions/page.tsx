"use server";
import { cookies } from "next/headers";
import AdoptMain from "@/components/admin/adoptions/AdoptMain";

export default async function AdoptionsPageContent() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")?.value || "";

  return (
    <>
      <AdoptMain token={token} />
    </>
  );
}

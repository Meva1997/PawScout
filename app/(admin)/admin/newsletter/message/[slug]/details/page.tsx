import UserMessageDetail from "@/components/admin/newsletter/UserMessageDetail";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")?.value || "";

  return (
    <>
      {/*Meesage Subject*/}
      <section className="my-10">
        <nav className="pb-2">
          <Link
            href="/admin/newsletter"
            className="text-emerald-400 hover:underline hover:cursor-pointer transition-all"
          >
            &larr; Volver a Mensajes
          </Link>
        </nav>
      </section>

      <UserMessageDetail token={token} />
    </>
  );
}

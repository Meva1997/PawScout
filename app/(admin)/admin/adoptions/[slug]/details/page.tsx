import Link from "next/link";
import { cookies } from "next/headers";
import AdoptionDetails from "@/components/admin/adoptions/AdoptionDetails";

export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")?.value || "";

  return (
    <>
      <section className="my-8">
        <Link
          href="/admin/adoptions"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/50 transition hover:text-[#19e6b3]"
        >
          <span aria-hidden>←</span>
          Back to Requests
        </Link>
      </section>

      {/* Scrollable Content */}
      <AdoptionDetails token={token} />
    </>
  );
}

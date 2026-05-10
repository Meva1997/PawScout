import NewsLetterView from "@/components/admin/newsletter/NewsLetterView";
import { cookies } from "next/headers";

export default async function page() {
  const cookie = await cookies();
  const token = cookie.get("pawscout_token")?.value || "";

  return (
    <>
      <section className="my-8 max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl text-white">News & Messages</h1>
        <p>
          Here you can manage messages received through the contact form and
          view newsletter subscriptions.
        </p>
      </section>

      <section className="max-w-7xl mx-auto my-10 flex flex-col text-left space-y-2 p-4 border border-white/10 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-[#19e6b3]/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ">
        <NewsLetterView token={token} />
      </section>
    </>
  );
}

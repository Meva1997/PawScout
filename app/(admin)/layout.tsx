import { verifySession } from "@/lib/auth/dal";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  const isAdmin = session.user.isAdmin;

  if (isAdmin !== true) {
    redirect("/login");
  }

  return <>{children}</>;
}

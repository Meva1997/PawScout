import { getCurrentUser } from "@/lib/auth";
import HomeHeaderClient from "./HomeHeaderClient";

export default async function HomeHeader() {
  const user = await getCurrentUser();

  return <HomeHeaderClient user={user} />;
}

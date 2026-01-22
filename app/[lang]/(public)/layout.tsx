import HomeFooter from "@/components/ui/HomeFooter";
import HomeHeader from "@/components/ui/HomeHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
}

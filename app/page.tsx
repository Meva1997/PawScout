import HeroSection from "@/components/home/HeroSection";
import HowWorks from "@/components/home/HowWorks";
import NewArrivals from "@/components/home/NewArrivals";

export default function page() {
  return (
    <main className="bg-white">
      <HeroSection />
      <HowWorks />
      <NewArrivals />
    </main>
  );
}

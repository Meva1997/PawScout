import EmailSubscription from "@/components/home/EmailSubscription";
import HeroSection from "@/components/home/HeroSection";
import HowWorks from "@/components/home/HowWorks";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";

export default function page() {
  return (
    <main className="bg-gray-100 py-10">
      <HeroSection />
      <HowWorks />
      <NewArrivals />
      <Testimonials />
      <EmailSubscription />
    </main>
  );
}

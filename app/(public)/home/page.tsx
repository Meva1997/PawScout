import EmailSubscription from "@/components/public/home/EmailSubscription";
import HeroSection from "@/components/public/home/HeroSection";
import HowWorks from "@/components/public/home/HowWorks";
import NewArrivals from "@/components/public/home/NewArrivals";
import Testimonials from "@/components/public/home/Testimonials";

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

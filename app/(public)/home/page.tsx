import EmailSubscription from "@/components/public/home/EmailSubscription";
import HeroSection from "@/components/public/home/HeroSection";
import HowWorks from "@/components/public/home/HowWorks";
import NewArrivals from "@/components/public/home/NewArrivals";
import Testimonials from "@/components/public/home/Testimonials";

export default function page() {
  return (
    <main className="bg-gray-200 py-10">
      <div className="px-6">
        <HeroSection />
      </div>
      <div className="px-6">
        <HowWorks />
      </div>
      <div className="px-6">
        <NewArrivals />
      </div>
      <div className="px-6">
        <Testimonials />
      </div>
      <div className="px-6">
        <EmailSubscription />
      </div>
    </main>
  );
}

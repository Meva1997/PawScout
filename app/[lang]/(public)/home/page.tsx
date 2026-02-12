import EmailSubscription from "@/components/public/home/EmailSubscription";
import HeroSection from "@/components/public/home/HeroSection";
import HowWorks from "@/components/public/home/HowWorks";
import NewArrivals from "@/components/public/home/NewArrivals";
import Testimonials from "@/components/public/home/Testimonials";
import type { Metadata } from "next";
import { ErrorNotification } from "@/components/ui/ErrorNotification";

export const metadata: Metadata = {
  title: "PawScout - Home",
  description: "Encuentra tu mascota ideal para adoptar con PawScout",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="bg-gray-200 py-10">
      {error === "backend-unavailable" && <ErrorNotification />}
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

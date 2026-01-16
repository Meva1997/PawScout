import HeroVolunteer from "@/components/public/volunteer/HeroVolunteer";
import VolunteerRequirements from "@/components/public/volunteer/VolunteerRequirements";
import VolunteerRoles from "@/components/public/volunteer/VolunteerRoles";
import WhyVolunteer from "@/components/public/volunteer/WhyVolunteer";

export default function page() {
  return (
    <>
      <main className="bg-gray-100 py-20">
        <HeroVolunteer />
        <div className="px-6">
          <WhyVolunteer />
        </div>
        <VolunteerRoles />
        <div className="px-6">
          <VolunteerRequirements />
        </div>
      </main>
    </>
  );
}

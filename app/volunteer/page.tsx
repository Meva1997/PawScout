import HeroVolunteer from "@/components/volunteer/HeroVolunteer";
import VolunteerRequirements from "@/components/volunteer/VolunteerRequirements";
import VolunteerRoles from "@/components/volunteer/VolunteerRoles";
import WhyVolunteer from "@/components/volunteer/WhyVolunteer";

export default function page() {
  return (
    <>
      <main className="bg-gray-100 py-20">
        <HeroVolunteer />
        <WhyVolunteer />
        <VolunteerRoles />
        <VolunteerRequirements />
      </main>
    </>
  );
}

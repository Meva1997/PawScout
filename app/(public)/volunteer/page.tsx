import HeroVolunteer from "@/components/public/volunteer/HeroVolunteer";
import VolunteerRequirements from "@/components/public/volunteer/VolunteerRequirements";
import VolunteerRoles from "@/components/public/volunteer/VolunteerRoles";

export default function page() {
  return (
    <>
      <main className="bg-gray-200 py-20">
        <HeroVolunteer />

        <VolunteerRoles />
        <div className="px-6">
          <VolunteerRequirements />
        </div>
      </main>
    </>
  );
}

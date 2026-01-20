import {
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";

type Benefit = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const volunteerBenefits: Benefit[] = [
  {
    title: "Recompensa emocional",
    description:
      "Siente la alegría de salvar vidas y hacer una diferencia real.",
    icon: HeartIcon,
  },
  {
    title: "Comunidad",
    description:
      "Conéctate con personas que comparten tu pasión por los animales.",
    icon: UserGroupIcon,
  },
  {
    title: "Desarrollo de habilidades",
    description:
      "Aprende nuevas habilidades y gana experiencia en el cuidado de animales.",
    icon: AcademicCapIcon,
  },
  {
    title: "Salud y bienestar",
    description:
      "Mejora tu bienestar físico y mental al dedicar tiempo a una causa significativa.",
    icon: ShieldCheckIcon,
  },
];

export default function WhyVolunteer() {
  return (
    <>
      <article className="grid md:grid-cols-3 max-w-6xl justify-center items-center mx-auto gap-18 bg-white p-10 rounded-lg shadow-lg my-16">
        <section className="space-y-4 col-span-1">
          <p className="font-bold text-emerald-600 text-md">Beneficios</p>
          <h3 className="text-3xl font-black">¿Por qué ser voluntario?</h3>
          <p className="text-gray-500">
            Ser voluntario en nuestra organización de rescate de mascotas no
            solo transforma vidas, sino que también enriquece la tuya. Al unirte
            a nuestro equipo de voluntarios, tendrás la oportunidad de marcar
            una diferencia tangible en la vida de animales necesitados,
            brindándoles amor, cuidado y la esperanza de un hogar para siempre.
            ¡Únete a nosotros y sé el cambio que quieres ver en el mundo animal!
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-10 col-span-2">
          {volunteerBenefits.map((benefit, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 p-4 rounded-lg bg-gray-50 shadow-md"
            >
              <benefit.icon className="h-6 w-6 text-emerald-600 mb-2" />
              <h5 className="font-bold text-lg mb-2">{benefit.title}</h5>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </section>
      </article>
    </>
  );
}

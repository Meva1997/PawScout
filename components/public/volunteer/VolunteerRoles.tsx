type VolunteerRole = {
  title: string;
  description: string;
};

const roles: VolunteerRole[] = [
  {
    title: "Cuidador de Animales",
    description:
      "Proporciona cuidado diario, alimentación y ejercicio a las mascotas bajo nuestro cuidado.",
  },
  {
    title: "Asistente de Eventos",
    description:
      "Ayuda en la organización y ejecución de eventos de adopción y recaudación de fondos.",
  },
  {
    title: "Coordinador de Redes Sociales",
    description:
      "Gestiona nuestras plataformas de redes sociales para aumentar la visibilidad y promover las adopciones.",
  },
  {
    title: "Asistente Administrativo",
    description:
      "Apoya con tareas administrativas como gestión de bases de datos y comunicación con adoptantes potenciales.",
  },
  {
    title: "Voluntario de Transporte",
    description:
      "Ayuda a transportar mascotas a citas veterinarias, eventos de adopción y nuevos hogares.",
  },
  {
    title: "Entrenador de Mascotas",
    description:
      "Proporciona entrenamiento básico y socialización para mejorar el comportamiento de las mascotas.",
  },
];

export default function VolunteerRoles() {
  return (
    <>
      <article className="py-20">
        <section className="flex flex-col justify-center text-center space-y-4 mb-8">
          <h4 className="font-bold text-2xl">Roles disponibles</h4>
          <p className="text-gray-500 max-w-4xl mx-auto">
            Tenemos una variedad de roles para voluntarios, desde cuidado de
            animales hasta apoyo en eventos y administración. ¡Encuentra el rol
            perfecto para ti!
          </p>
        </section>
        <section className="grid md:grid-cols-3 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 p-4 rounded-lg m-4 bg-white shadow-lg"
            >
              <h5 className="font-bold text-lg mb-2">{role.title}</h5>
              <p className="text-gray-500">{role.description}</p>
            </div>
          ))}
        </section>
      </article>
    </>
  );
}

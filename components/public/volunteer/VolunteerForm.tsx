const daysOfWeek = [
  { label: "Lunes", value: "monday" },
  { label: "Martes", value: "tuesday" },
  { label: "Miércoles", value: "wednesday" },
  { label: "Jueves", value: "thursday" },
  { label: "Viernes", value: "friday" },
  { label: "Sábado", value: "saturday" },
  { label: "Domingo", value: "sunday" },
];

const areaOfInterest = [
  { label: "Cuidado de animales", value: "animalCare" },
  { label: "Planificación de eventos", value: "eventPlanning" },
  { label: "Recaudación de fondos", value: "fundraising" },
  { label: "Apoyo administrativo", value: "administrativeSupport" },
  { label: "Alcance comunitario", value: "outreach" },
  { label: "Otro", value: "other" },
];

export default function VolunteerForm() {
  return (
    <article className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <form action="">
        <section>
          <h2 className="font-bold text-2xl pb-6">Información Personal</h2>
          <hr className="mb-6 text-gray-200" />

          <div className="grid grid-cols-2">
            <div className="flex flex-col mb-4 mr-4">
              <label htmlFor="firstName" className="mb-2 font-semibold">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder="Juan"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="lastName" className="mb-2 font-semibold">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder="Pérez"
                required
              />
            </div>
            <div className="flex flex-col mb-4 mr-4">
              <label htmlFor="email" className="mb-2 font-semibold">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full"
                placeholder="email@email.com"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-2 font-semibold">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border border-gray-300 p-2 rounded-full bg-gray-100"
                placeholder="123-456-7890"
                required
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-2xl py-6">Disponibilidad</h3>
          <hr className="mb-6 text-emerald-600" />
          <p className="text-gray-600 pb-2">Dias disponibles</p>
          <div className="flex gap-4">
            {daysOfWeek.map((day) => (
              <label key={day.value} className="flex items-center">
                <input
                  type="checkbox"
                  name="days"
                  value={day.value}
                  className="mr-2"
                />
                {day.label}
              </label>
            ))}
          </div>
          <div className="mt-4 mb-8">
            <p className="text-gray-600 pb-2">Horario preferido</p>
            <select
              name="preferredTime"
              className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-xs"
            >
              <option value="morning">Mañana</option>
              <option value="afternoon">Tarde</option>
              <option value="evening">Noche</option>
            </select>
          </div>
        </section>
        <section>
          <h3 className="font-bold text-2xl py-6">Areas de interes</h3>
          <hr className="mb-6 text-emerald-600" />
          <div className="grid md:grid-cols-2">
            {areaOfInterest.map((area) => (
              <label key={area.value} className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="areas"
                  value={area.value}
                  className="mr-2"
                />
                {area.label}
              </label>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <h4 className="font-bold text-2xl py-6">Experiencia y habilidades</h4>
          <hr className="mb-6 text-emerald-600" />
          <div>
            <p className="text-black">Porque quieres ser voluntario?</p>
            <textarea
              name="textVolunteer"
              id="textVolunteer"
              rows={4}
              className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full h-32 mt-2"
              placeholder="Escribe aqui..."
            ></textarea>
          </div>
          <div>
            <p className="text-black">Habilidades especiales? (opcional)</p>
            <textarea
              name="specialSkills"
              id="specialSkills"
              className="border border-gray-300 bg-gray-100 p-2 rounded-lg w-full h-10 mt-2"
              placeholder="Escribe aqui..."
            ></textarea>
          </div>
        </section>
        <section className="space-y-4">
          <h5 className="font-bold text-2xl py-6">Contacto de emergencia</h5>
          <hr className="mb-6 text-emerald-600" />
          <div className="flex items-center justify-center">
            <div>
              <label htmlFor="">Nombre de contacto</label>
              <input
                type="text"
                name="emergencyContactName"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder="Nombre completo"
              />
            </div>
            <div className="ml-8">
              <label htmlFor="">Teléfono de contacto</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                className="border border-gray-300 bg-gray-100 p-2 rounded-full w-full max-w-3xl mt-2"
                placeholder="123-456-7890"
              />
            </div>
          </div>
        </section>

        <hr className="my-10 text-emerald-600" />

        <section>
          <div className="flex items-center justify-center max-w-lg mx-auto gap-4">
            <input type="checkbox" className="mr-2" name="terms" />
            <p className="text-gray-400">
              Confirmo que soy mayor de 18 años de edad, acepto los{" "}
              <span className="text-emerald-600 font-bold">
                términos y condiciones y la política de privacidad
              </span>
              .
            </p>
          </div>
          <button
            type="submit"
            className="mt-8 bg-emerald-500 text-black font-bold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-300 mx-auto block cursor-pointer"
          >
            Enviar formulario
          </button>
          <p className="text-center mt-6 text-gray-400">
            Revisaremos tu solicitud y nos pondremos en contacto contigo de 3-5
            días habiles.
          </p>
        </section>
      </form>
    </article>
  );
}

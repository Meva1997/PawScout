import FormSettings from "@/components/admin/settings/FormSettings";
import LogOutButton from "@/components/ui/LogOutButton";

export default function page() {
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-between px-4 my-6">
        <div className="space-y-2">
          <h1 className="font-bold text-white text-3xl">
            Configuracion de página
          </h1>
          <p>Ajusta las configuraciones de tu página aquí.</p>
        </div>
        <div className="flex items-center">
          <LogOutButton />
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-2xl hover:bg-emerald-600 transition cursor-pointer font-semibold">
            Guardar cambios
          </button>
        </div>
      </section>

      <FormSettings />
    </>
  );
}

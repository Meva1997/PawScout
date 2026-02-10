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
        <div className="flex items-center gap-3">
          <LogOutButton />
        </div>
      </section>

      <FormSettings />
    </>
  );
}

export default function MapLocationLoading() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden bg-gray-200">
      <div className="relative h-full w-full animate-pulse">
        <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-300 to-gray-200" />
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-px px-4 py-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="bg-white/30 rounded-lg"
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 shadow">
          <span
            className="h-3 w-3 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-gray-600">
            Cargando mapa…
          </span>
        </div>
      </div>
    </div>
  );
}

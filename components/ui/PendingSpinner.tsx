export default function PendingSpinner() {
  return (
    <div className="flex items-center justify-center pt-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

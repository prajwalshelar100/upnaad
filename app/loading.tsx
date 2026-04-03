export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-text-secondary animate-pulse">
          Resonating
        </p>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-accent rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

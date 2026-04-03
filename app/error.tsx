'use client';

import { useEffect } from 'react';
import { RotateCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Something went wrong</h2>
      <p className="text-text-secondary max-w-md mb-8">
        We encountered an error while processing the soundscape. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-text-light dark:bg-text-dark text-white dark:text-black px-6 py-3 rounded-full font-bold transition-all hover:opacity-90"
      >
        <RotateCw size={18} />
        Retry Connection
      </button>
    </div>
  );
}

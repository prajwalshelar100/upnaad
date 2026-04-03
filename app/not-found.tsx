import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-8xl font-bold tracking-tighter opacity-10 mb-4 italic font-serif">404</h1>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Frequency Lost</h2>
      <p className="text-xl text-text-secondary max-w-md font-light mb-10 italic">
        "The sound you are looking for has returned to the silence."
      </p>
      <Link
        href="/"
        className="flex items-center gap-3 bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold transition-all hover:opacity-90 group shadow-xl"
      >
        <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
        Return to Source
      </Link>
    </div>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-16 space-y-4", className)}>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-light dark:text-text-dark">
        {title}
      </h1>
      {description && (
        <p className="text-xl md:text-2xl text-text-secondary font-light max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

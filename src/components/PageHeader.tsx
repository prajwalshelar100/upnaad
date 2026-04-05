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
      <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-text-primary dark:text-text-primary">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

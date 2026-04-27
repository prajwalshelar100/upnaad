import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  size?: 'default' | 'large';
}

export default function PageHeader({ title, description, eyebrow, className, size = 'default' }: PageHeaderProps) {
  return (
    <header className={cn("mb-12 space-y-3", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
      )}
      <h1 className={cn(
        "font-bold tracking-tighter text-text-primary dark:text-text-primary leading-none",
        size === 'large' ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
      )}>
        {title}
      </h1>
      {description && (
        <p className="text-lg text-text-secondary font-light max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}

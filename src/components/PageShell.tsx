import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageShellProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

/**
 * PageShell — universal page wrapper.
 * Provides consistent max-width, padding, and an optional breadcrumb bar.
 * Use this on every page route so layout is identical to the homepage centre column.
 */
export default function PageShell({ children, breadcrumbs, className }: PageShellProps) {
  return (
    <div className={cn('space-y-10', className)}>
      {/* ── Breadcrumb ─────────────────────────────── */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            {/* Home icon */}
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-accent transition-colors"
              >
                <Home size={11} />
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                <ChevronRight size={10} className="text-text-secondary/40 flex-shrink-0" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[11px] font-semibold text-text-secondary hover:text-accent transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[11px] font-bold text-accent">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* ── Page content ───────────────────────────── */}
      {children}
    </div>
  );
}

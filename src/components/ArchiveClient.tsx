"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';

export default function ArchiveClient({ initialReleases }: { initialReleases: any[] }) {
  const [filter, setFilter] = useState("All");
  
  const mappedReleases = initialReleases.map(r => ({
    ...r,
    slug: r.slug?.current || r.slug,
    topics: r.topics || [],
  }));

  const allTopicsSet = new Set<string>();
  mappedReleases.forEach(r => r.topics.forEach((t: string) => allTopicsSet.add(t)));
  const topics = ["All", ...Array.from(allTopicsSet)];

  const filtered = filter === "All"
    ? mappedReleases
    : mappedReleases.filter(d => d.topics.includes(filter));

  return (
    <div className="py-12 space-y-16">
      <PageHeader
        title="Archive"
        description="A chronological record of all UPNAAD research."
        className="mb-0"
      />

      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${filter === t
              ? "bg-text-light text-white dark:bg-text-dark dark:text-black shadow-lg shadow-accent/10"
              : "bg-white dark:bg-white/5 text-text-secondary border border-border-light dark:border-border-dark hover:border-accent/40"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(drop => (
          <Link
            key={drop.slug}
            href={`/releases/${drop.slug}`}
            className="group flex flex-col bg-white dark:bg-white/5 border border-border-light dark:border-border-dark rounded-[2.5rem] p-8 shadow-premium transition-all duration-500"
          >
            <div className="space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{drop.date}</p>
                <div className="flex gap-1">
                  {drop.topics.slice(0, 2).map((topic: string) => (
                    <span key={topic} className="text-[9px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full uppercase font-bold text-text-secondary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">{drop.title}</h3>
              <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-2">
                {drop.description || "Archived release and research notes."}
              </p>
              <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                View Release <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
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
    <div className="space-y-12">
      <PageHeader
        title="Archive"
        description="A chronological record of all UPNAAD research."
      />

      <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar-hide snap-x">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1 rounded-full text-sm border transition-colors flex-shrink-0 snap-start ${filter === t
              ? "bg-text-light text-white border-text-light dark:bg-text-dark dark:text-black"
              : "border-border-light dark:border-border-dark text-text-secondary hover:border-accent"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="divide-y divide-border-light dark:divide-border-dark">
        {filtered.map(drop => (
          <Link
            key={drop.slug}
            href={`/releases/${drop.slug}`}
            className="py-8 flex flex-col md:flex-row md:items-center justify-between group"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-accent uppercase tracking-widest">{drop.date}</p>
              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{drop.title}</h3>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {drop.topics.map((topic: string) => (
                <span key={topic} className="text-[10px] border border-border-light dark:border-border-dark px-2 py-1 rounded uppercase">
                  {topic}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

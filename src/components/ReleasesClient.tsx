"use client";

import { useState } from 'react';
import NewReleaseCard from '@/src/components/NewReleaseCard';
import PageHeader from '@/src/components/PageHeader';
import { Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { urlForImage } from '@/src/sanity/lib/image';

interface ReleasesClientProps {
  initialReleases: any[];
}

export default function ReleasesClient({ initialReleases }: ReleasesClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Map Sanity images to expected structure
  const mappedReleases = initialReleases.map(r => ({
    ...r,
    slug: r.slug?.current || r.slug,
    coverImage: r.coverImage ? urlForImage(r.coverImage).url() : (r.coverImageUrlFallback || "https://picsum.photos/seed/placeholder/1200/600"),
    topics: r.topics || [],
  }));

  const allTopicsSet = new Set<string>();
  mappedReleases.forEach(r => r.topics.forEach((t: string) => allTopicsSet.add(t)));
  const topicsArray = ["All", ...Array.from(allTopicsSet)];

  const filteredDrops = activeFilter === "All"
    ? mappedReleases
    : mappedReleases.filter(drop => drop.topics.includes(activeFilter));

  return (
    <div className="space-y-12">
      <PageHeader
        title="Behind the Song"
        description="Explore the deep research, storytelling, and creative process behind every track."
      />

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
        <Filter size={18} className="text-text-secondary shrink-0" />
        {topicsArray.map(topic => (
          <button
            key={topic}
            onClick={() => setActiveFilter(topic)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === topic
              ? "bg-accent text-white"
              : "bg-gray-100 dark:bg-gray-800 text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {filteredDrops.length === 0 ? (
        <div className="text-center py-24 space-y-8 bg-gray-50 dark:bg-[#111111] rounded-[3rem] border border-dashed border-border-light dark:border-border-dark">
          <div className="space-y-4 max-w-sm mx-auto">
            <h3 className="text-2xl font-bold tracking-tight">Research Underway</h3>
            <p className="text-text-secondary font-light">
              We are currently layering research and meaning for new releases. Explore our existing drops or influence the next one.
            </p>
            <div className="pt-4">
              <Link 
                href="/submit-topic" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:underline"
              >
                Submit a Topic <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredDrops.map(drop => (
            <NewReleaseCard key={drop.slug} drop={drop} />
          ))}
        </div>
      )}
    </div>
  );
}

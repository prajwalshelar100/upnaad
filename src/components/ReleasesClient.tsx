"use client";

import { useState } from 'react';
import NewReleaseCard from '@/src/components/NewReleaseCard';
import PageHeader from '@/src/components/PageHeader';
import { Filter } from 'lucide-react';
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

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredDrops.map(drop => (
          <NewReleaseCard key={drop.slug} drop={drop} />
        ))}
      </div>
    </div>
  );
}

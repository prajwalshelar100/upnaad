"use client";

import { useState } from 'react';
import { newReleases } from '@/src/data/new-releases';
import NewReleaseCard from '@/src/components/NewReleaseCard';
import PageHeader from '@/src/components/PageHeader';
import { Filter } from 'lucide-react';

const TOPICS = [
  "All",
  "Psychology",
  "Identity",
  "Society",
  "Politics",
  "Culture",
  "Technology"
];

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredDrops = activeFilter === "All"
    ? newReleases
    : newReleases.filter(drop => drop.topics.includes(activeFilter));

  return (
    <div className="space-y-12">
      <PageHeader
        title="New Releases"
        description="Deep dives into the intersection of sound, society, and the human experience."
      />

      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-1 px-1">
        <Filter size={18} className="text-text-secondary shrink-0" />
        {TOPICS.map(topic => (
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

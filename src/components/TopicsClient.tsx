"use client";

import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Flame, Brain, Music, Search, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const statusConfig: any = {
  'Trending': { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  'Under Research': { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'Song Released': { icon: Music, color: 'text-green-500', bg: 'bg-green-500/10' },
};

export default function TopicsClient({ initialTopics }: { initialTopics: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = initialTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <PageHeader 
          title="Community Topics" 
          description="A curated pipeline of ideas being explored through research and music. From social paradoxes to philosophical inquiries, this is our awareness engine."
          className="mb-0"
        />
        <Link 
          href="/submit-topic" 
          className="bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all w-fit shadow-xl shadow-accent/5 mb-4"
        >
          Submit a new topic <Plus size={18} />
        </Link>
      </div>

      <div className="relative max-w-md">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Filter topics or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-3xl py-4 pl-16 pr-6 focus:outline-none focus:border-accent transition-all text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.map((topic, index) => {
          const config = statusConfig[topic.status] || statusConfig['Trending'];
          return (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-[2.5rem] p-8 space-y-6 hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5"
            >
              <div className="flex items-start justify-between">
                <span className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]", config.bg, config.color)}>
                  <config.icon size={12} /> {topic.status}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/50">
                  {topic.category}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
                  {topic.title}
                </h3>
                <p className="text-text-secondary text-sm font-light leading-relaxed line-clamp-3">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
                    <ThumbsUp size={14} className="text-accent/60" /> {topic.upvotes || 0}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-text-secondary/60">
                    <ThumbsDown size={14} /> {topic.downvotes || 0}
                  </div>
                </div>
                {topic.songLink && (
                  <Link href={topic.songLink} className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
                    View Song <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-20 italic text-text-secondary">
          No topics found matching your search.
        </div>
      )}
    </div>
  );
}

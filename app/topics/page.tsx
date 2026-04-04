"use client";

import { motion } from 'motion/react';
import { ArrowRight, Flame, Brain, Music, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TOPICS = [
  {
    id: "1",
    title: "Digital Solitude",
    description: "The paradox of feeling lonely while being hyper-connected in a digital age.",
    category: "Mental Health",
    status: "Trending",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    id: "2",
    title: "The Ethics of AI Creativity",
    description: "Who owns the soul of a song if an algorithm helped write the melody?",
    category: "Technology",
    status: "Under Research",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "3",
    title: "Modern Materialism vs. Ancient Wisdom",
    description: "Bridging the gap between 21st-century consumerism and traditional values.",
    category: "Philosophy",
    status: "Song Released",
    icon: Music,
    color: "text-green-500",
    bg: "bg-green-500/10",
    songLink: "/releases/modern-wisdom"
  },
  {
    id: "4",
    title: "Eco-Anxiety & The Sound of Nature",
    description: "How can sound therapy help process the collective grief over climate change?",
    category: "Society",
    status: "Trending",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    id: "5",
    title: "The Art of Listening",
    description: "In a world of noise, true listening has become a revolutionary act.",
    category: "Social",
    status: "Under Research",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "6",
    title: "Digital Immortality",
    description: "What remains of a person in their digital footprint after they are gone?",
    category: "Technology",
    status: "Song Released",
    icon: Music,
    color: "text-green-500",
    bg: "bg-green-500/10",
    songLink: "/releases/digital-ghosts"
  }
];

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = TOPICS.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-6 space-y-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">Community Topics</h1>
          <p className="text-xl text-text-secondary font-light leading-relaxed">
            A curated pipeline of ideas being explored through research and music. 
            From social paradoxes to philosophical inquiries, this is our awareness engine.
          </p>
        </div>
        <Link 
          href="/submit-topic" 
          className="bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all w-fit shadow-xl shadow-accent/5"
        >
          Submit a new topic <Plus size={18} />
        </Link>
      </div>

      {/* Search Bar */}
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

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-[2.5rem] p-8 space-y-6 hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5"
          >
            <div className="flex items-start justify-between">
              <span className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]", topic.bg, topic.color)}>
                <topic.icon size={12} /> {topic.status}
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
              {topic.songLink ? (
                <Link href={topic.songLink} className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
                  View Song <ArrowRight size={14} />
                </Link>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Research in progress</span>
              )}
              <div className="flex -space-x-2">
                {[1, 2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-800" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-20 italic text-text-secondary">
          No topics found matching your search.
        </div>
      )}
    </div>
  );
}

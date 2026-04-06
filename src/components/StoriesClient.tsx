"use client";

import { motion } from 'motion/react';
import { BookOpen, Search, ArrowRight, User, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StoriesClient({ initialStories }: { initialStories: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(initialStories.map(s => s.category)))];

  const filteredStories = initialStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <PageHeader 
          title="Stories & Narratives" 
          description="Curated stories that connect emotion, awareness, and insight. A digital compilation of human experiences and philosophical journeys."
          className="mb-0"
        />
        <Link 
          href="/collaborate" 
          className="bg-accent text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all w-fit shadow-xl shadow-accent/20 mb-4"
        >
          Submit your story <ArrowRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-3xl py-4 pl-16 pr-6 focus:outline-none focus:border-accent transition-all text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                selectedCategory === cat 
                  ? "bg-accent border-accent text-white" 
                  : "bg-white dark:bg-gray-900 border-border-light dark:border-border-dark text-text-secondary hover:border-accent/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredStories.map((story, index) => (
          <motion.div
            key={story._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-accent/5"
          >
            <Link href={`/stories/${story.slug.current}`} className="block relative aspect-[16/10] overflow-hidden">
              {story.coverImage ? (
                <Image
                  src={urlForImage(story.coverImage).url()}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-accent/5 flex items-center justify-center">
                  <BookOpen size={48} className="text-accent/20" />
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/20">
                  {story.category}
                </span>
              </div>
            </Link>

            <div className="p-8 flex-1 flex flex-col space-y-6">
              <div className="space-y-4">
                <Link href={`/stories/${story.slug.current}`}>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                    {story.title}
                  </h3>
                </Link>
                <p className="text-text-secondary text-sm font-light leading-relaxed line-clamp-3">
                  {story.excerpt}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary/60">
                  <div className="flex items-center gap-1.5">
                    <User size={12} className="text-accent/50" /> {story.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} /> {new Date(story.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                  </div>
                </div>
                <Link href={`/stories/${story.slug.current}`} className="w-10 h-10 rounded-full bg-accent/5 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all transform group-hover:translate-x-1">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <BookOpen size={48} className="mx-auto text-text-secondary/20" />
          <p className="italic text-text-secondary text-lg">
            No stories found matching your selection.
          </p>
        </div>
      )}
    </div>
  );
}

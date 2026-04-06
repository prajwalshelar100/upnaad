"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, Tag, Share2, BookOpen, Heart } from 'lucide-react';
import { urlForImage } from '@/src/sanity/lib/image';
import Markdown from 'react-markdown';
import ReadingModeToggle from '@/src/components/ReadingModeToggle';
import { useTheme } from '@/src/components/ThemeProvider';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function StoryDetailClient({ story }: { story: any }) {
  const { isReadingMode } = useTheme();

  if (!story) return null;

  return (
    <div className={cn("py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700", isReadingMode && "py-20")}>
      {!isReadingMode && (
        <div className="flex items-center justify-between">
          <Link 
            href="/stories" 
            className="group flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowLeft size={16} />
            </div>
            Back to Stories
          </Link>
          <div className="flex items-center gap-4">
            <ReadingModeToggle />
            <button className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      )}

      <article className={cn("mx-auto transition-all duration-500", isReadingMode ? "max-w-[700px]" : "max-w-[900px]")}>
        <header className="space-y-8 mb-12">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 border border-accent/10">
              {story.category}
            </span>
            <h1 className={cn(
              "font-bold tracking-tight leading-[1.1] transition-all duration-500",
              isReadingMode ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"
            )}>
              {story.title}
            </h1>
          </div>

          <div className="flex items-center gap-8 text-text-secondary border-y border-border-light/50 dark:border-border-dark/50 py-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Author</p>
                <p className="text-sm font-medium text-text-primary">{story.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Published</p>
                <p className="text-sm font-medium text-text-primary">
                  {new Date(story.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </header>

        {story.coverImage && !isReadingMode && (
          <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl group">
            <Image
              src={urlForImage(story.coverImage).url()}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        )}

        <div className={cn(
          "markdown-body prose dark:prose-invert max-w-none transition-all duration-500",
          isReadingMode ? "prose-lg" : "prose-base"
        )}>
          <Markdown>{story.content}</Markdown>
        </div>

        {story.tags && story.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark flex flex-wrap gap-2">
            {story.tags.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-full text-xs font-medium text-text-secondary border border-border-light dark:border-border-dark hover:border-accent/30 transition-colors">
                <Tag size={12} className="text-accent/40" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-20 p-12 bg-accent/5 dark:bg-accent/5 rounded-[3rem] border border-accent/10 text-center space-y-6">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
            <Heart size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Did this story resonate?</h3>
            <p className="text-text-secondary max-w-md mx-auto font-light">
              We believe in the power of shared experiences. Join the conversation and help us evolve the meaning platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/collaborate" 
              className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-accent/20"
            >
              Submit your own story
            </Link>
            <Link 
              href="/topics" 
              className="bg-white dark:bg-black text-text-primary px-8 py-4 rounded-full font-bold border border-border-light dark:border-border-dark hover:bg-gray-50 transition-all"
            >
              Explore research topics
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

"use client";

import { useState, useTransition } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, CheckCircle2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { submitStory } from '@/app/actions/story';
import PageHeader from './PageHeader';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SubmitStoryClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      category: formData.get('category') as string,
      content: formData.get('content') as string,
      email: formData.get('email') as string,
    };

    startTransition(async () => {
      const result = await submitStory(data);
      if (result.success) {
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark text-center space-y-6 shadow-2xl"
        >
          <div className="flex justify-center">
            <div className="bg-accent/10 p-4 rounded-full">
              <CheckCircle2 size={48} className="text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Story Received</h1>
          <p className="text-text-secondary leading-relaxed">
            Thank you for sharing your narrative. Our team will review it and notify you if it's selected for publication.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/stories" 
              className="inline-block bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all text-sm"
            >
              Explore Stories
            </Link>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors py-2"
            >
              Submit Another Story
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-12">
      <div className="space-y-6">
        <Link href="/stories" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stories
        </Link>
        <PageHeader 
          title="Share Your Story" 
          description="We believe in the power of narratives to connect and heal. Share a personal experience, an insight, or a philosophical journey."
          className="mb-0"
        />
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-premium space-y-8"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Story Title *</label>
            <input
              required
              name="title"
              type="text"
              id="title"
              placeholder="Give your story a title"
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="author" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Your Name / Pen Name *</label>
            <input
              required
              name="author"
              type="text"
              id="author"
              placeholder="How should we credit you?"
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Category *</label>
          <select
            required
            name="category"
            id="category"
            className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a category</option>
            <option value="Emotion">Emotion</option>
            <option value="Awareness">Awareness</option>
            <option value="Insight">Insight</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Personal Narrative">Personal Narrative</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Your Story *</label>
          <textarea
            required
            name="content"
            id="content"
            rows={12}
            placeholder="Write your story here... Don't worry about formatting, focus on the essence."
            className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all resize-none"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email (Optional)</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="your@email.com"
            className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
          />
          <p className="text-[10px] text-text-secondary mt-2 ml-1 italic text-balance">We'll only reach out if we'd like to feature your story or if we have questions.</p>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-accent text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
        >
          {isPending ? "Sharing Essence..." : <>Share Story <Send size={18} /></>}
        </button>
      </motion.form>
    </div>
  );
}

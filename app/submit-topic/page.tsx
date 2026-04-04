"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SubmitTopicPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
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
          <h1 className="text-3xl font-bold tracking-tight">Topic Received</h1>
          <p className="text-text-secondary leading-relaxed">
            Your topic has been received. If selected, it will be explored through research and music.
          </p>
          <div className="pt-4">
            <Link 
              href="/topics" 
              className="inline-block bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              Explore Existing Topics
            </Link>
          </div>
          <button 
            onClick={() => setSubmitted(false)}
            className="block w-full text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
          >
            Submit Another Topic
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter">Submit a Topic</h1>
        <p className="text-xl text-text-secondary font-light">
          Submit a topic you think the world should reflect on. Every great song starts with a powerful question.
        </p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-xl space-y-8"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Topic Title *</label>
            <input
              required
              type="text"
              id="title"
              placeholder="e.g. The Ethics of Digital Immortality"
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Category *</label>
            <select
              required
              id="category"
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              <option value="Social">Social</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Technology">Technology</option>
              <option value="Society">Society</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Description *</label>
            <textarea
              required
              id="description"
              rows={5}
              placeholder="Tell us why this topic matters and what questions it raises..."
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email (Optional)</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full bg-gray-50 dark:bg-black border border-border-light dark:border-border-dark rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all"
            />
            <p className="text-[10px] text-text-secondary mt-2 ml-1 italic">We'll only contact you if we decide to pursue this topic.</p>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-text-light dark:bg-text-dark text-white dark:text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/5"
        >
          {loading ? "Processing..." : <>Submit Topic <Send size={18} /></>}
        </button>
      </motion.form>
    </div>
  );
}

"use client";

import { useState, useTransition, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, CheckCircle2, ThumbsUp, ThumbsDown, Flame, Brain, Music } from 'lucide-react';
import Link from 'next/link';
import { submitTopic, voteTopic } from '@/app/actions/topic';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import PageHeader from './PageHeader';

const statusConfig: any = {
  'Trending': { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  'Under Research': { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'Song Released': { icon: Music, color: 'text-green-500', bg: 'bg-green-500/10' },
};

export default function SubmitTopicClient({ initialTopics }: { initialTopics: any[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [votedTopics, setVotedTopics] = useState<string[]>([]);
  const [topics, setTopics] = useState(initialTopics);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('upnaad_votes') || '[]');
    setVotedTopics(savedVotes);
  }, []);

  const handleVote = async (topicId: string, type: 'up' | 'down') => {
    if (votedTopics.includes(topicId)) return;

    // Optimistic Update
    setTopics(prev => prev.map(t => {
      if (t._id === topicId) {
        return {
          ...t,
          upvotes: type === 'up' ? (t.upvotes || 0) + 1 : t.upvotes,
          downvotes: type === 'down' ? (t.downvotes || 0) + 1 : t.downvotes,
        };
      }
      return t;
    }));

    const newVoted = [...votedTopics, topicId];
    setVotedTopics(newVoted);
    localStorage.setItem('upnaad_votes', JSON.stringify(newVoted));

    startTransition(async () => {
      await voteTopic(topicId, type);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      email: formData.get('email') as string,
    };

    startTransition(async () => {
      const result = await submitTopic(data);
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
          <h1 className="text-3xl font-bold tracking-tight">Topic Received</h1>
          <p className="text-text-secondary leading-relaxed">
            Your topic has been received. If selected, it will be explored through research and music.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/topics" 
              className="inline-block bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all"
            >
              Explore All Topics
            </Link>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors py-2"
            >
              Submit Another Topic
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      {/* Submission Section */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <PageHeader 
              title="Submit a Topic" 
              description="Submit a topic you think the world should reflect on. Every great song starts with a powerful question."
              className="mb-0"
            />
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-premium space-y-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Topic Title *</label>
              <input
                required
                name="title"
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
                name="category"
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
                name="description"
                id="description"
                rows={5}
                placeholder="Tell us why this topic matters and what questions it raises..."
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
              <p className="text-[10px] text-text-secondary mt-2 ml-1 italic">We'll only contact you if we decide to pursue this topic.</p>
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-text-light dark:bg-text-dark text-white dark:text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/5"
          >
            {isPending ? "Processing..." : <>Submit Topic <Send size={18} /></>}
          </button>
        </motion.form>
      </section>

      {/* Running Topics Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Explore Running Topics</h2>
          <p className="text-text-secondary font-light">
            These topics are currently being debated by the community. Vote for the ones you want to see translated into sound.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.slice(0, 6).map((topic, index) => {
            const config = statusConfig[topic.status] || statusConfig['Trending'];
            const hasVoted = votedTopics.includes(topic._id);
            
            return (
              <motion.div
                key={topic._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-[2.5rem] p-8 space-y-6 shadow-premium transition-all hover:scale-[1.02]"
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
                  <h3 className="text-2xl font-bold tracking-tight leading-tight">{topic.title}</h3>
                  <p className="text-text-secondary text-sm font-light leading-relaxed line-clamp-2">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleVote(topic._id, 'up')}
                      disabled={hasVoted}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        hasVoted ? "bg-accent/20 text-accent cursor-default" : "bg-gray-100 dark:bg-white/5 hover:bg-accent/10 hover:text-accent"
                      )}
                    >
                      <ThumbsUp size={14} /> {topic.upvotes || 0}
                    </button>
                    <button 
                      onClick={() => handleVote(topic._id, 'down')}
                      disabled={hasVoted}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                        hasVoted ? "opacity-50 cursor-default" : "bg-gray-100 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500"
                      )}
                    >
                      <ThumbsDown size={14} /> {topic.downvotes || 0}
                    </button>
                  </div>
                  {hasVoted && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent animate-pulse">Voted</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <Link 
            href="/topics" 
            className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            View all community topics <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}

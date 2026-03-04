"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, BookOpen, Mic2 } from 'lucide-react';
import { motion } from 'motion/react';
import { researchDrops } from '@/src/data/research';
import SocialIcons from '@/src/components/SocialIcons';

export default function Home() {
  const latestDrop = researchDrops[0];

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="max-w-4xl pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-7xl md:text-[120px] font-bold tracking-tighter leading-[0.85] text-text-light dark:text-text-dark">
            UPNAAD
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-2xl md:text-4xl text-text-secondary font-light leading-tight max-w-xl">
              Research in Motion. <br />
              <span className="text-text-light dark:text-text-dark font-medium">Sound with Substance.</span>
            </p>
            <div className="pb-2">
              <SocialIcons />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-6 mt-16"
        >
          <Link
            href={`/research/${latestDrop.slug}`}
            className="bg-text-light dark:bg-text-dark text-white dark:text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent/10"
          >
            Explore Latest Drop <ArrowRight size={20} />
          </Link>
          <Link
            href="/research"
            className="border border-border-light dark:border-border-dark px-10 py-5 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
          >
            Browse Research
          </Link>
        </motion.div>
      </section>

      {/* Latest Drop Preview */}
      <section className="relative group">
        <div className="absolute -inset-4 bg-gray-50 dark:bg-[#111111] rounded-[3rem] -z-10 transition-colors duration-500 group-hover:bg-gray-100 dark:group-hover:bg-[#151515]"></div>
        <div className="grid lg:grid-cols-2 gap-16 items-center p-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={latestDrop.coverImage}
              alt={latestDrop.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Latest Publication</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{latestDrop.title}</h2>
              <p className="text-xl text-text-secondary font-light leading-relaxed">
                {latestDrop.thesis}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Link
                href={`/research/${latestDrop.slug}`}
                className="flex flex-col gap-4 p-5 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl hover:border-accent transition-all group/card"
              >
                <BookOpen size={20} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Read Study</span>
              </Link>
              <Link
                href="/music"
                className="flex flex-col gap-4 p-5 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl hover:border-accent transition-all group/card"
              >
                <Play size={20} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Listen Music</span>
              </Link>
              <Link
                href="/podcast"
                className="flex flex-col gap-4 p-5 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl hover:border-accent transition-all group/card"
              >
                <Mic2 size={20} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Watch Podcast</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-bold tracking-tighter text-xl">UPNAAD</p>
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Research in Motion. Sound with Substance.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <SocialIcons />
          <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
            © 2024 UPNAAD Platform • All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

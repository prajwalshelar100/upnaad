"use client";

import PageHeader from '@/src/components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Send } from 'lucide-react';
import SocialIcons from '@/src/components/SocialIcons';
import { newReleases } from '@/src/data/releases';

export default function AboutPage() {
  const latestDrop = newReleases[0];
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20 md:space-y-32">
      {/* Header Section */}
      <PageHeader
        title="About UPNAAD"
        description="UPNAAD is a music-first creative project exploring how meaningful ideas from culture, society, and science can be translated into sound, conversations, and reflective writing."
      />

      {/* The Process / Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">1</div>
          <h3 className="font-bold text-xl tracking-tight">Idea</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            Each UPNAAD release begins with a question, theme, or observation about the world—drawn from culture, society, science, or human experience.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">2</div>
          <h3 className="font-bold text-xl tracking-tight">Conversation</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            Ideas are explored through essays or podcast discussions that provide context, reflection, and different perspectives.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-start sm:col-span-2 md:col-span-1">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">3</div>
          <h3 className="font-bold text-xl tracking-tight">Music</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            These ideas are then interpreted through music, turning concepts and emotions into sound.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="space-y-8 md:space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Philosophy</h2>

        <div className="text-lg md:text-xl text-text-secondary leading-relaxed space-y-6 md:space-y-8 font-light">
          <p>
            UPNAAD explores the relationship between <span className="text-text-light dark:text-text-dark font-medium italic">ideas and sound</span>.
            Music has always been a way for societies to express questions, emotions, and collective experiences.
          </p>

          <p>
            Rather than presenting formal academic work, UPNAAD focuses on interpreting meaningful themes through artistic expression.
            Songs, discussions, and written reflections become different ways of engaging with the same underlying idea.
          </p>

          <p>
            The goal is simple: to create music that carries thought, curiosity, and depth — sound that invites listeners to reflect, question, and explore.
          </p>
        </div>
      </section>

      {/* Latest Drop Preview Section */}
      <section className="space-y-8 md:space-y-10 pt-12 md:pt-16 border-t border-border-light dark:border-border-dark">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Explore Our Latest Drop</h2>
          <Link
            href={`/releases/${latestDrop.slug}`}
            className="inline-flex text-accent font-bold items-center gap-2 hover:opacity-80 transition-opacity w-fit"
          >
            View Release <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative group rounded-3xl overflow-hidden bg-gray-50 dark:bg-[#111111] border border-border-light dark:border-border-dark p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
          <div className="relative w-full max-w-[300px] md:max-w-none md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl shrink-0 mx-auto">
            <Image
              src={latestDrop.coverImage}
              alt={latestDrop.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-5 flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Latest Release</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{latestDrop.title}</h3>
            <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
              {latestDrop.thesis}
            </p>
            <Link
              href={`/releases/${latestDrop.slug}`}
              className="inline-flex bg-text-light dark:bg-text-dark text-white dark:text-black px-8 py-4 rounded-full font-bold items-center justify-center gap-3 hover:scale-105 transition-transform w-full sm:w-fit mt-4"
            >
              Stream Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section & Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pt-12 md:pt-16 border-t border-border-light dark:border-border-dark">
        <div className="space-y-8 flex flex-col justify-center text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Get in Touch</h2>
            <p className="text-base md:text-lg text-text-secondary font-light">
              Have an idea you&apos;d like us to explore? Want to collaborate or just say hello? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-text-secondary block mb-1">General Inquiries</span>
              <a href="mailto:hello@upnaad.com" className="text-lg font-medium hover:text-accent transition-colors">hello@upnaad.com</a>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-text-secondary block mb-1">Collaborations</span>
              <a href="mailto:collab@upnaad.com" className="text-lg font-medium hover:text-accent transition-colors">collab@upnaad.com</a>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center md:items-start">
            <span className="text-xs uppercase tracking-widest font-bold text-text-secondary block mb-4">Follow Us</span>
            <SocialIcons />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#111111] p-6 sm:p-8 md:p-10 rounded-3xl border border-border-light dark:border-border-dark shadow-sm">
          <form action="https://formspree.io/f/mjgabykr" method="POST" className="space-y-5">
            <div className="space-y-2 text-left">
              <label htmlFor="name" className="text-sm font-bold tracking-wide">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                className="w-full bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-bold tracking-wide">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>

            <div className="space-y-2 text-left">
              <label htmlFor="message" className="text-sm font-bold tracking-wide">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="How can we help?"
                required
                className="w-full bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-text-light dark:bg-text-dark text-white dark:text-black py-4 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 md:pt-20 pb-10 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-bold tracking-tighter text-xl">UPNAAD</p>
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Meaning in every note. Sound with Substance.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest text-center md:text-right">
            © {currentYear} UPNAAD Platform <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
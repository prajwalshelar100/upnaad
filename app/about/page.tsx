import PageHeader from '@/src/components/PageHeader';
import PageShell from '@/src/components/PageShell';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Send } from 'lucide-react';
import SocialIcons from '@/src/components/SocialIcons';
import { client } from '@/src/sanity/lib/client';
import { latestReleaseQuery } from '@/src/sanity/lib/queries';
import { urlForImage } from '@/src/sanity/lib/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'UPNAAD is a creative ecosystem where sound, stories, and knowledge come together for curious minds.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const latestDrop = await client.fetch(latestReleaseQuery);
  const currentYear = new Date().getFullYear();

  const dropTitle = latestDrop?.title || "No release yet";
  const dropThesis = latestDrop?.thesis || "Check back soon for our latest drops.";
  const dropSlug = latestDrop?.slug?.current || "coming-soon";
  const dropCoverSrc = latestDrop?.coverImage 
    ? urlForImage(latestDrop.coverImage).url() 
    : (latestDrop?.coverImageUrlFallback || "https://picsum.photos/seed/placeholder/1200/600");

  return (
    <PageShell breadcrumbs={[{ label: 'About' }]}>
      <div className="py-2 space-y-20 md:space-y-32">
      {/* Header Section */}
      <PageHeader
        eyebrow="ABOUT UPNAAD"
        title="About UPNAAD"
        description="UPNAAD is a creative ecosystem where sound, stories, and knowledge come together. We blend AI-generated music, original storytelling, deep learning articles, and community voices — for curious, reflective minds."
      />

      {/* The Process / Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center text-2xl shrink-0">🎵</div>
          <h3 className="font-bold text-xl tracking-tight">Sound</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            AI-generated songs, educational music, and deep breakdowns of what each track means — turning listening into learning.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">📖</div>
          <h3 className="font-bold text-xl tracking-tight">Stories</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            Original written narratives — philosophical, emotional, real-life inspired. Chicken Soup for the curious soul.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">🧠</div>
          <h3 className="font-bold text-xl tracking-tight">Learn</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            Complex topics — science, tech, philosophy, society — explained through stories, songs, and written breakdowns.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-start">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center text-2xl shrink-0">🌍</div>
          <h3 className="font-bold text-xl tracking-tight">Community</h3>
          <p className="text-text-secondary text-base leading-relaxed">
            Your voices, ideas, and experiences. Submit stories, topics, and collaborate — no login required.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="space-y-8 md:space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Philosophy</h2>

        <div className="text-lg md:text-xl text-text-secondary leading-relaxed space-y-6 md:space-y-8 font-light">
          <p>
            UPNAAD — <span className="text-text-primary dark:text-text-primary font-medium italic">"resonance"</span> in Sanskrit — is not a streaming platform.
            It is a thinking space: a living digital ecosystem where sound, stories, and knowledge intersect.
          </p>

          <p>
            Every song has a research question behind it. Every story has a lesson inside it.
            Every article connects an idea to a feeling. We make content that engages you
            <span className="text-text-primary dark:text-text-primary font-medium"> emotionally, educates you deeply, and connects you meaningfully</span>.
          </p>

          <p>
            Built to evolve into a full creative platform — a learning hub, a creator ecosystem, and eventually a SaaS.
            But right now: sound, stories, and curiosity first.
          </p>
        </div>
      </section>

      {/* Latest Drop Preview Section */}
      <section className="space-y-8 md:space-y-10 pt-12 md:pt-16 border-t border-border-light dark:border-border-dark">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Explore Our Latest Drop</h2>
          <Link
            href={`/releases/${dropSlug}`}
            className="inline-flex text-accent font-bold items-center gap-2 hover:opacity-80 transition-opacity w-fit"
          >
            View Release <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative group rounded-3xl overflow-hidden bg-gray-50 dark:bg-[#111111] border border-border-light dark:border-border-dark p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
          <div className="relative w-full max-w-[300px] md:max-w-none md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-2xl shrink-0 mx-auto">
            <Image
              src={dropCoverSrc}
              alt={dropTitle}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </div>

          <div className="space-y-5 flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Latest Release</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{dropTitle}</h3>
            <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
              {dropThesis}
            </p>
            <Link
              href={`/releases/${dropSlug}`}
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
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">Sound · Stories · Knowledge</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest text-center md:text-right">
            © {currentYear} UPNAAD Platform <br className="md:hidden" />
            <span className="hidden md:inline"> • </span>All Rights Reserved
          </p>
        </div>
      </footer>
      </div>
    </PageShell>
  );
}
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, BookOpen, Mic2, Flame, Brain, Music } from 'lucide-react';
import { motion } from 'motion/react';
import SocialIcons from '@/src/components/SocialIcons';
import { urlForImage } from '@/src/sanity/lib/image';

interface HomeClientProps {
  homeData: any;
  latestDrop: any;
  latestBlogs?: any[];
  services?: any[];
}

const FEATURED_TOPICS = [
  {
    title: "Digital Solitude",
    description: "The paradox of feeling lonely while being hyper-connected.",
    status: "Trending",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "AI Creativity",
    description: "Who owns the soul of a song if an algorithm helped write it?",
    status: "Under Research",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Modern Materialism",
    description: "Bridging 21st-century consumerism and traditional values.",
    status: "Song Released",
    icon: Music,
    color: "text-green-500",
    bg: "bg-green-500/10"
  }
];

export default function HomeClient({ homeData, latestDrop, latestBlogs = [], services = [] }: HomeClientProps) {
  // ... (existing code unchanged until services section)
  // Fallbacks if data isn't provided through Sanity yet
  const title = homeData?.title || "UPNAAD";
  const subtitle = homeData?.subtitle || "Meaning in every note. Sound with Substance.";
  const exploreButtonText = homeData?.exploreButtonText || "Explore Behind the Song";
  const exploreButtonLink = homeData?.exploreButtonLink || "/new-releases";
  
  // Use sanity image builder, fallback to standard logo
  const logoSrc = homeData?.logo ? urlForImage(homeData.logo).url() : "/logo.png";
  
  // Latest drop fallbacks
  const dropTitle = latestDrop?.title || "No release yet";
  const dropThesis = latestDrop?.thesis || "Check back soon for our latest drops.";
  const dropSlug = latestDrop?.slug?.current || "coming-soon";
  const dropCoverSrc = latestDrop?.coverImage 
    ? urlForImage(latestDrop.coverImage).url() 
    : (latestDrop?.coverImageUrlFallback || "https://picsum.photos/seed/placeholder/1200/600");

  return (
    <div className="py-12 space-y-32">
      {/* Hero Section */}
      <section className="relative pt-0 md:pt-4">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 -mt-6">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-24 h-24 md:w-40 md:h-40 shrink-0"
            >
              <Image
                src={logoSrc}
                alt={`${title} Logo`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
                crossOrigin="anonymous"
              />
            </motion.div>
            <h1 className="text-7xl md:text-[120px] font-bold tracking-tighter leading-[0.8] text-text-light dark:text-text-dark drop-shadow-sm">
              {title}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-4">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-5xl text-text-secondary font-light leading-[1.1] max-w-2xl tracking-tight" 
              dangerouslySetInnerHTML={{ __html: subtitle.replace(/\n/g, "<br />") }} 
            />
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="pb-4"
            >
              <SocialIcons />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-6 mt-16"
        >
          <Link
            href={latestDrop ? `/releases/${dropSlug}` : "#"}
            className="bg-accent text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-premium"
          >
            Stream Latest Drop <ArrowRight size={20} />
          </Link>
          <Link
            href={exploreButtonLink}
            className="border border-border-light dark:border-border-dark px-10 py-5 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
          >
            {exploreButtonText}
          </Link>
        </motion.div>
      </section>

      {/* Latest Drop Preview */}
      <section className="relative group">
        <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 rounded-[4rem] -z-10 transition-all duration-700 group-hover:scale-[1.02] group-hover:bg-accent/10"></div>
        <div className="grid lg:grid-cols-2 gap-16 items-center p-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <Image
              src={dropCoverSrc}
              alt={dropTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.div>
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Latest Research</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-text-light dark:text-text-dark">{dropTitle}</h2>
              <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed tracking-tight">
                {dropThesis}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              {[
                { label: "Listen Music", icon: Play, href: "/music" },
                { label: "Research", icon: BookOpen, href: latestDrop ? `/releases/${dropSlug}` : "#" },
                { label: "Podcast", icon: Mic2, href: "/podcast" }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex flex-col gap-5 p-6 bg-white/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-3xl hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group/card backdrop-blur-md relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover/card:bg-accent/10 transition-colors"></div>
                  <item.icon size={22} strokeWidth={2.5} className="text-accent relative z-10" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-text-light dark:text-text-dark relative z-10 leading-none">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meaning */}
      {latestDrop && (
        <section className="pt-10 border-t border-border-light dark:border-border-dark">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Deep Dive</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Meaning</h2>
            </div>
            <Link href={`/meaning/${dropSlug}`} className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
              Read Research <ArrowRight size={14} />
            </Link>
          </div>
          <div className="bg-slate-100/50 dark:bg-white/5 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10 hover:border-accent transition-colors duration-500 backdrop-blur-sm shadow-premium">
            <h3 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">{dropTitle}</h3>
            <p className="text-text-secondary leading-relaxed mb-6 font-medium border-l-4 border-accent pl-6 italic">{dropThesis}</p>
            <p className="text-sm font-semibold text-text-secondary">Explore the Sanskrit translation, deep interpretation, and scientific basis behind this sound.</p>
          </div>
        </section>
      )}

      {/* Community Topics Section */}
      <section className="pt-10 border-t border-border-light dark:border-border-dark">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">The Awareness Engine</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">🔥 Community Topics</h2>
          </div>
          <Link href="/topics" className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
            Explore All Topics <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_TOPICS.map((topic, i) => (
            <Link 
              href="/topics" 
              key={i} 
              className="p-8 bg-white dark:bg-white/5 rounded-[2rem] border border-slate-200/60 dark:border-white/10 hover:border-accent transition-all duration-300 group shadow-premium backdrop-blur-sm"
            >
              <div className={`w-12 h-12 rounded-2xl ${topic.bg} ${topic.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <topic.icon size={24} />
              </div>
              <h3 className="text-xl font-extrabold mb-3 group-hover:text-accent transition-colors text-text-light dark:text-text-dark">{topic.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 font-medium line-clamp-3">{topic.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">{topic.status}</span>
                <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      {services.length > 0 && (
        <section className="pt-10 border-t border-border-light dark:border-border-dark">
           <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Monetization & Consulting</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Work With UPNAAD</h2>
            </div>
            <Link href="/services" className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((svc: any) => (
              <div key={svc._id} className="p-6 bg-white dark:bg-[#111111] rounded-2xl border border-border-light dark:border-border-dark hover:border-accent transition-all duration-300">
                 <h3 className="text-xl font-bold mb-3">{svc.title}</h3>
                 <p className="text-sm text-text-secondary line-clamp-3 mb-4">{svc.description}</p>
                 <span className="text-xs font-bold tracking-widest bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{svc.priceRange || 'Custom Quote'}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestBlogs.length > 0 && (
        <section className="pt-10 border-t border-border-light dark:border-border-dark">
           <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">Awareness Content</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Latest Articles</h2>
            </div>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
              View Blog <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestBlogs.slice(0, 3).map((blog: any) => (
              <Link href={`/blog/${blog.slug?.current || blog.slug}`} key={blog._id} className="group p-4 bg-gray-50 dark:bg-[#111111] rounded-2xl border border-border-light dark:border-border-dark hover:border-accent transition-all duration-300">
                 <div className="aspect-video relative rounded-xl overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800">
                    {blog.coverImage && (
                       <Image src={urlForImage(blog.coverImage).url()} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    )}
                 </div>
                 <h3 className="text-lg font-bold group-hover:text-accent transition-colors leading-tight mb-2">{blog.title}</h3>
                 <p className="text-xs text-text-secondary line-clamp-2">{blog.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-2 text-center md:text-left">
          <p className="font-bold tracking-tighter text-xl">{title}</p>
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">{subtitle.replace(/<[^>]+>/g, '')}</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
          <SocialIcons />
          <div className="space-y-1">
            <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} {title} Platform • All Rights Reserved
            </p>
            <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
              Built by <a href="https://prajwalshelar.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline transition-all">Prajwal Shelar</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

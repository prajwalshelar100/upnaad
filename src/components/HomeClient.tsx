"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, BookOpen, Mic2 } from 'lucide-react';
import { motion } from 'motion/react';
import SocialIcons from '@/src/components/SocialIcons';
import { urlForImage } from '@/src/sanity/lib/image';

interface HomeClientProps {
  homeData: any;
  latestDrop: any;
  latestBlogs?: any[];
  services?: any[];
}

export default function HomeClient({ homeData, latestDrop, latestBlogs = [], services = [] }: HomeClientProps) {
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
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="max-w-4xl pt-0 md:pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 -mt-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
              <Image
                src={logoSrc}
                alt={`${title} Logo`}
                fill
                className="object-contain"
                priority
                crossOrigin="anonymous"
              />
            </div>
            <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-[0.85] text-text-light dark:text-text-dark">
              {title}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-2xl md:text-4xl text-text-secondary font-light leading-tight max-w-xl" dangerouslySetInnerHTML={{ __html: subtitle.replace(/\n/g, "<br />") }} />
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
            href={latestDrop ? `/releases/${dropSlug}` : "#"}
            className="bg-text-light dark:bg-text-dark text-white dark:text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent/10"
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
        <div className="absolute -inset-4 bg-gray-50 dark:bg-[#111111] rounded-[3rem] -z-10 transition-colors duration-500 group-hover:bg-gray-100 dark:group-hover:bg-[#151515]"></div>
        <div className="grid lg:grid-cols-2 gap-16 items-center p-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={dropCoverSrc}
              alt={dropTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Latest Research</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{dropTitle}</h2>
              <p className="text-xl text-text-secondary font-light leading-relaxed">
                {dropThesis}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Link
                href="/music"
                className="flex flex-col gap-4 p-5 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl hover:border-accent transition-all group/card"
              >
                <Play size={20} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest">Listen Music</span>
              </Link>
              <Link
                href={latestDrop ? `/releases/${dropSlug}` : "#"}
                className="flex flex-col gap-4 p-5 bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl hover:border-accent transition-all group/card"
              >
                <BookOpen size={20} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Behind the Song Research</span>
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
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-border-light dark:border-border-dark hover:border-accent transition-colors duration-500">
            <h3 className="text-2xl font-bold mb-4">{dropTitle}</h3>
            <p className="text-text-secondary leading-relaxed mb-6 italic border-l-2 border-accent/20 pl-4">{dropThesis}</p>
            <p className="text-sm font-light">Explore the Sanskrit translation, deep interpretation, and scientific basis behind this sound.</p>
          </div>
        </section>
      )}

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
        <div className="flex flex-col items-center md:items-end gap-6">
          <SocialIcons />
          <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} {title} Platform • All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Play, BookOpen, Headphones,
  Lightbulb, Users, Mic2, Music2, Sparkles, Brain
} from 'lucide-react';
import { motion } from 'motion/react';
import { urlForImage } from '@/src/sanity/lib/image';

interface HomeClientProps {
  homeData: any;
  latestDrop: any;
  latestBlogs?: any[];
  services?: any[];
}

// ── Fade-in wrapper ───────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section Header ────────────────────────────────────
function SectionHeader({
  eyebrow, title, cta
}: { eyebrow: string; title: string; cta?: { label: string; href: string } }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-10">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mb-2">{eyebrow}</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {cta && (
        <Link href={cta.href} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent hover:underline shrink-0">
          {cta.label} <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

export default function HomeClient({ homeData, latestDrop, latestBlogs = [], services = [] }: HomeClientProps) {
  const title = homeData?.title || "UPNAAD";
  const logoSrc = homeData?.logo ? urlForImage(homeData.logo).url() : "/logo.png";
  const dropTitle = latestDrop?.title || "New sound coming soon";
  const dropThesis = latestDrop?.thesis || "Check back soon for our latest research drop.";
  const dropSlug = latestDrop?.slug?.current || "coming-soon";
  const dropCoverSrc = latestDrop?.coverImage
    ? urlForImage(latestDrop.coverImage).url()
    : (latestDrop?.coverImageUrlFallback || "/opengraph-image.png");

  return (
    <div className="space-y-28 py-8 md:py-12">

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center">
        {/* Ambient glow */}
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[60%] bg-accent/6 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[5%] w-[30%] h-[40%] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <FadeIn className="space-y-6">
          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
              <Image
                src={logoSrc}
                alt="UPNAAD Logo"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className="object-contain drop-shadow-xl"
                priority
                crossOrigin="anonymous"
              />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-text-secondary">{title}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl">
            Where stories,<br />
            <span className="text-accent">sound</span>, and<br />
            knowledge come alive.
          </h1>

          {/* Sub-text */}
          <p className="text-lg md:text-xl text-text-secondary font-light max-w-xl leading-relaxed">
            A creative ecosystem blending AI-generated music, original stories,
            and deep learning — built for curious minds.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/music"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-accent/30"
            >
              <Play size={16} /> Explore Sound
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 border border-border-light dark:border-border-dark px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              <BookOpen size={16} /> Read Stories
            </Link>
          </div>

          {/* Pill pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['AI Music', 'Original Stories', 'Deep Learning', 'Community Voices', 'Behind the Creation'].map(pill => (
              <span key={pill} className="px-3 py-1 rounded-full text-[11px] font-semibold border border-border-light dark:border-border-dark text-text-secondary">
                {pill}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ─── LATEST SOUND DROP ────────────────────────────── */}
      <FadeIn delay={0.1}>
        <section className="relative">
          <SectionHeader
            eyebrow="Latest Release"
            title="Sound Drop"
            cta={{ label: "All Releases", href: "/releases" }}
          />
          <div className="grid lg:grid-cols-5 gap-8 items-center bg-slate-100/60 dark:bg-white/3 border border-slate-200/80 dark:border-white/8 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
            {/* Cover */}
            <div className="lg:col-span-2 relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={dropCoverSrc}
                alt={dropTitle}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <Link
                  href={`/releases/${dropSlug}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full hover:scale-105 transition-transform"
                >
                  <Play size={13} /> Listen
                </Link>
                <Link
                  href={`/meaning/${dropSlug}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent/90 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full hover:scale-105 transition-transform"
                >
                  <Brain size={13} /> Meaning
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Latest Research Drop</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{dropTitle}</h3>
              <p className="text-text-secondary leading-relaxed text-base font-light">{dropThesis}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/releases/${dropSlug}`}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:underline">
                  Read Research <ArrowRight size={12} />
                </Link>
                <span className="text-text-secondary">·</span>
                <Link href="/podcast"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent">
                  <Mic2 size={12} /> Listen to Podcast
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── FEATURED STORIES ─────────────────────────────── */}
      <FadeIn delay={0.15}>
        <section>
          <SectionHeader
            eyebrow="Original Narratives"
            title="Featured Stories"
            cta={{ label: "All Stories", href: "/stories" }}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🌙",
                title: "The Silence Between Notes",
                excerpt: "What happens when you stop listening for the music and start listening for the gaps?",
                tag: "Philosophy",
                color: "from-indigo-500/10 to-purple-500/5"
              },
              {
                emoji: "🔥",
                title: "Digital Solitude",
                excerpt: "The paradox of feeling lonely in a world that has never been more connected.",
                tag: "Culture",
                color: "from-orange-500/10 to-red-500/5"
              },
              {
                emoji: "🧬",
                title: "When AI Wrote My Song",
                excerpt: "I fed it my diary. It made something I couldn't. Here's what that felt like.",
                tag: "Technology",
                color: "from-teal-500/10 to-cyan-500/5"
              }
            ].map(story => (
              <Link key={story.title} href="/stories"
                className={`group p-6 rounded-2xl border border-slate-200/60 dark:border-white/8 bg-gradient-to-br ${story.color} hover:border-accent transition-all duration-300 space-y-4`}>
                <div className="text-3xl">{story.emoji}</div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{story.tag}</span>
                <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors leading-snug">{story.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{story.excerpt}</p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More <ArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/stories/submit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent transition-colors border border-dashed border-border-light dark:border-border-dark hover:border-accent px-6 py-3 rounded-full">
              ✍️ Submit Your Story
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ─── LEARN SOMETHING NEW ─────────────────────────── */}
      <FadeIn delay={0.2}>
        <section>
          <SectionHeader
            eyebrow="Knowledge Through Sound & Story"
            title="Learn Something New"
            cta={{ label: "All Articles", href: "/blog" }}
          />
          {latestBlogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestBlogs.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current || post.slug}`}
                  className="group flex flex-col p-5 bg-white dark:bg-white/4 rounded-2xl border border-slate-200/60 dark:border-white/8 hover:border-accent transition-all duration-300 shadow-sm"
                >
                  {post.coverImage && (
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={urlForImage(post.coverImage).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex gap-2 mb-2">
                    {(post.categories || []).map((cat: string) => (
                      <span key={cat} className="text-[10px] font-bold uppercase tracking-widest text-accent">{cat}</span>
                    ))}
                  </div>
                  <h3 className="font-bold leading-snug group-hover:text-accent transition-colors mb-2">{post.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            /* Placeholder when no articles yet */
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Music2, title: "Why Music Heals the Brain", tag: "Neuroscience", color: "text-green-500 bg-green-500/10" },
                { icon: Lightbulb, title: "Learning Faster with Sound", tag: "Cognitive Science", color: "text-yellow-500 bg-yellow-500/10" },
                { icon: Brain, title: "Sanskrit & Modern Physics", tag: "Philosophy", color: "text-purple-500 bg-purple-500/10" }
              ].map(item => (
                <Link key={item.title} href="/blog"
                  className="group p-6 bg-white dark:bg-white/4 rounded-2xl border border-slate-200/60 dark:border-white/8 hover:border-accent transition-all duration-300 space-y-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{item.tag}</span>
                  <h3 className="font-bold tracking-tight group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-xs text-text-secondary">Coming soon — subscribe to get notified first.</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </FadeIn>

      {/* ─── BEHIND THE CREATION ─────────────────────────── */}
      <FadeIn delay={0.25}>
        <section className="bg-slate-100/50 dark:bg-white/3 rounded-3xl border border-slate-200/80 dark:border-white/8 p-8 md:p-12">
          <SectionHeader
            eyebrow="Process & Meaning"
            title="Behind the Creation"
            cta={{ label: "Explore All", href: "/releases" }}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Headphones size={20} />
              </div>
              <h3 className="text-lg font-bold">Sound Breakdowns</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every song has a story. We break down the research, Sanskrit roots, neuroscience,
                and compositional choices behind each track — turning music into a learning experience.
              </p>
              <Link href="/releases" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent hover:underline">
                Read Song Research <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-bold">Story Origins</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Where did the idea come from? What changed in the writing process?
                Behind every story on UPNAAD is a journey worth knowing.
              </p>
              <Link href="/stories" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent hover:underline">
                Explore Stories <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Featured drop from Sanity */}
          {latestDrop && (
            <div className="mt-10 pt-8 border-t border-border-light dark:border-border-dark">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <Image
                    src={dropCoverSrc}
                    alt={dropTitle}
                    fill
                    sizes="64px"
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">Currently Featured</p>
                  <h4 className="font-bold truncate">{dropTitle}</h4>
                  <p className="text-xs text-text-secondary line-clamp-1 mt-1">{dropThesis}</p>
                </div>
                <Link href={`/meaning/${dropSlug}`}
                  className="shrink-0 flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                  Read <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}
        </section>
      </FadeIn>

      {/* ─── COMMUNITY VOICES ─────────────────────────────── */}
      <FadeIn delay={0.3}>
        <section>
          <SectionHeader
            eyebrow="The Awareness Engine"
            title="Community Voices"
            cta={{ label: "All Topics", href: "/topics" }}
          />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-text-secondary leading-relaxed">
                UPNAAD is powered by curiosity. Explore what the community is researching,
                discussing, and creating — or add your voice to the conversation.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Submit a Research Topic", href: "/submit-topic", icon: Brain },
                  { label: "Share Your Story", href: "/stories/submit", icon: BookOpen },
                  { label: "Collaborate With Us", href: "/collaborate", icon: Users }
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="group flex items-center gap-3 p-4 bg-white dark:bg-white/4 rounded-xl border border-slate-200/60 dark:border-white/8 hover:border-accent transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={15} />
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                    <ArrowRight size={13} className="ml-auto text-text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Topic bubbles */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Trending Topics</p>
              {[
                { title: "Digital Solitude", desc: "Loneliness in a hyper-connected world", tag: "🔥 Trending" },
                { title: "AI Creativity", desc: "Who owns the soul of an AI-written song?", tag: "🧪 Under Research" },
                { title: "Sound & Consciousness", desc: "How frequencies affect the mind", tag: "🎵 Song Released" }
              ].map(topic => (
                <Link key={topic.title} href="/topics"
                  className="group flex items-center justify-between p-4 bg-white dark:bg-white/4 rounded-xl border border-slate-200/60 dark:border-white/8 hover:border-accent transition-all duration-200">
                  <div>
                    <p className="text-sm font-bold">{topic.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{topic.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-text-secondary shrink-0 ml-4">{topic.tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ─── SERVICES / WORK WITH US ─────────────────────── */}
      {services.length > 0 && (
        <FadeIn delay={0.35}>
          <section className="border border-accent/20 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-accent/5 to-purple-500/5">
            <SectionHeader
              eyebrow="Work With UPNAAD"
              title="Services"
              cta={{ label: "View All", href: "/services" }}
            />
            <div className="grid md:grid-cols-3 gap-5">
              {services.slice(0, 3).map((svc: any) => (
                <div key={svc._id} className="p-5 bg-white/50 dark:bg-white/5 rounded-2xl border border-border-light dark:border-border-dark">
                  <h3 className="font-bold mb-2">{svc.title}</h3>
                  <p className="text-xs text-text-secondary line-clamp-3 mb-3">{svc.description}</p>
                  <span className="text-[10px] font-bold tracking-widest bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {svc.priceRange || 'Custom Quote'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* ─── ABOUT ───────────────────────────────────────── */}
      <FadeIn delay={0.4}>
        <section className="text-center space-y-6 py-8">
          <div className="w-12 h-12 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <Sparkles size={22} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About UPNAAD</h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-base font-light">
            UPNAAD — <span className="font-semibold text-text-light dark:text-text-dark">"resonance"</span> in Sanskrit — is a living digital
            ecosystem where sound, stories, and knowledge intersect. It's not a streaming platform.
            It's a thinking space. Built to engage emotionally, educate deeply, and connect
            meaningfully.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-light dark:border-border-dark text-sm font-bold hover:border-accent hover:text-accent transition-all">
              Our Mission
            </Link>
            <Link href="/collaborate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-accent/30">
              Work With Us
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* ─── FOOTER ──────────────────────────────────────── */}
      <footer className="pt-12 pb-4 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <Image src="/logo.png" alt="UPNAAD" fill sizes="28px" className="object-contain" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-tight">{title}</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Sound · Stories · Knowledge</p>
          </div>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p className="text-[10px] text-text-secondary font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} UPNAAD • All Rights Reserved
          </p>
          <p className="text-[10px] text-text-secondary font-mono">
            Built by{' '}
            <a href="https://prajwalshelar.com" target="_blank" rel="noopener noreferrer"
              className="text-accent hover:underline">Prajwal Shelar</a>
          </p>
        </div>
      </footer>

    </div>
  );
}

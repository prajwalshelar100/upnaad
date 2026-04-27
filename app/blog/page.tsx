import { client } from '@/src/sanity/lib/client';
import { allBlogsQuery } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';
import PageShell from '@/src/components/PageShell';
import { urlForImage } from '@/src/sanity/lib/image';

export const revalidate = 60;

export default async function BlogPage() {
  const allBlogs = await client.fetch(allBlogsQuery) || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Learn' }]}>
      <PageHeader
        eyebrow="LEARN · ARTICLES"
        title="Learn"
        description="Complex topics explained through stories, songs, and research. Science, tech, philosophy, and the human experience."
        className="mb-0"
      />

      {allBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((post: any) => {
            const coverSrc = post.coverImage ? urlForImage(post.coverImage).url() : "/opengraph-image.png";
            return (
              <Link 
                href={`/blog/${post.slug?.current || post.slug}`} 
                key={post._id} 
                className="group flex flex-col h-full bg-white dark:bg-white/5 border border-border-light dark:border-border-dark rounded-[2.5rem] overflow-hidden shadow-premium"
              >
                <div className="relative aspect-video">
                  <Image
                    src={coverSrc}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow gap-6">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex gap-2">
                      {(post.categories || []).map((cat: string) => (
                        <span key={cat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{cat}</span>
                      ))}
                    </div>
                    {post.date && <span className="text-[10px] font-mono text-text-secondary/50">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">{post.title}</h3>
                  <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                     Read Full Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* ── Empty state — shows while Sanity is not connected ── */
        <div className="space-y-8">
          <p className="text-sm text-text-secondary">
            Articles are coming soon. Connect your Sanity project to publish content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🎵", tag: "Neuroscience", title: "Why Music Heals the Brain", desc: "The science of how sound affects mood, memory, and cognition." },
              { emoji: "💡", tag: "Cognitive Science", title: "Learning Faster with Sound", desc: "Using music as an encoding tool for complex information." },
              { emoji: "🧬", tag: "Philosophy", title: "Sanskrit & Modern Physics", desc: "The surprising overlap between ancient sound theory and quantum mechanics." },
              { emoji: "🌐", tag: "Technology", title: "When AI Wrote My Song", desc: "What happens when you give an AI your diary and ask it to compose." },
              { emoji: "🔥", tag: "Society", title: "Digital Solitude", desc: "Loneliness in a hyper-connected world — and what music teaches us about it." },
              { emoji: "🎧", tag: "Wellness", title: "The 40Hz Frequency Experiment", desc: "MIT researchers found that specific sound frequencies may reduce Alzheimer's symptoms." },
            ].map(item => (
              <div key={item.title} className="p-6 bg-white dark:bg-white/4 rounded-2xl border border-dashed border-border-light dark:border-border-dark space-y-3 opacity-60">
                <div className="text-2xl">{item.emoji}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{item.tag}</span>
                <h3 className="font-bold leading-snug">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

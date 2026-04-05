import { client } from '@/src/sanity/lib/client';
import { allBlogsQuery } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';

export const revalidate = 60;

export default async function BlogPage() {
  const allBlogs = await client.fetch(allBlogsQuery) || [];

  return (
    <div className="py-12 space-y-16">
      <PageHeader
        title="Awareness & Research"
        description="Deep dives into the intersection of sound, consciousness, and technology."
        className="mb-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBlogs.map((post: any) => {
          const coverSrc = post.coverImage ? urlForImage(post.coverImage).url() : "https://picsum.photos/seed/placeholder/800/600";
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
                      <span key={cat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                        {cat}
                      </span>
                    ))}
                  </div>
                  {post.date && <span className="text-[10px] font-mono text-text-secondary/50">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                </div>
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                   Read Full Article <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

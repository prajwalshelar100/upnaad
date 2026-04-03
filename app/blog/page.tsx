import { client } from '@/src/sanity/lib/client';
import { allBlogsQuery } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';

export const revalidate = 60;

export default async function BlogPage() {
  const allBlogs = await client.fetch(allBlogsQuery) || [];

  return (
    <div className="space-y-12">
      <PageHeader
        title="Awareness & Research"
        description="Deep dives into the intersection of sound, consciousness, and technology."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBlogs.map((post: any) => {
          const coverSrc = post.coverImage ? urlForImage(post.coverImage).url() : "https://picsum.photos/seed/placeholder/800/600";
          return (
            <Link href={`/blog/${post.slug?.current || post.slug}`} key={post._id} className="group flex flex-col h-full bg-gray-50 dark:bg-[#111111] border border-border-light dark:border-border-dark rounded-3xl overflow-hidden hover:border-accent transition-all duration-500">
              <div className="relative aspect-video">
                <Image
                  src={coverSrc}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {(post.categories || []).map((cat: string) => (
                    <span key={cat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      {cat}
                    </span>
                  ))}
                  {post.date && <span className="text-[10px] font-mono text-text-secondary ml-auto">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-text-secondary line-clamp-3 text-sm font-light mt-auto">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

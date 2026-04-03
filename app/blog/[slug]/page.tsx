import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Script from 'next/script';
import { client } from '@/src/sanity/lib/client';
import { allBlogsQuery, blogBySlugQuery } from '@/src/sanity/lib/queries';
import { urlForImage } from '@/src/sanity/lib/image';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(blogBySlugQuery, { slug });
  if (!post) return { title: 'Not Found' };

  const coverSrc = post.coverImage ? urlForImage(post.coverImage).url() : "https://picsum.photos/seed/placeholder/1200/600";

  return {
    title: `${post.title} | UPNAAD Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [coverSrc],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(blogBySlugQuery, { slug });
  if (!post) notFound();

  const coverSrc = post.coverImage ? urlForImage(post.coverImage).url() : "https://picsum.photos/seed/placeholder/1200/600";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": coverSrc,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "UPNAAD"
    }
  };

  return (
    <article className="max-w-[800px] mx-auto px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          {(post.categories || []).map((cat: string) => (
            <span key={cat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
              {cat}
            </span>
          ))}
          {post.date && <span className="text-[10px] font-mono text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-text-light dark:text-text-dark">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto italic">
            {post.excerpt}
          </p>
        )}
      </header>

      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl group">
        <Image
          src={coverSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          crossOrigin="anonymous"
        />
      </div>

      <div className="markdown-body mb-32 selection:bg-accent/30 prose dark:prose-invert max-w-none">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch(allBlogsQuery);
  return (posts || []).map((post: any) => ({
    slug: post.slug?.current || post.slug,
  }));
}

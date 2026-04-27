import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import Script from 'next/script';
import { ChevronRight, Home, Calendar, Clock } from 'lucide-react';
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
    <article className="max-w-[860px] mx-auto px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Breadcrumb ─────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-accent transition-colors">
              <Home size={11} /> Home
            </Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight size={10} className="text-text-secondary/40" />
            <Link href="/blog" className="text-[11px] font-semibold text-text-secondary hover:text-accent transition-colors">Learn</Link>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight size={10} className="text-text-secondary/40" />
            <span className="text-[11px] font-bold text-accent line-clamp-1 max-w-[200px]">{post.title}</span>
          </li>
        </ol>
      </nav>

      {/* ── Article Header ─────────────────────────── */}
      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          {(post.categories || []).map((cat: string) => (
            <span key={cat} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
              {cat}
            </span>
          ))}
          {post.date && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-text-secondary/60">
              <Calendar size={10} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-text-primary dark:text-text-primary">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-lg text-text-secondary font-light max-w-2xl leading-relaxed border-l-2 border-accent/40 pl-4 italic">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* ── Cover Image ────────────────────────────── */}
      <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-12 shadow-xl group">
        <Image
          src={coverSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 860px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          crossOrigin="anonymous"
        />
      </div>

      {/* ── Article Body ───────────────────────────── */}
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

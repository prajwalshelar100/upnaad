import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { ScrollText, Sparkles, Brain, BookOpen } from 'lucide-react';
import MediaEmbed from '@/src/components/MediaEmbed';
import ListenButton from '@/src/components/ListenButton';
import Script from 'next/script';
import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery, releaseBySlugQuery } from '@/src/sanity/lib/queries';
import { urlForImage } from '@/src/sanity/lib/image';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const drop = await client.fetch(releaseBySlugQuery, { slug });
  if (!drop) return { title: 'Not Found' };

  const coverSrc = drop.coverImage ? urlForImage(drop.coverImage).url() : (drop.coverImageUrlFallback || "https://picsum.photos/seed/placeholder/1200/600");

  return {
    title: `${drop.title} | Meaning & Research | UPNAAD`,
    description: drop.simpleMeaning || drop.thesis,
    openGraph: {
      title: `${drop.title} - Behind the Song`,
      description: drop.simpleMeaning || drop.thesis,
      images: [coverSrc],
    },
  };
}

export default async function MeaningPage({ params }: Props) {
  const { slug } = await params;
  const drop = await client.fetch(releaseBySlugQuery, { slug });
  if (!drop) notFound();

  const coverSrc = drop.coverImage ? urlForImage(drop.coverImage).url() : (drop.coverImageUrlFallback || "https://picsum.photos/seed/placeholder/1200/600");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": drop.title,
    "description": drop.simpleMeaning || drop.thesis,
    "image": coverSrc,
    "datePublished": drop.date,
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
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
            Meaning & Research
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-text-primary dark:text-text-primary">
          {drop.title}
        </h1>
        <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
          {drop.thesis}
        </p>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl group">
        <Image
          src={coverSrc}
          alt={drop.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex gap-4">
            {drop.spotifyUrl && (
              <a href={drop.spotifyUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {/* Sanskrit & Transliteration Section */}
        {(drop.sanskritText || drop.transliteration) && (
          <section className="bg-gray-50 dark:bg-[#111111] p-8 md:p-12 rounded-[2rem] border border-border-light dark:border-border-dark text-center">
            <ScrollText size={32} className="mx-auto text-accent mb-6 opacity-80" />
            
            {drop.sanskritText && (
              <div className="mb-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Original Sanskrit</h3>
                <p className="text-2xl md:text-4xl font-serif leading-loose text-text-primary dark:text-text-primary">
                  {drop.sanskritText}
                </p>
              </div>
            )}

            {drop.transliteration && (
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Phonetic Transliteration</h3>
                <p className="text-lg md:text-xl font-light italic text-text-secondary">
                  {drop.transliteration}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Meaning Section */}
        {(drop.simpleMeaning || drop.deepInterpretation) && (
          <section className="grid md:grid-cols-2 gap-8">
            {drop.simpleMeaning && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <BookOpen size={14} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Simple Meaning</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {drop.simpleMeaning}
                </p>
              </div>
            )}
            
            {drop.deepInterpretation && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Sparkles size={14} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Deep Interpretation</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {drop.deepInterpretation}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Existing Markdown Content */}
        {drop.content && (
          <section className="markdown-body pt-8 border-t border-border-light dark:border-border-dark selection:bg-accent/30">
            <Markdown>{drop.content}</Markdown>
          </section>
        )}

        {/* Philosophical / Scientific / Relevance Section */}
        {(drop.philosophicalExplanation || drop.whyItMatters) && (
          <section className="space-y-12 pt-12 border-t border-border-light dark:border-border-dark">
            {drop.philosophicalExplanation && (
              <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="text-accent" size={24} />
                  <h2 className="text-2xl font-bold tracking-tight">Scientific & Philosophical View</h2>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed font-light">
                  {drop.philosophicalExplanation}
                </p>
              </div>
            )}

            {drop.whyItMatters && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Why It Matters Today</h2>
                <p className="text-text-secondary leading-relaxed pl-6 border-l-2 border-accent/30 italic">
                  {drop.whyItMatters}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Related Songs Component Fallback... Could integrate relatedReleases here */}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const drops = await client.fetch(allReleasesQuery);
  return (drops || []).map((drop: any) => ({
    slug: drop.slug?.current || drop.slug,
  }));
}

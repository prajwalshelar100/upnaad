import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { Mic2, Music as MusicIcon } from 'lucide-react';
import { newReleases } from '@/src/data/new-releases';
import MediaEmbed from '@/src/components/MediaEmbed';
import ListenButton from '@/src/components/ListenButton';
import Script from 'next/script';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const drop = newReleases.find(d => d.slug === slug);
  if (!drop) return { title: 'Not Found' };

  return {
    title: `${drop.title} | UPNAAD`,
    description: drop.thesis,
    openGraph: {
      title: drop.title,
      description: drop.thesis,
      images: [drop.coverImage],
    },
  };
}

export default async function NewReleasePage({ params }: Props) {
  const { slug } = await params;
  const drop = newReleases.find(d => d.slug === slug);
  if (!drop) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": drop.title,
    "description": drop.thesis,
    "image": drop.coverImage,
    "datePublished": drop.date,
    "author": {
      "@type": "Organization",
      "name": "UPNAAD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UPNAAD",
      "logo": {
        "@type": "ImageObject",
        "url": "https://upnaad.com/logo.png"
      }
    }
  };

  return (
    <article className="max-w-[720px] mx-auto px-1 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          {drop.topics.map(topic => (
            <span key={topic} className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
              {topic}
            </span>
          ))}
          <span className="text-[10px] font-mono text-text-secondary ml-auto">{drop.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-text-light dark:text-text-dark">
          {drop.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-10 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs">UP</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">UPNAAD New Release</p>
              <p className="text-[10px] text-text-secondary">Explore • Listen • Learn</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            {drop.podcastUrl && (
              <ListenButton
                label="Play Podcast"
                playingLabel="Playing Podcast..."
                icon={<Mic2 size={16} className="text-white dark:text-black" />}
                track={{
                  id: drop.slug + "-podcast",
                  title: drop.title + " (Podcast)",
                  artist: "Upnaad Podcast",
                  // Using a placeholder audio file for podcast demo
                  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                  coverImage: drop.coverImage,
                  youtubeUrl: drop.podcastUrl,
                  podcastUrl: drop.podcastUrl
                }}
              />
            )}
            <ListenButton
              label="Play Music"
              playingLabel="Playing Music..."
              icon={<MusicIcon size={16} className="text-white dark:text-black" />}
              track={{
                id: drop.slug + "-audio",
                title: drop.title,
                artist: "Upnaad Sound",
                url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                coverImage: drop.coverImage,
                spotifyUrl: drop.spotifyUrl,
                youtubeUrl: drop.youtubeUrl,
                podcastUrl: drop.podcastUrl,
                lyrics: drop.lyrics
              }}
            />
          </div>
        </div>
        <p className="text-2xl text-text-secondary font-light leading-relaxed italic border-l-2 border-accent/20 pl-8">
          {drop.thesis}
        </p>
      </header>

      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-2xl group">
        <Image
          src={drop.coverImage}
          alt={drop.title}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="markdown-body mb-32 selection:bg-accent/30">
        <Markdown>{drop.content}</Markdown>
      </div>

      <section className="space-y-24 pt-20 border-t border-border-light dark:border-border-dark">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
              <Mic2 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">The Podcast Discussion</h2>
              <p className="text-sm text-text-secondary">Deep dive into the research methodology and implications.</p>
            </div>
          </div>
          <MediaEmbed type="youtube" url={drop.youtubeUrl} />
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
              <MusicIcon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">The Music Track</h2>
              <p className="text-sm text-text-secondary">Sonic translation of the rhythmic data points.</p>
            </div>
          </div>
          <MediaEmbed type="spotify" url={drop.spotifyUrl} />
        </div>

        <div className="bg-gray-50 dark:bg-[#111111] p-10 md:p-16 rounded-[2rem] border border-border-light dark:border-border-dark relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">From Research to Sound</h2>
          <p className="text-lg text-text-secondary leading-relaxed relative z-10 font-light">
            This track was composed by translating the rhythmic data points from the neurological study into MIDI sequences. The harmonic progression mirrors the emotional arc of the participants' narratives, creating a sonic representation of the research findings.
          </p>
          <div className="mt-10 flex items-center gap-4 relative z-10">
            <button className="text-xs font-bold uppercase tracking-widest text-accent hover:underline">View Methodology</button>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <button className="text-xs font-bold uppercase tracking-widest text-accent hover:underline">Download Score</button>
          </div>
        </div>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  return newReleases.map((drop) => ({
    slug: drop.slug,
  }));
}

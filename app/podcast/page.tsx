import { client } from '@/src/sanity/lib/client';
import { allPodcastQuery } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'Conversations with researchers, artists, and thinkers exploring the substance of sound.',
};

const PLACEHOLDER_EPISODES = [
  { title: 'Ep. 1 — The Sound of Consciousness', date: 'Coming soon', desc: 'A conversation on how sound shapes human awareness and identity.' },
  { title: 'Ep. 2 — AI as the New Composer', date: 'Coming soon', desc: 'What happens when machines writes music? And do they have intent?' },
  { title: 'Ep. 3 — Learning with Your Ears', date: 'Coming soon', desc: 'Education through music — why it works and why we stopped doing it.' },
];

export default async function PodcastPage() {
  const podcasts = await client.fetch(allPodcastQuery);
  const allPodcasts = podcasts || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Sound', href: '/music' }, { label: 'Podcast' }]}>
      <PageHeader
        eyebrow="SOUND · CONVERSATIONS"
        title="Podcast"
        description="Long-form conversations with researchers, artists, and thinkers. Deep dives into sound, consciousness, technology, and the human experience."
      />

      {allPodcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPodcasts.map((episode: any) => {
            const thumbnailSrc = episode.thumbnail
              ? urlForImage(episode.thumbnail).url()
              : episode.thumbnailUrlFallback || '/opengraph-image.png';
            return (
              <a
                href={episode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={episode._id}
                className="group cursor-pointer flex flex-col bg-white dark:bg-white/5 border border-border-light dark:border-border-dark rounded-2xl overflow-hidden hover:border-accent/40 transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={thumbnailSrc}
                    alt={episode.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3 flex flex-col flex-1">
                  <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">{episode.title}</h3>
                  {episode.date && <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">{episode.date}</p>}
                  <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-3">{episode.description}</p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Watch Episode <ArrowRight size={14} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">🎙️ Coming Soon</span>
            <p className="text-sm text-text-secondary">First episodes coming soon. Subscribe to get notified.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLACEHOLDER_EPISODES.map((ep) => (
              <div key={ep.title} className="p-7 rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-white dark:bg-white/3 space-y-3 opacity-60">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl">🎙️</div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{ep.date}</p>
                <h3 className="font-bold leading-snug">{ep.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

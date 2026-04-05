import { client } from '@/src/sanity/lib/client';
import { allPodcastQuery } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import { Play, ArrowRight } from 'lucide-react';
import PageHeader from '@/src/components/PageHeader';
import { urlForImage } from '@/src/sanity/lib/image';

export const revalidate = 60; // revalidate every 60 seconds

export default async function PodcastPage() {
  const podcasts = await client.fetch(allPodcastQuery);

  return (
    <div className="py-12 space-y-16">
      <PageHeader
        title="Podcast"
        description="Conversations with researchers, artists, and thinkers exploring the substance of sound."
        className="mb-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(podcasts || []).map((episode: any) => {
          const thumbnailSrc = episode.thumbnail ? urlForImage(episode.thumbnail).url() : (episode.thumbnailUrlFallback || "https://picsum.photos/seed/placeholder/800/600");
          return (
            <a 
              href={episode.youtubeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={episode._id} 
              className="group cursor-pointer flex flex-col bg-white dark:bg-white/5 border border-border-light dark:border-border-dark rounded-[2.5rem] overflow-hidden shadow-premium"
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
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Play fill="currentColor" size={32} />
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4 flex flex-col flex-1">
                <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">
                  {episode.title}
                </h3>
                {episode.date && <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">{episode.date}</p>}
                <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-3">
                  {episode.description}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                   Watch Episode <ArrowRight size={14} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}


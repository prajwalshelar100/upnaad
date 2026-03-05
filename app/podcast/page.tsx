import { podcastEpisodes } from '@/src/data/podcast';
import Image from 'next/image';
import { Play } from 'lucide-react';
import PageHeader from '@/src/components/PageHeader';

export default function PodcastPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Podcast"
        description="Conversations with researchers, artists, and thinkers exploring the substance of sound."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {podcastEpisodes.map(episode => (
          <div key={episode.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={32} />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{episode.title}</h3>
            <p className="text-text-secondary text-sm mb-2">{episode.date}</p>
            <p className="text-text-secondary line-clamp-2">{episode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

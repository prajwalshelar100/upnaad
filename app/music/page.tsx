import { musicTracks } from '@/src/data/music';
import Image from 'next/image';
import MediaEmbed from '@/src/components/MediaEmbed';
import PageHeader from '@/src/components/PageHeader';

export default function MusicPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Music"
        description="Sonic translations of our research studies. Sound with substance."
      />

      <div className="space-y-16">
        {musicTracks.map(track => (
          <div key={track.id} className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={track.artwork}
                alt={track.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">{track.title}</h3>
                <p className="text-text-secondary">{track.date}</p>
              </div>
              <p className="text-lg text-text-secondary leading-relaxed">
                {track.description}
              </p>
              <MediaEmbed type="spotify" url={track.spotifyUrl} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

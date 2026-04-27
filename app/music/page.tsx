import { client } from '@/src/sanity/lib/client';
import { allMusicQuery } from '@/src/sanity/lib/queries';
import MusicClient from '@/src/components/MusicClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Music & Drops',
  description: 'AI-generated songs, educational music, and language-of-sound compositions.',
};

const PLACEHOLDER_TRACKS = [
  { title: 'The Rhythm of Identity', genre: 'Ambient', desc: 'An exploration of self through layered sound frequencies and Indian classical motifs.' },
  { title: 'Learning Chemistry in C Major', genre: 'Educational', desc: 'Periodic table elements set to music — memory meets melody.' },
  { title: 'White Noise for Deep Work', genre: 'LoFi / Focus', desc: 'Engineered for flow state. 40Hz gamma-boosted ambient layer.' },
  { title: 'Sanskrit & Silence', genre: 'Meditative', desc: 'Ancient Sanskrit phonemes woven into a modern ambient soundscape.' },
  { title: 'Code & Beats', genre: 'LoFi / Study', desc: 'Background music for programmers. Low distraction, high focus.' },
  { title: 'Monsoon Memory', genre: 'Emotional', desc: 'A piece inspired by the first rains — nostalgia reconstructed in sound.' },
];

export default async function MusicPage() {
  const allMusic = await client.fetch(allMusicQuery);
  const tracks = allMusic || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Sound', href: '/music' }, { label: 'Music & Drops' }]}>
      <PageHeader
        eyebrow="SOUND · AI MUSIC"
        title="Music & Drops"
        description="AI-generated songs, educational compositions, and sonic experiments. Stream, discover, and read what's behind each sound."
      />

      {tracks.length > 0 ? (
        <MusicClient initialTracks={tracks} />
      ) : (
        /* ── Empty state placeholder ── */
        <div className="space-y-8">
          <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">🎵 Coming Soon</span>
            <p className="text-sm text-text-secondary">
              Connect your Sanity project to publish music. Placeholder previews below.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_TRACKS.map((t) => (
              <div key={t.title} className="p-6 rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-white dark:bg-white/3 space-y-3 opacity-60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{t.genre}</span>
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs">▶</span>
                  </div>
                </div>
                <h3 className="font-bold leading-snug">{t.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{t.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

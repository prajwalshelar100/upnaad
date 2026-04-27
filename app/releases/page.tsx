import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery } from '@/src/sanity/lib/queries';
import ReleasesClient from '@/src/components/ReleasesClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Behind the Song',
  description: 'Deep-dives into the research, meaning, and process behind each UPNAAD composition.',
};

const PLACEHOLDER_RELEASES = [
  { title: 'The Science of 432Hz', tag: 'Frequency Research', desc: 'Does tuning to 432Hz actually change how music feels? We investigated the claims.' },
  { title: 'How We Made "Monsoon Memory"', tag: 'Behind the Song', desc: 'From concept to composition — the complete story behind our most emotional track.' },
  { title: 'Sanskrit Phonemes as Music Theory', tag: 'Linguistics', desc: 'Ancient sound systems mapped onto Western notation. What we discovered surprised us.' },
  { title: 'AI vs. Human Composer', tag: 'AI Music', desc: 'We had AI compose 10 pieces. Then had humans rate them blind. The results were unexpected.' },
];

export default async function ReleasesPage() {
  const allReleases = await client.fetch(allReleasesQuery);
  const releases = allReleases || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Sound', href: '/music' }, { label: 'Behind the Song' }]}>
      <PageHeader
        eyebrow="SOUND · RESEARCH"
        title="Behind the Song"
        description="Every composition has a story. Dive into the meaning, process, and research that shapes each UPNAAD creation."
      />

      {releases.length > 0 ? (
        <ReleasesClient initialReleases={releases} />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">📖 Coming Soon</span>
            <p className="text-sm text-text-secondary">Research breakdowns coming as we publish. Previews below.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLACEHOLDER_RELEASES.map((r) => (
              <div key={r.title} className="p-7 rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-white dark:bg-white/3 space-y-3 opacity-60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{r.tag}</span>
                <h3 className="text-xl font-bold leading-snug">{r.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{r.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

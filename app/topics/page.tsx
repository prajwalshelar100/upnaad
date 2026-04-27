import { client } from '@/src/sanity/lib/client';
import { allTopicsQuery } from '@/src/sanity/lib/queries';
import TopicsClient from '@/src/components/TopicsClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Community Topics',
  description: 'Vote on, submit, and discuss topics that shape what UPNAAD creates next.',
};

const PLACEHOLDER_TOPICS = [
  { emoji: '🎵', title: 'Make a song explaining Quantum Entanglement', votes: 142, tag: 'Science' },
  { emoji: '🧠', title: 'LoFi beats for studying Indian history', votes: 98, tag: 'Education' },
  { emoji: '💭', title: 'A song about imposter syndrome in tech', votes: 87, tag: 'Emotion' },
  { emoji: '🌍', title: 'Climate anxiety set to ambient soundscapes', votes: 73, tag: 'Society' },
  { emoji: '📚', title: 'The entire periodic table as a melody', votes: 61, tag: 'Chemistry' },
  { emoji: '🔮', title: 'Sanskrit mantras fused with electronic music', votes: 55, tag: 'Culture' },
];

export default async function TopicsPage() {
  const topics = await client.fetch(allTopicsQuery) || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Community', href: '/topics' }, { label: 'Explore Topics' }]}>
      <PageHeader
        eyebrow="COMMUNITY · INFLUENCE"
        title="Community Topics"
        description="What should UPNAAD create next? Vote on existing ideas or submit your own. The most-voted topics become our next songs, stories, or research."
      />

      {topics.length > 0 ? (
        <TopicsClient initialTopics={topics} />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex-1">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">🗳️ Coming Soon</span>
              <p className="text-sm text-text-secondary">Real voting launches soon. These are sample community ideas.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_TOPICS.map((t) => (
              <div key={t.title} className="p-6 rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-white dark:bg-white/3 space-y-3 opacity-60 cursor-default">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-accent">▲</span>
                    <span className="text-xs font-bold text-text-secondary">{t.votes}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{t.tag}</span>
                <h3 className="font-bold leading-snug text-sm">{t.title}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

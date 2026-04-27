import { client } from '@/src/sanity/lib/client';
import { allStoriesQuery } from '@/src/sanity/lib/queries';
import StoriesClient from '@/src/components/StoriesClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories & Narratives',
  description: 'Original stories, philosophical reflections, and human experiences — told with depth.',
};

export const revalidate = 60;

const PLACEHOLDER_STORIES = [
  { emoji: '🌙', tag: 'Reflection', title: 'The Night I Stopped Listening to Myself', desc: 'A personal account of how ambient music helped navigate grief.' },
  { emoji: '🧪', tag: 'Science', title: 'What Silence Does to the Brain', desc: 'Neuroscience and the profound effect of quiet on creative thought.' },
  { emoji: '💡', tag: 'Philosophy', title: 'Does Music Have Memory?', desc: 'On how a song can hold entire chapters of your life inside it.' },
  { emoji: '✍️', tag: 'Personal', title: 'Writing While Listening', desc: 'How background sound rewired my creative process completely.' },
  { emoji: '🌊', tag: 'Emotional', title: 'Frequency and Feeling', desc: "A story about how a stranger's playlist changed the author's year." },
  { emoji: '📖', tag: 'Narrative', title: 'The Library at the End of Sound', desc: 'A short fiction piece where silence is the last language left.' },
];

export default async function StoriesPage() {
  const stories = await client.fetch(allStoriesQuery);
  const allStories = stories || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Stories' }]}>
      <PageHeader
        eyebrow="STORIES · NARRATIVES"
        title="Stories"
        description="Original narratives, philosophical reflections, and real-life journeys — told with honesty and depth. Write something. Share something. Contribute."
      />

      {allStories.length > 0 ? (
        <StoriesClient initialStories={allStories} />
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">📖 Coming Soon</span>
            <p className="text-sm text-text-secondary">Stories are coming. Connect Sanity to publish. Samples below.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_STORIES.map((s) => (
              <div key={s.title} className="p-7 rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-white dark:bg-white/3 space-y-3 opacity-60">
                <div className="text-2xl">{s.emoji}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{s.tag}</span>
                <h3 className="font-bold leading-snug">{s.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}

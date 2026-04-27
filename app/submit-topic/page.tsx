import { client } from '@/src/sanity/lib/client';
import { allTopicsQuery } from '@/src/sanity/lib/queries';
import SubmitTopicClient from '@/src/components/SubmitTopicClient';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Submit a Topic',
  description: 'Suggest a topic, idea, or theme and influence what UPNAAD creates next.',
};

export default async function SubmitTopicPage() {
  const topics = await client.fetch(allTopicsQuery) || [];

  return (
    <PageShell breadcrumbs={[{ label: 'Community', href: '/topics' }, { label: 'Submit a Topic' }]}>
      <PageHeader
        eyebrow="COMMUNITY · SUBMIT"
        title="Submit a Topic"
        description="Have an idea for a song, story, or research piece? Submit it here and let the community vote. The best ideas become our next creation."
      />
      <SubmitTopicClient initialTopics={topics} />
    </PageShell>
  );
}

import { client } from '@/src/sanity/lib/client';
import { allTopicsQuery } from '@/src/sanity/lib/queries';
import TopicsClient from '@/src/components/TopicsClient';

export const revalidate = 60; // Revalidate every minute

export default async function TopicsPage() {
  const topics = await client.fetch(allTopicsQuery) || [];

  return <TopicsClient initialTopics={topics} />;
}

import { client } from '@/src/sanity/lib/client';
import { allTopicsQuery } from '@/src/sanity/lib/queries';
import SubmitTopicClient from '@/src/components/SubmitTopicClient';

export const revalidate = 60;

export default async function SubmitTopicPage() {
  const topics = await client.fetch(allTopicsQuery) || [];
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-24">
      <SubmitTopicClient initialTopics={topics} />
    </div>
  );
}

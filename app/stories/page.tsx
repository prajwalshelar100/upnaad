import { client } from '@/src/sanity/lib/client';
import { allStoriesQuery } from '@/src/sanity/lib/queries';
import StoriesClient from '@/src/components/StoriesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stories & Narratives | UPNAAD',
  description: 'Explore curated stories and narratives that connect emotion, awareness, and insight.',
};

export const revalidate = 60; // revalidate every minute

export default async function StoriesPage() {
  const stories = await client.fetch(allStoriesQuery);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <StoriesClient initialStories={stories || []} />
    </div>
  );
}

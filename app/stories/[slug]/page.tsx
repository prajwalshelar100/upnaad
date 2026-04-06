import { client } from '@/src/sanity/lib/client';
import { allStoriesQuery, storyBySlugQuery } from '@/src/sanity/lib/queries';
import StoryDetailClient from '@/src/components/StoryDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await client.fetch(storyBySlugQuery, { slug });
  if (!story) return { title: 'Not Found' };

  return {
    title: `${story.title} | Stories & Narratives | UPNAAD`,
    description: story.excerpt,
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await client.fetch(storyBySlugQuery, { slug });
  
  if (!story) notFound();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <StoryDetailClient story={story} />
    </div>
  );
}

export async function generateStaticParams() {
  const stories = await client.fetch(allStoriesQuery);
  return (stories || []).map((story: any) => ({
    slug: story.slug?.current || story.slug,
  }));
}

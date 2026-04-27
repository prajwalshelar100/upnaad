import { client } from '@/src/sanity/lib/client';
import { allStoriesQuery, storyBySlugQuery } from '@/src/sanity/lib/queries';
import StoryDetailClient from '@/src/components/StoryDetailClient';
import PageShell from '@/src/components/PageShell';
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
    description: story.excerpt || `Read "${story.title}" on UPNAAD — stories that breathe with sound.`,
    openGraph: {
      title: `${story.title} | UPNAAD Stories`,
      description: story.excerpt || '',
      type: 'article',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt || '',
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await client.fetch(storyBySlugQuery, { slug });
  
  if (!story) notFound();

  return (
    <PageShell breadcrumbs={[{ label: 'Stories', href: '/stories' }, { label: story.title }]}>
      <StoryDetailClient story={story} />
    </PageShell>
  );
}

export async function generateStaticParams() {
  const stories = await client.fetch(allStoriesQuery);
  return (stories || []).map((story: any) => ({
    slug: story.slug?.current || story.slug,
  }));
}

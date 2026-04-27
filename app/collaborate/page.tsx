import { Suspense } from 'react';
import CollaborateClient from '@/src/components/CollaborateClient';
import { client } from '@/src/sanity/lib/client';
import { groq } from 'next-sanity';
import PageShell from '@/src/components/PageShell';
import PageHeader from '@/src/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Collaborate',
  description: 'Partner with UPNAAD on research, music production, or creative projects.',
};

interface Props {
  searchParams: { reference?: string };
}

export default async function CollaboratePage(props: Props) {
  const sp = await props.searchParams;
  const referenceId = sp?.reference;

  let referenceTrack = null;
  if (referenceId) {
    referenceTrack = await client.fetch(
      groq`*[_type == "music" && _id == $referenceId][0]`,
      { referenceId }
    );
  }

  return (
    <PageShell breadcrumbs={[{ label: 'Community', href: '/topics' }, { label: 'Collaborate' }]}>
      <PageHeader
        eyebrow="COMMUNITY · WORK WITH US"
        title="Collaborate"
        description="Partner with UPNAAD on a project. Whether it's music, research, storytelling, or brand sound — let's build something meaningful together."
      />
      <Suspense fallback={<div className="animate-pulse w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-3xl" />}>
        <CollaborateClient referenceTrack={referenceTrack} />
      </Suspense>
    </PageShell>
  );
}

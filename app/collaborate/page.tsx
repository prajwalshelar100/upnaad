import { Suspense } from 'react';
import CollaborateClient from '@/src/components/CollaborateClient';
import { client } from '@/src/sanity/lib/client';
import { groq } from 'next-sanity';

export const revalidate = 60; // revalidate every 60 seconds

interface Props {
  searchParams: { reference?: string };
}

export default async function CollaboratePage(props: Props) {
  // searchParams is a promise in Next 15
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
    <Suspense fallback={<div className="animate-pulse w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-3xl"></div>}>
      <CollaborateClient referenceTrack={referenceTrack} />
    </Suspense>
  );
}


import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery } from '@/src/sanity/lib/queries';
import ArchiveClient from '@/src/components/ArchiveClient';

export const revalidate = 60; // revalidate every 60 seconds

export default async function ArchivePage() {
  const allReleases = await client.fetch(allReleasesQuery);
  
  return <ArchiveClient initialReleases={allReleases || []} />;
}


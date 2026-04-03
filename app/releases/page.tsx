import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery } from '@/src/sanity/lib/queries';
import ReleasesClient from '@/src/components/ReleasesClient';

export const revalidate = 60; // revalidate every 60 seconds

export default async function ResearchPage() {
  const allReleases = await client.fetch(allReleasesQuery);
  
  return <ReleasesClient initialReleases={allReleases || []} />;
}


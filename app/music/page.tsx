import { client } from '@/src/sanity/lib/client';
import { allMusicQuery } from '@/src/sanity/lib/queries';
import MusicClient from '@/src/components/MusicClient';

export const revalidate = 60; // revalidate every 60 seconds

export default async function MusicPage() {
  const allMusic = await client.fetch(allMusicQuery);
  
  return <MusicClient initialTracks={allMusic || []} />;
}


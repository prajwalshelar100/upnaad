import { client } from '@/src/sanity/lib/client';
import { homeQuery, latestReleaseQuery, allBlogsQuery, allServicesQuery } from '@/src/sanity/lib/queries';
import HomeClient from '@/src/components/HomeClient';

export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const [homeData, latestDrop, allBlogs, allServices] = await Promise.all([
    client.fetch(homeQuery),
    client.fetch(latestReleaseQuery),
    client.fetch(allBlogsQuery),
    client.fetch(allServicesQuery)
  ]);

  return <HomeClient homeData={homeData} latestDrop={latestDrop} latestBlogs={allBlogs?.slice(0, 3) || []} services={allServices?.slice(0, 3) || []} />;
}



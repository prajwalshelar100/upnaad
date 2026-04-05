import { musicTracks } from '../src/data/music.js';
import { podcastEpisodes } from '../src/data/podcasts.js';
import { blogArticles } from '../src/data/blogs.js';
import { researchReleases } from '../src/data/releases.js';
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-05';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN is missing in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function syncData() {
  console.log('🚀 Starting Code-to-CMS Sync...');

  // Sync Music
  for (const track of musicTracks) {
    const slug = track.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await client.createOrReplace({
      _type: 'music',
      _id: `music-${slug}`,
      ...track,
    });
    console.log(`✅ Synced Music: ${track.title}`);
  }

  // Sync Podcasts
  for (const episode of podcastEpisodes) {
    const slug = episode.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await client.createOrReplace({
      _type: 'podcast',
      _id: `podcast-${slug}`,
      ...episode,
    });
    console.log(`✅ Synced Podcast: ${episode.title}`);
  }

  // Sync Blogs
  for (const blog of blogArticles) {
    const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await client.createOrReplace({
      _type: 'blog',
      _id: `blog-${slug}`,
      ...blog,
      slug: { _type: 'slug', current: slug },
    });
    console.log(`✅ Synced Blog: ${blog.title}`);
  }

  // Sync Releases
  for (const release of researchReleases) {
    const slug = release.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await client.createOrReplace({
      _type: 'release',
      _id: `release-${slug}`,
      ...release,
      slug: { _type: 'slug', current: slug },
    });
    console.log(`✅ Synced Release: ${release.title}`);
  }

  console.log('✨ All content synchronized successfully!');
}

syncData().catch(console.error);

import { MetadataRoute } from 'next';
import { client } from '@/src/sanity/lib/client';
import { allReleasesQuery, allBlogsQuery } from '@/src/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://upnaad.com';
    
    // Fetch dynamic data
    const [newReleases, allBlogs] = await Promise.all([
        client.fetch(allReleasesQuery),
        client.fetch(allBlogsQuery)
    ]);

    // 1. Define Static Routes with Priorities
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: '', priority: 1.0, changeFrequency: 'daily' },
        { url: '/releases', priority: 0.9, changeFrequency: 'daily' },
        { url: '/blog', priority: 0.9, changeFrequency: 'daily' },
        { url: '/services', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/music', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/podcast', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/archive', priority: 0.7, changeFrequency: 'monthly' },
        { url: '/collaborate', priority: 0.5, changeFrequency: 'monthly' },
        { url: '/services/inquire', priority: 0.5, changeFrequency: 'monthly' },
        { url: '/about', priority: 0.5, changeFrequency: 'monthly' },
    ].map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency as any,
        priority: route.priority,
    }));

    // 2. Dynamic Routes for Research Drops (Releases)
    const dynamicResearchRoutes: MetadataRoute.Sitemap = (newReleases || []).map((drop: any) => ({
        url: `${baseUrl}/releases/${drop.slug?.current || drop.slug}`,
        lastModified: drop.date ? new Date(drop.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 3. Dynamic Routes for Meaning Hub
    const dynamicMeaningRoutes: MetadataRoute.Sitemap = (newReleases || []).map((drop: any) => ({
        url: `${baseUrl}/meaning/${drop.slug?.current || drop.slug}`,
        lastModified: drop.date ? new Date(drop.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 4. Dynamic Routes for Blog Posts
    const dynamicBlogRoutes: MetadataRoute.Sitemap = (allBlogs || []).map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug?.current || post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 5. Combine them
    return [...staticRoutes, ...dynamicResearchRoutes, ...dynamicMeaningRoutes, ...dynamicBlogRoutes];
}
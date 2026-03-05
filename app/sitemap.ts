import { MetadataRoute } from 'next';
import { newReleases } from '@/src/data/releases';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://upnaad.com';

    // 1. Define Static Routes with Priorities
    // Priority 1.0 = Most important (Homepage)
    // Priority 0.8 = Main category pages
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: '', priority: 1.0, changeFrequency: 'daily' },
        { url: '/releases', priority: 0.9, changeFrequency: 'daily' },
        { url: '/podcast', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/music', priority: 0.8, changeFrequency: 'weekly' },
        { url: '/archive', priority: 0.7, changeFrequency: 'monthly' },
        { url: '/collaborate', priority: 0.5, changeFrequency: 'monthly' },
        { url: '/about', priority: 0.5, changeFrequency: 'monthly' },
    ].map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency as any,
        priority: route.priority,
    }));

    // 2. Automatically generate Dynamic Routes for Research Drops
    // This ensures every time you add a new study to your data file, 
    // Google finds it instantly without you updating this file.
    const dynamicResearchRoutes: MetadataRoute.Sitemap = newReleases.map((drop) => ({
        url: `${baseUrl}/releases/${drop.slug}`,
        // If your data has a date, use it; otherwise use current date
        lastModified: drop.date ? new Date(drop.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 3. Combine them
    return [...staticRoutes, ...dynamicResearchRoutes];
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://upnaad.com';

    return {
        rules: [
            {
                userAgent: '*', // Rules for all bots
                allow: [
                    '/',
                    '/research',
                    '/podcast',
                    '/music'
                ],
                disallow: [
                    '/_next/',       // Prevents crawling of build files
                    '/static/',      // Prevents crawling of raw static assets
                    '/api/',         // Protects your backend routes
                    '/private/',     // Your existing private folder
                    '/*?*',          // Prevents crawling of URL parameters (prevents duplicate content)
                ],
            },
            {
                userAgent: ['GPTBot', 'CCBot'], // Specific rules for AI Scrapers
                allow: ['/research'],           // You might want AI to see your research...
                disallow: ['/'],                // ...but not scrape the whole site architecture
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
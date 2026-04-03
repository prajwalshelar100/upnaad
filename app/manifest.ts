import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'UPNAAD - Research in Motion',
        short_name: 'UPNAAD',
        description: 'A research + music + podcast platform exploring the intersection of sound and society.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0f1a',
        theme_color: '#0a0f1a',
        icons: [
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    };
}

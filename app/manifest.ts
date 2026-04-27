import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'UPNAAD - Research in Motion',
        short_name: 'UPNAAD',
        description: 'A research + music + podcast platform exploring the intersection of sound and society.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0f1a',
        theme_color: '#0a0f1a',
        categories: ['music', 'education', 'lifestyle'],
        lang: 'en',
        // ─── Icons (replace /icon-placeholder.png with your real logo files) ───
        icons: [
            // Favicons / browser tab
            {
                src: '/favicon.png',
                sizes: '32x32',
                type: 'image/png',
            },
            // Standard Android / Chrome
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            // HD Android / Windows
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            // Maskable icon (Android adaptive icon, removes white borders)
            {
                src: '/icon-512-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            // Apple Touch Icon (iOS home screen)
            {
                src: '/apple-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        // ─── Shortcuts (quick actions from app icon long-press) ─────────────
        shortcuts: [
            {
                name: 'Listen to Music',
                short_name: 'Music',
                description: 'Browse and play music tracks',
                url: '/music',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
            {
                name: 'Podcast Episodes',
                short_name: 'Podcast',
                description: 'Latest podcast episodes',
                url: '/podcast',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
            {
                name: 'Read Stories',
                short_name: 'Stories',
                description: 'Stories and narratives',
                url: '/stories',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
        ],
        // ─── Screenshots (shown on Android install prompt) ──────────────────
        // screenshots: [
        //   {
        //     src: '/screenshots/home.png',
        //     sizes: '1280x720',
        //     type: 'image/png',
        //     form_factor: 'wide',
        //     label: 'UPNAAD Home',
        //   },
        // ],
    };
}

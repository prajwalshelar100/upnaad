import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import { AudioProvider } from "@/src/context/AudioContext";
import LayoutWrapper from "@/src/components/LayoutWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://upnaad.com"),
  title: {
    default: "UPNAAD — Research in Motion. Sound with Substance.",
    template: "%s | UPNAAD",
  },
  description: "A research + music + podcast platform exploring the intersection of sound and society.",
  keywords: [
    "Sanskrit music",
    "meditation music India",
    "focus music for studying",
    "lofi study music",
    "white noise for studying",
    "spiritual sound healing",
    "ancient mantra meaning",
    "sound therapy research",
    "UPNAAD",
    "consciousness through sound",
    "study with me India",
    "ambient music",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon-512-maskable.png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'UPNAAD',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: "UPNAAD — Research in Motion. Sound with Substance.",
    description: "A research + music + podcast platform exploring the intersection of sound and society.",
    type: "website",
    url: "https://upnaad.com",
    siteName: "UPNAAD",
    images: [
      {
        url: '/opengraph-image.png', // 1200x630 — add this file to /public/
        width: 1200,
        height: 630,
        alt: 'UPNAAD — Research in Motion. Sound with Substance.',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPNAAD — Research in Motion.",
    description: "Sound with Substance. Research + music + podcast.",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJN2EDM4HL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJN2EDM4HL');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AudioProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

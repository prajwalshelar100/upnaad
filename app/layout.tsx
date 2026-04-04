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
  title: "UPNAAD — Research in Motion. Sound with Substance.",
  description: "A research + music + podcast platform exploring the intersection of sound and society.",
  keywords: [
    "Sanskrit music",
    "meditation music India",
    "focus music for studying",
    "spiritual sound healing",
    "ancient mantra meaning",
    "sound therapy research",
    "UPNAAD",
    "consciousness through sound",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "UPNAAD",
    description: "Research in Motion. Sound with Substance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPNAAD",
    description: "Research in Motion. Sound with Substance.",
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

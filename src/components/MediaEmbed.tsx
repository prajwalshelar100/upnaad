"use client";

import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MediaEmbedProps {
  type: 'spotify' | 'youtube';
  url: string;
}

export default function MediaEmbed({ type, url }: MediaEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback timeout to ensure the loading state clears even if onLoad doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [url]);

  if (type === 'spotify') {
    return (
      <div className="w-full min-h-[152px] bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark relative">
        <iframe
          src={url}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
        ></iframe>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-50 dark:bg-gray-900 z-10">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-border-light dark:border-border-dark shadow-lg">
      <iframe
        src={url}
        className={cn(
          "absolute top-0 left-0 w-full h-full transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Initializing Player</p>
          </div>
        </div>
      )}
    </div>
  );
}

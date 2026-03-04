"use client";

import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  ExternalLink,
  PanelRightClose,
  PanelRightOpen,
  BookOpen,
  Mic2,
  Music as MusicIcon
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { researchDrops } from '@/src/data/research';
import { podcastEpisodes } from '@/src/data/podcast';
import { musicTracks } from '@/src/data/music';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ContextPanel() {
  const router = useRouter();
  const { 
    isContextPanelCollapsed, 
    toggleContextPanel, 
    isReadingMode, 
    toggleReadingMode 
  } = useTheme();

  if (isReadingMode) return null;

  return (
    <aside 
      className={cn(
        "fixed right-0 top-0 h-screen bg-white dark:bg-[#0D0D0D] border-l border-border-light dark:border-border-dark transition-all duration-300 ease-in-out z-40",
        isContextPanelCollapsed ? "w-[56px]" : "w-[300px]",
        "hidden lg:flex flex-col"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-border-light dark:border-border-dark h-[72px]">
          {!isContextPanelCollapsed && (
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
              aria-label="Go Back"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          )}
          <div className="flex items-center gap-1 mx-auto lg:mx-0">
            {!isContextPanelCollapsed && (
              <button 
                onClick={toggleReadingMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-text-secondary"
                title="Reading Mode"
              >
                <Maximize2 size={16} />
              </button>
            )}
            <button 
              onClick={toggleContextPanel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-text-secondary"
              aria-label={isContextPanelCollapsed ? "Expand Panel" : "Collapse Panel"}
            >
              {isContextPanelCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
            </button>
          </div>
        </div>

        {!isContextPanelCollapsed && (
          <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={14} className="text-accent" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Related Research</h3>
              </div>
              <div className="space-y-5">
                {researchDrops.slice(0, 2).map((drop) => (
                  <Link 
                    key={drop.slug} 
                    href={`/research/${drop.slug}`}
                    className="group block"
                  >
                    <p className="text-sm font-medium leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {drop.title}
                    </p>
                    <p className="text-[10px] text-text-secondary mt-2 font-mono">{drop.date}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mic2 size={14} className="text-accent" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Latest Podcast</h3>
              </div>
              <Link href="/podcast" className="group block bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-border-light dark:border-border-dark hover:border-accent transition-all">
                <p className="text-xs font-bold mb-1 group-hover:text-accent transition-colors">{podcastEpisodes[0].title}</p>
                <p className="text-[10px] text-text-secondary line-clamp-1">{podcastEpisodes[0].description}</p>
              </Link>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <MusicIcon size={14} className="text-accent" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Music Track</h3>
              </div>
              <Link href="/music" className="group block bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-border-light dark:border-border-dark hover:border-accent transition-all">
                <p className="text-xs font-bold mb-1 group-hover:text-accent transition-colors">{musicTracks[0].title}</p>
                <p className="text-[10px] text-text-secondary line-clamp-1">{musicTracks[0].description}</p>
              </Link>
            </section>

            <section className="pt-6 border-t border-border-light dark:border-border-dark">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Resources</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between text-xs text-text-secondary hover:text-accent transition-colors group">
                  Spotify Playlist <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="flex items-center justify-between text-xs text-text-secondary hover:text-accent transition-colors group">
                  YouTube Channel <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="flex items-center justify-between text-xs text-text-secondary hover:text-accent transition-colors group">
                  Research Archive <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </section>
          </div>
        )}
      </div>
    </aside>
  );
}

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
  Music as MusicIcon,
  Youtube as YoutubeIcon
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
// 
import { client } from '@/src/sanity/lib/client';
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

  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [podcastEpisodes, setPodcastEpisodes] = useState<any[]>([]);
  const [musicTracks, setMusicTracks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const releases = await client.fetch(`*[_type == "release"] | order(date desc)[0...2]`);
        const podcasts = await client.fetch(`*[_type == "podcast"] | order(date desc)[0...1]`);
        const tracks = await client.fetch(`*[_type == "music"] | order(date desc)[0...1]`);
        if (releases?.length) setNewReleases(releases);
        if (podcasts?.length) setPodcastEpisodes(podcasts);
        if (tracks?.length) setMusicTracks(tracks);
      } catch (err) {
        console.warn('Sanity fetch failed. Falling back to local data.', err);
      }
    }
    fetchData();
  }, []);

  if (isReadingMode) return null;

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-2xl border-l border-slate-200/60 dark:border-white/5 transition-all duration-300 ease-in-out z-40 shadow-2xl",
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
                className="p-2 hover:bg-accent/10 dark:hover:bg-accent/10 rounded-lg transition-colors text-text-secondary hover:text-accent"
                title="Reading Mode"
              >
                <Maximize2 size={16} />
              </button>
            )}
            <button
              onClick={toggleContextPanel}
              className="p-2 hover:bg-accent/10 dark:hover:bg-accent/10 rounded-lg transition-colors text-text-secondary hover:text-accent"
              aria-label={isContextPanelCollapsed ? "Expand Panel" : "Collapse Panel"}
            >
              {isContextPanelCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
            </button>
          </div>
        </div>

        {!isContextPanelCollapsed && (
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-28 space-y-10 custom-scrollbar">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={14} className="text-accent" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Related Research</h3>
              </div>
              <div className="space-y-5">
                {newReleases.slice(0, 2).map((drop) => (
                  <Link
                    key={drop.slug}
                    href={`/releases/${drop.slug}`}
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

            {podcastEpisodes.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Mic2 size={14} className="text-accent" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Latest Podcast</h3>
                </div>
                <Link href="/podcast" className="group block bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-accent transition-all backdrop-blur-sm shadow-sm">
                  <p className="text-xs font-bold mb-1 group-hover:text-accent transition-colors">{podcastEpisodes[0]?.title}</p>
                  <p className="text-[10px] text-text-secondary line-clamp-1">{podcastEpisodes[0]?.description}</p>
                </Link>
              </section>
            )}

            {musicTracks.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <MusicIcon size={14} className="text-accent" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Music Track</h3>
                </div>
                <Link href="/music" className="group block bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-accent transition-all backdrop-blur-sm shadow-sm">
                  <p className="text-xs font-bold mb-1 group-hover:text-accent transition-colors">{musicTracks[0]?.title}</p>
                  <p className="text-[10px] text-text-secondary line-clamp-1">{musicTracks[0]?.description}</p>
                </Link>
              </section>
            )}

            <section className="pt-6 border-t border-border-light dark:border-border-dark">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Join Newsletter</h3>
              <form onSubmit={(e) => { e.preventDefault(); (e.target as any).reset(); alert("Subscribed!"); }} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full bg-white dark:bg-accent/5 border border-accent/20 dark:border-white/10 px-3 py-2 rounded-lg text-xs outline-none focus:border-accent transition-colors font-medium"
                />
                <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-widest text-[10px] py-3 rounded-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/30">
                  Subscribe
                </button>
              </form>
            </section>

            <section className="pt-6 border-t border-border-light dark:border-border-dark">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">Resources</h3>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://open.spotify.com/user/31lle7khoqvlaqco6dsujppwadky?si=61326e719cec4eae" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1DB954]/5 dark:bg-[#1DB954]/10 border border-[#1DB954]/20 hover:bg-[#1DB954]/10 dark:hover:bg-[#1DB954]/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MusicIcon size={14} className="text-[#1DB954]" />
                    <span className="text-[11px] font-bold">Spotify Playlist</span>
                  </div>
                  <ExternalLink size={12} className="text-[#1DB954] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FF0000]/5 dark:bg-[#FF0000]/10 border border-[#FF0000]/20 hover:bg-[#FF0000]/10 dark:hover:bg-[#FF0000]/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <YoutubeIcon size={14} className="text-[#FF0000]" />
                    <span className="text-[11px] font-bold">YouTube Channel</span>
                  </div>
                  <ExternalLink size={12} className="text-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <Link 
                  href="/archive" 
                  className="flex items-center justify-between p-3 rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/20 hover:bg-accent/10 dark:hover:bg-accent/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <PanelRightClose size={14} className="text-accent" />
                    <span className="text-[11px] font-bold">Research Archive</span>
                  </div>
                  <ChevronRight size={12} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </aside>
  );
}

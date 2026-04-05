"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';
import ListenButton from '@/src/components/ListenButton';
import { Search, ChevronDown, Users, BookOpen, Music as MusicIcon, Play, ExternalLink, ArrowRight, Youtube } from 'lucide-react';
import { urlForImage } from '@/src/sanity/lib/image';

interface MusicClientProps {
  initialTracks: any[];
}

export default function MusicClient({ initialTracks }: MusicClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeCategory, setActiveCategory] = useState("All Categories");

  // Extract unique filters
  const genres = ["All Genres", ...Array.from(new Set(initialTracks.map(t => t.genre).filter(Boolean)))];
  const categories = ["All Categories", ...Array.from(new Set(initialTracks.map(t => t.category).filter(Boolean)))];

  const filteredTracks = initialTracks.filter((track) => {
    const matchesSearch = track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === "All Genres" || track.genre === activeGenre;
    const matchesCategory = activeCategory === "All Categories" || track.category === activeCategory;
    return matchesSearch && matchesGenre && matchesCategory;
  });

  return (
    <div className="py-12 space-y-16 pb-20">
      <PageHeader
        title="Music Catalogue"
        description="Search, stream, and collaborate on our sonic translations."
        className="mb-0"
      />

      {/* Controls: Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-text-secondary/40">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            className="w-full bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-3xl py-4 pl-16 pr-6 text-sm focus:outline-none focus:border-accent transition-all placeholder:text-text-secondary/40 shadow-sm"
            placeholder="Filter tracks or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          {/* Category Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-2xl py-4 pl-6 pr-12 text-[10px] font-bold uppercase tracking-widest appearance-none focus:outline-none focus:border-accent transition-all cursor-pointer shadow-sm"
            >
              {categories.map(cat => (
                <option key={cat as string} value={cat as string}>{cat as string}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40 pointer-events-none" />
          </div>

          {/* Genre Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={activeGenre}
              onChange={(e) => setActiveGenre(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-border-light dark:border-border-dark rounded-2xl py-4 pl-6 pr-12 text-[10px] font-bold uppercase tracking-widest appearance-none focus:outline-none focus:border-accent transition-all cursor-pointer shadow-sm"
            >
              {genres.map(genre => (
                <option key={genre as string} value={genre as string}>{genre as string}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/40 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTracks.length === 0 ? (
          <div className="col-span-full py-20 text-center italic text-text-secondary">
            No tracks found matching your filters.
          </div>
        ) : (
          filteredTracks.map(track => {
            const artworkSrc = track.artwork ? urlForImage(track.artwork).url() : track.artworkUrlFallback || "https://picsum.photos/seed/placeholder/400/400";
            return (
              <div 
                key={track._id || track.id} 
                className="flex flex-col bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-[2.5rem] shadow-premium group overflow-hidden"
              >
                {/* Artwork Area */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={artworkSrc}
                    alt={track.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />

                  {track.audioUrl && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ListenButton
                        label="Play"
                        playingLabel="Playing"
                        track={{
                          id: track._id || track.id,
                          title: track.title,
                          artist: "Upnaad Sound",
                          url: track.audioUrl,
                          coverImage: artworkSrc,
                          spotifyUrl: track.spotifyUrl,
                          youtubeUrl: track.youtubeUrl
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                       {track.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                          {track.category}
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/50">
                        {track.genre}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-tight">
                      {track.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  {/* Actions Area */}
                  <div className="mt-auto pt-6 border-t border-border-light/50 dark:border-border-dark/50 flex flex-col gap-3">
                    <div className="flex gap-2">
                      {track.spotifyUrl && (
                        <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1DB954] text-white p-3 rounded-xl hover:bg-[#1ed760] transition-colors flex items-center justify-center shadow-lg shadow-green-500/10">
                          <MusicIcon size={18} />
                        </a>
                      )}
                      {track.youtubeUrl && (
                        <a href={track.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#FF0000] text-white p-3 rounded-xl hover:bg-[#ff3333] transition-colors flex items-center justify-center shadow-lg shadow-red-500/10">
                          <Youtube size={18} />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {track.relatedResearchSlug && (
                        <Link href={`/releases/${track.relatedResearchSlug}`} className="flex-1 bg-text-light dark:bg-text-dark text-white dark:text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                          Research <ArrowRight size={14} />
                        </Link>
                      )}
                      <Link href={`/collaborate?reference=${track._id || track.id}`} className="flex-1 border border-border-light dark:border-border-dark py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        Collab <Users size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

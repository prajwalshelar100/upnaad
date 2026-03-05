"use client";

import { useState } from 'react';
import { musicTracks, MusicTrack } from '@/src/data/music';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/src/components/PageHeader';
import ListenButton from '@/src/components/ListenButton';
import { Search, ChevronDown, Users, BookOpen, Music as MusicIcon, Play, ExternalLink } from 'lucide-react';

export default function MusicPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [activeCategory, setActiveCategory] = useState("All Categories");

  // Extract unique filters
  const genres = ["All Genres", ...Array.from(new Set(musicTracks.map(t => t.genre)))];
  const categories = ["All Categories", ...Array.from(new Set(musicTracks.map(t => t.category)))];

  const filteredTracks = musicTracks.filter((track) => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === "All Genres" || track.genre === activeGenre;
    const matchesCategory = activeCategory === "All Categories" || track.category === activeCategory;
    return matchesSearch && matchesGenre && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Music Catalogue"
        description="Search, stream, and collaborate on our sonic translations."
      />

      {/* Controls: Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full h-full bg-gray-50 dark:bg-[#111111] border border-border-light dark:border-border-dark rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-gray-400"
            placeholder="Search tracks or descriptions..."
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
              className="w-full bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl py-4 pl-4 pr-10 text-sm font-bold appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Genre Dropdown */}
          <div className="relative min-w-[200px]">
            <select
              value={activeGenre}
              onChange={(e) => setActiveGenre(e.target.value)}
              className="w-full bg-white dark:bg-black border border-border-light dark:border-border-dark rounded-2xl py-4 pl-4 pr-10 text-sm font-bold appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {filteredTracks.length === 0 ? (
          <div className="text-center py-20 text-text-secondary">
            No tracks found matching your criteria.
          </div>
        ) : (
          filteredTracks.map(track => (
            <div key={track.id} className="flex flex-col lg:flex-row gap-12 items-start border-b border-border-light dark:border-border-dark pb-16 last:border-0 last:pb-0">

              {/* Left: Artwork */}
              <div className="relative w-full lg:w-[400px] aspect-square rounded-3xl overflow-hidden shadow-2xl shrink-0 group">
                <Image
                  src={track.artwork}
                  alt={track.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {track.audioUrl && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ListenButton
                      label="Play Song"
                      playingLabel="Now Playing"
                      icon={<Play size={20} className="fill-current" />}
                      track={{
                        id: track.id,
                        title: track.title,
                        artist: "Upnaad Sound",
                        url: track.audioUrl,
                        coverImage: track.artwork,
                        spotifyUrl: track.spotifyUrl,
                        youtubeUrl: track.youtubeUrl
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Right: Content & Actions */}
              <div className="flex-1 flex flex-col w-full gap-8">

                {/* Headers and Badges */}
                <div className="w-full flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-3 py-1.5 rounded-md border border-accent/10">
                      {track.category}
                    </span>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-text-secondary bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
                      {track.genre}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{track.title}</h3>
                  <p className="text-sm font-mono text-text-secondary">{track.date}</p>
                </div>

                <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-light">
                  {track.description}
                </p>

                {/* Primary Actions (Listen) */}
                <div className="flex flex-wrap gap-3 w-full border-t border-border-light dark:border-border-dark pt-8">
                  {track.audioUrl && (
                    <ListenButton
                      label="Play the Song"
                      playingLabel="Now Playing"
                      icon={<MusicIcon size={16} />}
                      track={{
                        id: track.id,
                        title: track.title,
                        artist: "Upnaad Sound",
                        url: track.audioUrl,
                        coverImage: track.artwork,
                        spotifyUrl: track.spotifyUrl,
                        youtubeUrl: track.youtubeUrl
                      }}
                    />
                  )}

                  {track.spotifyUrl && (
                    <a
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1DB954] text-white px-5 py-2.5 rounded-full hover:bg-[#1ed760] transition-colors font-bold text-sm"
                    >
                      Listen on Spotify <ExternalLink size={14} />
                    </a>
                  )}

                  {track.youtubeUrl && (
                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2.5 rounded-full hover:bg-[#ff3333] transition-colors font-bold text-sm"
                    >
                      Listen on YouTube <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {/* Secondary Actions (Research & Collaborate) */}
                <div className="flex flex-wrap gap-3 w-full">
                  {track.relatedResearchSlug && (
                    <Link
                      href={`/releases/${track.relatedResearchSlug}`}
                      className="inline-flex items-center justify-center gap-2 bg-text-light dark:bg-text-dark text-white dark:text-black px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-accent/10"
                    >
                      <BookOpen size={14} />
                      Behind the Song
                    </Link>
                  )}

                  <Link
                    href={`/collaborate?reference=${track.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#1A1A1A] dark:hover:bg-[#222222] px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <Users size={14} />
                    Collaborate
                  </Link>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

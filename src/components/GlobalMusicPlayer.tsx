"use client";

import { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Repeat, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { useAudio } from '@/src/context/AudioContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function GlobalMusicPlayer() {
    const {
        currentTrack,
        isPlaying,
        isLooping,
        isMaximized,
        togglePlay,
        toggleLoop,
        toggleMaximize,
        nextTrack,
        prevTrack
    } = useAudio();

    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            // Only update src if it's different 
            // This prevents reloading the same audio and losing position
            if (audioRef.current.src !== currentTrack.url) {
                audioRef.current.src = currentTrack.url;
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Audio play error", e));
                }
            } else {
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Audio play error", e));
                } else {
                    audioRef.current.pause();
                }
            }
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isLooping;
        }
    }, [isLooping]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(isNaN(p) ? 0 : p);
        }
    };

    const handleEnded = () => {
        if (!isLooping) {
            nextTrack();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTo = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = (seekTo / 100) * audioRef.current.duration;
            setProgress(seekTo);
        }
    };

    if (!currentTrack) return null;

    return (
        <>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Maximized Overlay */}
            <AnimatePresence>
                {isMaximized && (
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-[#0D0D0D] flex flex-col pt-20 pb-[100px] px-6"
                    >
                        <button
                            onClick={toggleMaximize}
                            className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <Minimize2 size={24} />
                        </button>

                        <div className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto w-full gap-12">
                            <motion.div
                                className="w-full max-w-sm aspect-square relative rounded-2xl overflow-hidden shadow-2xl"
                                layoutId="album-art"
                            >
                                {currentTrack.coverImage ? (
                                    <Image src={currentTrack.coverImage} alt={currentTrack.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                        <Music size={64} className="text-gray-300 dark:text-gray-600" />
                                    </div>
                                )}
                            </motion.div>

                            <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{currentTrack.title}</h2>
                                <p className="text-xl text-text-secondary mb-12">{currentTrack.artist}</p>

                                <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 h-2 rounded-full mb-8 relative cursor-pointer">
                                    <div className="h-full bg-accent rounded-full absolute top-0 left-0" style={{ width: `${progress}%` }} />
                                    <input
                                        type="range" min="0" max="100" value={progress} onChange={handleSeek}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-8 mb-12">
                                    <button onClick={prevTrack} className="text-text-secondary hover:text-accent transition">
                                        <SkipBack size={32} />
                                    </button>
                                    <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-text-light dark:bg-text-dark text-white dark:text-black flex items-center justify-center hover:scale-105 transition shadow-xl">
                                        {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-2" />}
                                    </button>
                                    <button onClick={nextTrack} className="text-text-secondary hover:text-accent transition">
                                        <SkipForward size={32} />
                                    </button>
                                    <button onClick={toggleLoop} className={cn("transition", isLooping ? "text-accent" : "text-text-secondary hover:text-text-light dark:hover:text-text-dark")}>
                                        <Repeat size={24} />
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    {currentTrack.spotifyUrl && (
                                        <a href={currentTrack.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-light dark:border-border-dark hover:border-accent transition text-sm">
                                            Listen on Spotify <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {currentTrack.youtubeUrl && (
                                        <a href={currentTrack.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-light dark:border-border-dark hover:border-accent transition text-sm">
                                            Watch on YouTube <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Bar Player */}
            <div className={cn(
                "fixed bottom-0 left-0 w-full z-50 bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-border-light dark:border-border-dark shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-transform duration-300",
                isMaximized ? "translate-y-full" : "translate-y-0"
            )}>
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-800 cursor-pointer group">
                    <div
                        className="h-full bg-accent relative group-hover:h-[4px] transition-all"
                        style={{ width: `${progress}%` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleSeek}
                        className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0 cursor-pointer"
                        aria-label="Seek track"
                    />
                </div>

                <div className="max-w-[2000px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-[45%] md:w-1/3 overflow-hidden cursor-pointer group" onClick={toggleMaximize}>
                        <motion.div layoutId="album-art" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center shrink-0 overflow-hidden relative">
                            {currentTrack.coverImage ? (
                                <Image src={currentTrack.coverImage} alt={currentTrack.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <Music size={18} className={isPlaying ? "text-accent animate-pulse" : "text-text-secondary"} />
                            )}
                        </motion.div>
                        <div className="hidden sm:block overflow-hidden">
                            <p className="text-sm font-bold truncate line-clamp-1 group-hover:text-accent transition-colors">{currentTrack.title}</p>
                            <p className="text-[10px] text-text-secondary truncate">{currentTrack.artist}</p>
                        </div>
                        <div className="sm:hidden overflow-hidden flex-1">
                            <p className="text-xs font-bold truncate">{currentTrack.title}</p>
                            <p className="text-[9px] text-text-secondary truncate">{currentTrack.artist}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 md:gap-4 w-auto md:w-1/3 shrink-0">
                        <button onClick={prevTrack} className="text-text-secondary hover:text-accent transition-colors" aria-label="Previous track">
                            <SkipBack size={18} className="md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-text-light dark:bg-text-dark text-white dark:text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={18} className="fill-current w-4 h-4 md:w-5 md:h-5" /> : <Play size={18} className="fill-current ml-1 w-4 h-4 md:w-5 md:h-5" />}
                        </button>
                        <button onClick={nextTrack} className="text-text-secondary hover:text-accent transition-colors" aria-label="Next track">
                            <SkipForward size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>

                    <div className="w-auto md:w-1/3 flex justify-end gap-3 md:gap-4 items-center">
                        <button onClick={toggleLoop} className={cn("hidden sm:block transition-colors", isLooping ? "text-accent" : "text-text-secondary hover:text-text-light dark:hover:text-text-dark")} title="Toggle Loop">
                            <Repeat size={16} />
                        </button>
                        <button onClick={toggleMaximize} className="text-text-secondary hover:text-text-light dark:hover:text-text-dark transition-colors" title="Expand Player">
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

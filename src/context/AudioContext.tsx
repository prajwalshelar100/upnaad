"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AudioTrack {
    id: string;
    title: string;
    artist: string;
    url: string;
    coverImage?: string;
    spotifyUrl?: string;
    youtubeUrl?: string;
}

interface AudioContextType {
    currentTrack: AudioTrack | null;
    playlist: AudioTrack[];
    isPlaying: boolean;
    isLooping: boolean;
    isMaximized: boolean;
    playTrack: (track: AudioTrack) => void;
    playPlaylist: (tracks: AudioTrack[], startIndex?: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleMaximize: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    setIsPlaying: (playing: boolean) => void;
    setIsMaximized: (maximized: boolean) => void;
    addToQueue: (track: AudioTrack) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
    const [playlist, setPlaylist] = useState<AudioTrack[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    // When current track changes, ensure it's playing
    useEffect(() => {
        if (currentTrack) {
            setIsPlaying(true);
        }
    }, [currentTrack]);

    const playTrack = (track: AudioTrack) => {
        setCurrentTrack(track);
        // If playing a single track not in playlist, maybe start a new playlist or just play it
        if (!playlist.find(t => t.id === track.id)) {
            setPlaylist([track]);
        }
    };

    const playPlaylist = (tracks: AudioTrack[], startIndex = 0) => {
        if (tracks.length === 0) return;
        setPlaylist(tracks);
        setCurrentTrack(tracks[startIndex]);
    };

    const togglePlay = () => {
        if (currentTrack) {
            setIsPlaying(!isPlaying);
        }
    };

    const toggleLoop = () => setIsLooping(!isLooping);

    const toggleMaximize = () => setIsMaximized(!isMaximized);

    const nextTrack = () => {
        if (playlist.length <= 1) return;
        const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentTrack(playlist[nextIndex]);
    };

    const prevTrack = () => {
        if (playlist.length <= 1) return;
        const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrack(playlist[prevIndex]);
    };

    const addToQueue = (track: AudioTrack) => {
        setPlaylist(prev => [...prev, track]);
        if (!currentTrack) {
            setCurrentTrack(track);
        }
    };

    return (
        <AudioContext.Provider value={{
            currentTrack,
            playlist,
            isPlaying,
            isLooping,
            isMaximized,
            playTrack,
            playPlaylist,
            togglePlay,
            toggleLoop,
            toggleMaximize,
            nextTrack,
            prevTrack,
            setIsPlaying,
            setIsMaximized,
            addToQueue
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}

"use client";

import { useAudio, AudioTrack } from '@/src/context/AudioContext';
import { Play } from 'lucide-react';

interface ListenButtonProps {
    track: AudioTrack;
    label?: string;
    playingLabel?: string;
    icon?: React.ReactNode;
}

export default function ListenButton({ track, label = "Listen while reading", playingLabel = "Playing...", icon }: ListenButtonProps) {
    const { playTrack, currentTrack, isPlaying, togglePlay, setIsMaximized } = useAudio();

    const isCurrentTrack = currentTrack?.id === track.id;

    const handleListen = () => {
        if (isCurrentTrack) {
            togglePlay();
        } else {
            playTrack(track);
        }
        setIsMaximized(true);
    };

    return (
        <button
            onClick={handleListen}
            className="flex items-center gap-2 bg-text-light dark:bg-text-dark text-white dark:text-black px-5 py-2.5 rounded-full hover:bg-accent dark:hover:bg-accent transition-colors font-bold text-sm"
        >
            {icon ? icon : <Play size={16} className="fill-current" />}
            <span>{isCurrentTrack && isPlaying ? playingLabel : label}</span>
        </button>
    );
}

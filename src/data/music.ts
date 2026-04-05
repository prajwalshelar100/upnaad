export interface MusicTrack {
  title: string;
  description: string;
  genre: string;
  category: string;
  spotifyUrl: string;
  youtubeUrl: string;
  audioUrl?: string;
  date?: string;
  theme?: string;
  meaning?: string;
  artworkUrlFallback?: string;
}

export const musicTracks: MusicTrack[] = [
  // Add your music tracks here
  // {
  //   title: "Sonic Silence",
  //   description: "A deep dive into the frequency of absolute stillness.",
  //   genre: "Ambient Sanskrit",
  //   category: "Meditation",
  //   spotifyUrl: "https://open.spotify.com/...",
  //   youtubeUrl: "https://youtube.com/...",
  //   date: "2026-04-05",
  // }
];

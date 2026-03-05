export interface MusicTrack {
  id: string;
  title: string;
  description: string;
  artwork: string;
  spotifyUrl: string;
  youtubeUrl: string;
  audioUrl?: string; // Optional for native playing if available
  date: string;
  genre: string;
  category: string;
  relatedResearchSlug?: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "1",
    title: "Identity Pulse",
    description: "A track inspired by the research on rhythmic identity.",
    artwork: "https://picsum.photos/seed/music1/400/400",
    spotifyUrl: "https://open.spotify.com/track/4cOdK2wGZWyRJBUNRJVNyp", // Changed from embed to direct link
    youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    date: "2024-03-02",
    genre: "Electronic",
    category: "Shabda Brama",
    relatedResearchSlug: "the-rhythm-of-identity"
  },
  {
    id: "2",
    title: "Concrete Reverberation",
    description: "Capturing the essence of urban soundscapes.",
    artwork: "https://picsum.photos/seed/music2/400/400",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZvYn2pUvPq9i",
    youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    date: "2024-02-18",
    genre: "Ambient",
    category: "Bhakti",
    relatedResearchSlug: "urban-sonics-and-society"
  }
];

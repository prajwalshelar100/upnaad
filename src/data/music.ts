export interface MusicTrack {
  id: string;
  title: string;
  description: string;
  artwork: string;
  spotifyUrl: string;
  date: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "1",
    title: "Identity Pulse",
    description: "A track inspired by the research on rhythmic identity.",
    artwork: "https://picsum.photos/seed/music1/400/400",
    spotifyUrl: "https://open.spotify.com/embed/track/4cOdK2wGZWyRJBUNRJVNyp",
    date: "2024-03-02"
  },
  {
    id: "2",
    title: "Concrete Reverberation",
    description: "Capturing the essence of urban soundscapes.",
    artwork: "https://picsum.photos/seed/music2/400/400",
    spotifyUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZvYn2pUvPq9i",
    date: "2024-02-18"
  }
];

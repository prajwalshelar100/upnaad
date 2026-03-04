export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  date: string;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "1",
    title: "Rhythm and the Brain",
    description: "A deep dive into the neuroscience of rhythm with Dr. Aris Kouris.",
    thumbnail: "https://picsum.photos/seed/podcast1/400/400",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "2024-03-05"
  },
  {
    id: "2",
    title: "The Future of Urban Sound",
    description: "Discussing the evolution of city soundscapes with urban planner Sarah Chen.",
    thumbnail: "https://picsum.photos/seed/podcast2/400/400",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    date: "2024-02-20"
  }
];

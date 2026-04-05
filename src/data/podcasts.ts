export interface PodcastEpisode {
  title: string;
  description: string;
  youtubeUrl: string;
  date: string;
  thumbnailUrlFallback?: string;
}

export const podcastEpisodes: PodcastEpisode[] = [
  // Add your podcast episodes here
];

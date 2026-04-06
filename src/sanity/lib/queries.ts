import { groq } from "next-sanity";

// Query for the homepage content
export const homeQuery = groq`*[_type == "home"][0]`;

// Query for the latest release
export const latestReleaseQuery = groq`*[_type == "release"] | order(date desc)[0]`;

// Query for all releases
export const allReleasesQuery = groq`*[_type == "release"] | order(date desc)`;

// Query for release by slug
export const releaseBySlugQuery = groq`*[_type == "release" && slug.current == $slug][0]`;

// Query for all music tracks
export const allMusicQuery = groq`*[_type == "music"] | order(date desc)`;

// Query for all podcasts
export const allPodcastQuery = groq`*[_type == "podcast"] | order(date desc)`;

// Query for all blogs
export const allBlogsQuery = groq`*[_type == "blog"] | order(date desc)`;

// Query for blog by slug
export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]`;

// Query for all services
export const allServicesQuery = groq`*[_type == "service"]`;

// Query for all topics
export const allTopicsQuery = groq`*[_type == "topic"] | order(upvotes desc, _createdAt desc)`;

// Query for all stories
export const allStoriesQuery = groq`*[_type == "story"] | order(date desc)`;

// Query for story by slug
export const storyBySlugQuery = groq`*[_type == "story" && slug.current == $slug][0]`;


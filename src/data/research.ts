export interface ResearchDrop {
  slug: string;
  title: string;
  thesis: string;
  content: string;
  coverImage: string;
  spotifyUrl: string;
  youtubeUrl: string;
  podcastUrl?: string;
  lyrics?: string;
  topics: string[];
  date: string;
  references?: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    link?: string;
  }[];
}

export const researchDrops: ResearchDrop[] = [
  {
    slug: "the-rhythm-of-identity",
    title: "The Rhythm of Identity: How Sound Shapes Self",
    thesis: "An exploration into the neurological and sociological impact of rhythmic patterns on individual and collective identity formation.",
    content: `
## Introduction
Identity is not a static construct but a fluid process, constantly negotiated through our environment. Among the most potent environmental factors is sound—specifically, rhythm.

## The Neurological Basis
Recent studies in neurobiology suggest that rhythmic entrainment—the process where brainwaves synchronize with external auditory pulses—plays a critical role in memory consolidation and self-referential processing. When we share a rhythm with others, our brain activity patterns mirror one another, fostering a sense of 'collective self'.

## Sociological Impact
In various cultures, rhythmic rituals serve as the backbone of social cohesion. From the complex polyrhythms of West Africa to the minimalist pulses of modern electronic music, rhythm acts as a non-verbal language that defines boundaries and builds bridges.

## Conclusion
By understanding the rhythm of identity, we can better appreciate the profound connection between the sounds we consume and the people we become.
    `,
    coverImage: "https://picsum.photos/seed/identity/1200/600",
    spotifyUrl: "https://open.spotify.com/embed/track/4cOdK2wGZWyRJBUNRJVNyp",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    podcastUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lyrics: "These are the default lyrics...\nMusic is the silence between the notes.\nCan you feel the rhythm?\nThe sound of identity forming.\n\n(Instrumental break)\n\nWe are the echoes of the bass.\nLost in the frequency.\nFound in the resonance.\nUpnaad Sound.",
    topics: ["Psychology", "Identity", "Culture"],
    date: "2024-03-01",
    references: [
      {
        title: "Brain synchronization during cooperative performance",
        authors: "Lindenberger, U., Li, S. C., Gruber, W., & Müller, V.",
        journal: "BMC Neuroscience",
        year: 2009,
        link: "https://doi.org/10.1186/1471-2202-10-121"
      },
      {
        title: "The power of music: pioneer exploration of the neurobiology of rhythm",
        authors: "Thaut, M. H.",
        journal: "Frontiers in Neuroscience",
        year: 2013,
      }
    ]
  },
  {
    slug: "urban-sonics-and-society",
    title: "Urban Sonics: The Architecture of City Soundscapes",
    thesis: "How urban planning and architectural design influence the social fabric through the management of noise and acoustic environments.",
    content: `
## The City as an Instrument
Every city has a unique acoustic signature. The reverberation of a subway tunnel, the hum of high-voltage lines, and the cacophony of street markets all contribute to what we call 'Urban Sonics'.

## Acoustic Inequality
Research shows that lower-income neighborhoods often suffer from higher levels of 'acoustic pollution', which has direct links to chronic stress and reduced cognitive performance in children. Urban planning must move beyond visual aesthetics and consider the 'aural health' of its citizens.

## Designing for Silence
Modern architecture is beginning to incorporate 'acoustic sanctuaries'—spaces designed specifically to provide respite from the relentless noise of the city. These spaces are not just luxuries; they are essential for mental well-being in an increasingly crowded world.
    `,
    coverImage: "https://picsum.photos/seed/urban/1200/600",
    spotifyUrl: "https://open.spotify.com/embed/track/0VjIjW4GlUZvYn2pUvPq9i",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    podcastUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lyrics: "Concrete jungle, echoes in the night\nSirens wailing under streetlights bright\nThe city has a heartbeat, the city has a soul\nLost in the rhythm, taking its toll.",
    topics: ["Society", "Technology", "Culture"],
    date: "2024-02-15"
  }
];

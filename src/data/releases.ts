export interface ResearchRelease {
  title: string;
  thesis: string;
  content: string; // Markdown
  date: string;
  lyrics?: string;
  sanskritText?: string;
  transliteration?: string;
  simpleMeaning?: string;
  deepInterpretation?: string;
  philosophicalExplanation?: string;
  whyItMatters?: string;
  topics: string[];
  coverImageUrlFallback?: string;
}

export const researchReleases: ResearchRelease[] = [
  // Add your research releases here
];

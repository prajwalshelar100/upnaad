export interface BlogArticle {
  title: string;
  date: string;
  excerpt: string;
  content: string; // Markdown
  categories: string[];
  coverImageUrlFallback?: string;
}

export const blogArticles: BlogArticle[] = [
  // Add your blog articles here
];

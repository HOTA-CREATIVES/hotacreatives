// Blog module interfaces & types

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  role: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // accent color for category tag
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "image"
    | "quote"
    | "code"
    | "callout"
    | "video"
    | "list";
  content: string;
  /** For headings */
  level?: 2 | 3;
  id?: string;
  /** For images */
  src?: string;
  alt?: string;
  caption?: string;
  /** For code blocks */
  language?: string;
  /** For callouts */
  calloutType?: "info" | "warning" | "tip" | "note";
  /** For videos */
  videoUrl?: string;
  /** For lists */
  items?: string[];
  ordered?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  category: BlogCategory;
  tags: BlogTag[];
  author: BlogAuthor;
  publishDate: string; // ISO date string
  updatedDate?: string;
  readTime: number; // minutes
  featured: boolean;
  content: BlogContentBlock[];
  relatedPostIds: string[];
}

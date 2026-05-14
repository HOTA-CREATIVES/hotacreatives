// Application route definitions
// Centralized routing configuration for maintainability.

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  PACKAGES: "/packages",
  PORTFOLIO: "/portfolio",
  BLOG: "/blog",
  BLOG_ARTICLE: "/blog/:slug",
  BLOG_AUTHOR: "/blog/author/:slug",
  BLOG_CATEGORY: "/blog/category/:slug",
  CONTACT: "/contact",
  FREE_AUDIT: "/free-audit",
  NOT_FOUND: "*",
} as const;

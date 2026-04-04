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
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_BLOGS: "/admin/blogs",
  ADMIN_BLOG_CREATE: "/admin/blogs/new",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_USERS: "/admin/users",
  CONTACT: "/contact",
  FREE_AUDIT: "/free-audit",
  NOT_FOUND: "*",
} as const;

// Barrel export for services
// Services handle external communication (API calls, third-party integrations).
// Each service should follow Interface Segregation & Dependency Inversion principles.
// Example: export { AuthService } from './auth.service';

export {
  getPublishedBlogPosts,
  getFeaturedBlogPost,
  getBlogPostBySlugFromDb,
  getRelatedPostsFromDb,
  getBlogCategoriesFromDb,
  getBlogAuthorBySlugFromDb,
  getPostsByAuthorSlugFromDb,
  getPostsByCategorySlugFromDb,
  getBlogPostsForAdmin,
  getBlogAuthorsForAdmin,
  getBlogCategoriesForAdmin,
  getBlogTagsForAdmin,
  createBlogPostFromAdmin,
  updateBlogPostFromAdmin,
  deleteBlogPostFromAdmin,
  createBlogAuthorFromAdmin,
  updateBlogAuthorFromAdmin,
  deleteBlogAuthorFromAdmin,
  createBlogCategoryFromAdmin,
  updateBlogCategoryFromAdmin,
  deleteBlogCategoryFromAdmin,
  createBlogTagFromAdmin,
  updateBlogTagFromAdmin,
  deleteBlogTagFromAdmin,
} from "./blog.service";

export {
  uploadProfileImageToCloudinary,
  uploadBlogImageToCloudinary,
} from "./cloudinary.service";

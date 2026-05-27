import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogSEO from "@/components/blog/BlogSEO";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import { useInView } from "@/hooks/useInView";
import {
  getBlogCategoriesFromDb,
  getPublishedBlogPosts,
  getFeaturedBlogPost,
} from "@/services";
import type { BlogPost, BlogCategory } from "@/types";

export default function BlogListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || null;
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPublishedBlogPosts(),
          getBlogCategoriesFromDb(),
        ]);

        if (!isMounted) return;
        setPosts(postsData);
        setCategories(categoriesData);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch featured post separately to ensure fallback is used when DB has no featured flag
  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const fp = await getFeaturedBlogPost();
        if (!isMounted) return;
        setFeaturedPost(fp);
      } catch {
        if (isMounted) setFeaturedPost(null);
      }
    }

    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    let result = categoryParam
      ? posts.filter((post) => post.category.slug === categoryParam)
      : [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(q)) ||
          post.category.name.toLowerCase().includes(q),
      );
    }

    // Don't show featured post in grid if hero is displayed
    if (!categoryParam && !searchQuery.trim() && featuredPost) {
      result = result.filter((p) => p.id !== featuredPost.id);
    }

    return result;
  }, [categoryParam, searchQuery, featuredPost, posts]);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const { ref: heroRef } = useInView({ threshold: 0.1 });
  const { ref: filterRef, inView: filterInView } = useInView({
    threshold: 0.1,
  });
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05 });

  const showFeaturedHero =
    featuredPost && !categoryParam && !searchQuery.trim();

  return (
    <>
      <BlogSEO
        pageTitle="Blog"
        pageDescription="Insights on branding, marketing, and growth from HOTA — India's creative growth agency."
        canonicalPath="/blog"
      />

      <section className="min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary mb-4">
              The Growth <span className="text-accent">Journal</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Insights, strategies, and stories on branding, marketing, and
              building brands that dominate — not just exist.
            </p>
          </div>

          {/* Featured Hero Article */}
          {showFeaturedHero && featuredPost && (
            <div ref={heroRef} className="mb-16">
              <BlogCard post={featuredPost} variant="hero" />
            </div>
          )}

          {/* Filters & Search */}
          <div
            ref={filterRef}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 transition-all duration-700 delay-100 ${
              filterInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <BlogCategoryFilter
              categories={categories}
              activeCategory={categoryParam}
              onSelect={handleCategorySelect}
            />
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Articles Grid */}
          <div
            ref={gridRef}
            className={`transition-all duration-700 delay-200 ${
              gridInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">Loading articles...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  className="mt-4 text-accent hover:underline text-sm font-semibold cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20">
            <NewsletterCTA variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}

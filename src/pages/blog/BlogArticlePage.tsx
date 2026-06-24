import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBioCard from "@/components/blog/AuthorBioCard";
import BlogArticleContent from "@/components/blog/BlogArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import ShareBar from "@/components/blog/ShareBar";
import BlogSEO from "@/components/blog/BlogSEO";
import BlogWorkWithUsCTA from "@/components/blog/BlogWorkWithUsCTA";
import type { BlogHeading } from "@/types/blog.interfaces";
import type { BlogPost } from "@/types/blog.interfaces";
import { getBlogPostBySlugFromDb, getRelatedPostsFromDb } from "@/services";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [showNewsletterSlide, setShowNewsletterSlide] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadArticle() {
      if (!slug) {
        if (isMounted) {
          setPost(null);
          setRelatedPosts([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const postData = await getBlogPostBySlugFromDb(slug);

      if (!isMounted) return;

      if (!postData) {
        setPost(null);
        setRelatedPosts([]);
        setIsLoading(false);
        return;
      }

      setPost(postData);
      const related = await getRelatedPostsFromDb(postData);
      if (!isMounted) return;
      setRelatedPosts(related);
      setIsLoading(false);
    }

    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const headings: BlogHeading[] = useMemo(() => {
    if (!post) return [];
    return post.content
      .filter(
        (b) => b.type === "heading" && b.id && (b.level === 2 || b.level === 3),
      )
      .map((b) => ({
        id: b.id!,
        text: b.content,
        level: b.level!,
      }));
  }, [post]);

  // Show newsletter CTA at 60% scroll
  useEffect(() => {
    let shown = false;
    const handleScroll = () => {
      if (shown) return;
      const pct =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.6) {
        setShowNewsletterSlide(true);
        shown = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Loading article...
        </h1>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Article not found
        </h1>
        <Link to="/blog" className="text-accent hover:underline font-semibold">
          ← Back to blog
        </Link>
      </section>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <BlogSEO post={post} canonicalPath={`/blog/${post.slug}`} />
      <ShareBar
        title={post.title}
        url={`/blog/${post.slug}`}
        variant="floating"
      />

      <article className="min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-6"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            Back to blog
          </Link>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto text-center mb-10">
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: post.category.color + "20",
                color: post.category.color,
              }}
            >
              {post.category.name}
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-center gap-4">
              <Link to={`/blog/author/${post.author.slug}`}>
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border hover:ring-accent transition-all duration-300"
                />
              </Link>
              <div className="text-left">
                <Link
                  to={`/blog/author/${post.author.slug}`}
                  className="text-sm font-semibold text-text-primary hover:text-accent transition-colors duration-200"
                >
                  {post.author.name}
                </Link>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-regular fa-calendar text-[10px]"></i>
                    {formatDate(post.publishDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-regular fa-clock text-[10px]"></i>
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              className="w-full rounded-2xl object-cover"
              style={{ aspectRatio: "2 / 1" }}
            />
          </div>

          {/* Mobile share bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <ShareBar
              title={post.title}
              url={`/blog/${post.slug}`}
              variant="inline"
            />
          </div>

          {/* Content Layout: Article + Sidebar TOC */}
          <div className="max-w-7xl mx-auto flex gap-12">
            {/* Main content */}
            <div className="max-w-3xl mx-auto flex-1 min-w-0">
              <BlogArticleContent content={post.content} />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-muted font-semibold uppercase tracking-wider mr-2">
                    Tags
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs text-text-secondary border border-border px-3 py-1 rounded-full hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Newsletter Inline CTA */}
              <NewsletterCTA variant="inline" />

              {/* Author Bio */}
              <div className="mt-12">
                <AuthorBioCard author={post.author} />
              </div>

              {/* Work With Us CTA */}
              <BlogWorkWithUsCTA />

              {/* Related Articles */}
              <RelatedArticles posts={relatedPosts} />
            </div>

            {/* Sidebar TOC (desktop only) */}
            {headings.length > 0 && (
              <aside className="hidden xl:block w-64 shrink-0">
                <div className="sticky top-32">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Slide-in newsletter */}
      {showNewsletterSlide && (
        <div className="lg:hidden">
          <NewsletterCTA variant="slide" />
        </div>
      )}
    </>
  );
}

import { Link } from "react-router-dom";
import type { BlogPost } from "@/types/blog.interfaces";
import { useEffect } from "react";

interface BlogSEOProps {
  post?: BlogPost;
  pageTitle?: string;
  pageDescription?: string;
  canonicalPath?: string;
}

/**
 * Sets document head meta + JSON-LD structured data for blog pages.
 */
export default function BlogSEO({
  post,
  pageTitle,
  pageDescription,
  canonicalPath,
}: BlogSEOProps) {
  useEffect(() => {
    const siteUrl = "https://hotacreatives.in";

    // Title
    const title = post
      ? `${post.title} | HOTA Blog`
      : pageTitle
        ? `${pageTitle} | HOTA Blog`
        : "Blog | HOTA - Creative Growth Agency";
    document.title = title;

    const description =
      post?.metaDescription ||
      pageDescription ||
      "Insights on branding, marketing, and growth from HOTA — India's creative growth agency.";

    // Meta tags
    const metaTags: Record<string, string> = {
      description: description,
      "og:title": title,
      "og:description": description,
      "og:type": post ? "article" : "website",
      "og:url": `${siteUrl}${canonicalPath || "/blog"}`,
      "og:image": post?.coverImage || `${siteUrl}/hota-logo.png`,
      "og:site_name": "HOTA",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": post?.coverImage || `${siteUrl}/hota-logo.png`,
    };

    Object.entries(metaTags).forEach(([key, value]) => {
      const isOg = key.startsWith("og:") || key.startsWith("twitter:");
      const selector = isOg ? `meta[property="${key}"]` : `meta[name="${key}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (isOg) el.setAttribute("property", key);
        else el.setAttribute("name", key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    });

    // Canonical
    let canonicalEl = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", `${siteUrl}${canonicalPath || "/blog"}`);

    // JSON-LD structured data
    const existingLd = document.querySelector("script[data-blog-jsonld]");
    if (existingLd) existingLd.remove();

    if (post) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: post.coverImage,
        datePublished: post.publishDate,
        dateModified: post.updatedDate || post.publishDate,
        author: {
          "@type": "Person",
          name: post.author.name,
          url: `${siteUrl}/blog/author/${post.author.slug}`,
        },
        publisher: {
          "@type": "Organization",
          name: "HOTA",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/hota-logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/blog/${post.slug}`,
        },
        wordCount: post.content
          .filter((b) => b.type === "paragraph")
          .reduce((acc, b) => acc + b.content.split(" ").length, 0),
        articleSection: post.category.name,
        keywords: post.tags.map((t) => t.name).join(", "),
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-blog-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup
    return () => {
      const ld = document.querySelector("script[data-blog-jsonld]");
      if (ld) ld.remove();
    };
  }, [post, pageTitle, pageDescription, canonicalPath]);

  // Also render breadcrumbs
  return post ? (
    <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
      <Link to="/" className="hover:text-accent transition-colors duration-200">
        Home
      </Link>
      <span>/</span>
      <Link
        to="/blog"
        className="hover:text-accent transition-colors duration-200"
      >
        Blog
      </Link>
      <span>/</span>
      <Link
        to={`/blog/category/${post.category.slug}`}
        className="hover:text-accent transition-colors duration-200"
      >
        {post.category.name}
      </Link>
      <span>/</span>
      <span className="text-text-secondary truncate max-w-[200px]">
        {post.title}
      </span>
    </nav>
  ) : null;
}

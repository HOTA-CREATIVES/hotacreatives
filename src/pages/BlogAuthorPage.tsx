import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BlogSEO from "@/components/blog/BlogSEO";
import {
  getBlogAuthorBySlugFromDb,
  getPostsByAuthorSlugFromDb,
} from "@/services";
import type { BlogAuthor, BlogPost } from "@/interfaces";

export default function BlogAuthorPage() {
  const { slug } = useParams<{ slug: string }>();
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!slug) {
        if (isMounted) {
          setAuthor(null);
          setPosts([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const [authorData, authorPosts] = await Promise.all([
        getBlogAuthorBySlugFromDb(slug),
        getPostsByAuthorSlugFromDb(slug),
      ]);

      if (!isMounted) return;
      setAuthor(authorData);
      setPosts(authorPosts);
      setIsLoading(false);
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Loading author...
        </h1>
      </section>
    );
  }

  if (!author) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Author not found
        </h1>
        <Link to="/blog" className="text-accent hover:underline font-semibold">
          ← Back to blog
        </Link>
      </section>
    );
  }

  return (
    <>
      <BlogSEO
        pageTitle={`${author.name} — Author`}
        pageDescription={author.bio}
        canonicalPath={`/blog/author/${author.slug}`}
      />

      <section className="min-h-screen pt-8 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-10"
          >
            ← Back to blog
          </Link>

          {/* Author profile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-16">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-accent/20"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-black text-text-primary mb-1">
                {author.name}
              </h1>
              <p className="text-accent font-semibold mb-3">{author.role}</p>
              <p className="text-text-secondary max-w-xl leading-relaxed mb-4">
                {author.bio}
              </p>
              {author.socialLinks && (
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  {author.socialLinks.linkedin && (
                    <a
                      href={author.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {author.socialLinks.twitter && (
                    <a
                      href={author.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors duration-300"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {author.socialLinks.instagram && (
                    <a
                      href={author.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {author.socialLinks.website && (
                    <a
                      href={author.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors duration-300"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Posts */}
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Articles by {author.name}{" "}
            <span className="text-text-muted font-normal">
              ({posts.length})
            </span>
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              No articles published yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

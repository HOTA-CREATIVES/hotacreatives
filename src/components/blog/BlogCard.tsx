import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/interfaces/blog.interfaces";

interface BlogCardProps {
  post: BlogPost;
  /** Display as a large hero card */
  variant?: "default" | "hero";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const isHero = variant === "hero";

  if (isHero) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group block relative overflow-hidden rounded-2xl border border-border bg-bg-card hover:border-border-hover transition-all duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div
            className="relative lg:aspect-auto overflow-hidden"
            style={{ aspectRatio: "16 / 10" }}
          >
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/20" />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{
                  backgroundColor: post.category.color + "20",
                  color: post.category.color,
                }}
              >
                {post.category.name}
              </span>
              <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                Featured
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black leading-tight text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-text-secondary text-base leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {post.author.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(post.publishDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-500"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16 / 10" }}
      >
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <span
          className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: post.category.color + "20",
            color: post.category.color,
          }}
        >
          {post.category.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold leading-snug text-text-primary mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-border"
          />
          <div>
            <p className="text-xs font-semibold text-text-primary">
              {post.author.name}
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

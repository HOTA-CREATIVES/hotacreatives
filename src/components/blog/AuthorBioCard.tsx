import { Link } from "react-router-dom";
import { Linkedin, Twitter, Globe, Instagram } from "lucide-react";
import type { BlogAuthor } from "@/interfaces/blog.interfaces";

interface AuthorBioCardProps {
  author: BlogAuthor;
}

export default function AuthorBioCard({ author }: AuthorBioCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 bg-bg-card rounded-2xl border border-border">
      <Link to={`/blog/author/${author.slug}`} className="shrink-0">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-accent/30 hover:ring-accent transition-all duration-300"
        />
      </Link>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
          Written by
        </p>
        <Link
          to={`/blog/author/${author.slug}`}
          className="text-xl font-bold text-text-primary hover:text-accent transition-colors duration-300"
        >
          {author.name}
        </Link>
        <p className="text-sm text-accent font-medium mt-0.5">{author.role}</p>
        <p className="text-sm text-text-secondary leading-relaxed mt-2">
          {author.bio}
        </p>

        {author.socialLinks && (
          <div className="flex items-center gap-3 mt-4">
            {author.socialLinks.linkedin && (
              <a
                href={author.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors duration-300"
                aria-label={`${author.name} on LinkedIn`}
              >
                <Linkedin size={18} />
              </a>
            )}
            {author.socialLinks.twitter && (
              <a
                href={author.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors duration-300"
                aria-label={`${author.name} on Twitter`}
              >
                <Twitter size={18} />
              </a>
            )}
            {author.socialLinks.instagram && (
              <a
                href={author.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors duration-300"
                aria-label={`${author.name} on Instagram`}
              >
                <Instagram size={18} />
              </a>
            )}
            {author.socialLinks.website && (
              <a
                href={author.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors duration-300"
                aria-label={`${author.name}'s website`}
              >
                <Globe size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

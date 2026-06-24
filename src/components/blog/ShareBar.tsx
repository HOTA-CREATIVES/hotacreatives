import { useState } from "react";

interface ShareBarProps {
  title: string;
  url: string;
  variant?: "floating" | "inline";
}

export default function ShareBar({
  title,
  url,
  variant = "floating",
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined" ? window.location.origin + url : url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      iconClass: "fa-brands fa-x-twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      iconClass: "fa-brands fa-linkedin-in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      iconClass: "fa-brands fa-facebook-f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  if (variant === "floating") {
    return (
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
            className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-300 text-sm"
          >
            <i className={link.iconClass}></i>
          </a>
        ))}
        <button
          onClick={handleCopy}
          title="Copy link"
          className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer text-sm"
        >
          <i className="fa-solid fa-link"></i>
        </button>
        {copied && (
          <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-xs text-accent font-medium whitespace-nowrap">
            Copied!
          </span>
        )}
      </div>
    );
  }

  // Inline variant (for mobile)
  return (
    <div className="flex items-center gap-3 lg:hidden">
      <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">
        Share
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${link.name}`}
          className="w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-300 text-xs"
        >
          <i className={link.iconClass}></i>
        </a>
      ))}
      <button
        onClick={handleCopy}
        title="Copy link"
        className="w-9 h-9 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer text-xs"
      >
        <i className="fa-solid fa-link"></i>
      </button>
      {copied && (
        <span className="text-xs text-accent font-medium">Copied!</span>
      )}
    </div>
  );
}

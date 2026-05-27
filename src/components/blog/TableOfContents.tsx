import { useEffect, useState, useCallback } from "react";
import type { BlogHeading } from "@/types/blog.interfaces";

interface TableOfContentsProps {
  headings: BlogHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const handleScroll = useCallback(() => {
    const offsets = headings
      .map((h) => {
        const el = document.getElementById(h.id);
        return el ? { id: h.id, top: el.getBoundingClientRect().top } : null;
      })
      .filter(Boolean) as { id: string; top: number }[];

    // Find the heading closest to the top but still visible
    let current = "";
    for (const item of offsets) {
      if (item.top <= 120) {
        current = item.id;
      }
    }
    if (!current && offsets.length > 0) {
      current = offsets[0].id;
    }
    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => {
      handleScroll();
    }, 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
        On This Page
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className={`block text-sm py-1 transition-all duration-200 border-l-2 ${
            heading.level === 3 ? "pl-6" : "pl-4"
          } ${
            activeId === heading.id
              ? "border-accent text-accent font-medium"
              : "border-transparent text-text-muted hover:text-text-secondary hover:border-border-hover"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

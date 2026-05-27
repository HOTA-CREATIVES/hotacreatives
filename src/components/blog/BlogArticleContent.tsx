import { Info, AlertTriangle, Lightbulb, StickyNote } from "lucide-react";
import type { BlogContentBlock } from "@/types/blog.interfaces";

interface BlogArticleContentProps {
  content: BlogContentBlock[];
}

const calloutConfig = {
  info: {
    icon: <Info size={20} />,
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-500/5",
    iconColor: "text-amber-400",
  },
  tip: {
    icon: <Lightbulb size={20} />,
    borderColor: "border-green-500/50",
    bgColor: "bg-green-500/5",
    iconColor: "text-green-400",
  },
  note: {
    icon: <StickyNote size={20} />,
    borderColor: "border-purple-500/50",
    bgColor: "bg-purple-500/5",
    iconColor: "text-purple-400",
  },
};

export default function BlogArticleContent({
  content,
}: BlogArticleContentProps) {
  return (
    <div className="blog-content">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-text-secondary text-[17px] leading-[1.8] mb-6"
              >
                {block.content}
              </p>
            );

          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={index}
                id={block.id}
                className={`font-bold text-text-primary scroll-mt-28 ${
                  block.level === 2
                    ? "text-2xl mt-12 mb-4"
                    : "text-xl mt-8 mb-3"
                }`}
              >
                {block.content}
              </Tag>
            );
          }

          case "image":
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  loading="lazy"
                  className="w-full rounded-xl"
                />
                {block.caption && (
                  <figcaption className="text-sm text-text-muted text-center mt-3 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-8 pl-6 border-l-4 border-accent py-2"
              >
                <p className="text-lg text-text-primary italic font-medium leading-relaxed">
                  "{block.content}"
                </p>
              </blockquote>
            );

          case "code":
            return (
              <div key={index} className="my-8 rounded-xl overflow-hidden">
                {block.language && (
                  <div className="bg-bg-secondary px-4 py-2 border border-border border-b-0 rounded-t-xl">
                    <span className="text-xs text-text-muted font-mono uppercase">
                      {block.language}
                    </span>
                  </div>
                )}
                <pre
                  className={`bg-bg-card border border-border p-5 overflow-x-auto ${
                    block.language ? "rounded-b-xl" : "rounded-xl"
                  }`}
                >
                  <code className="text-sm font-mono text-text-secondary leading-relaxed whitespace-pre">
                    {block.content}
                  </code>
                </pre>
              </div>
            );

          case "callout": {
            const config = calloutConfig[block.calloutType || "info"];
            return (
              <div
                key={index}
                className={`my-8 p-5 rounded-xl border-l-4 ${config.borderColor} ${config.bgColor} flex gap-4`}
              >
                <span className={`${config.iconColor} mt-0.5 shrink-0`}>
                  {config.icon}
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {block.content}
                </p>
              </div>
            );
          }

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`my-6 space-y-2 pl-6 ${
                  block.ordered ? "list-decimal" : "list-disc"
                } marker:text-accent`}
              >
                {block.items?.map((item, i) => (
                  <li
                    key={i}
                    className="text-text-secondary text-[17px] leading-[1.8] pl-1"
                  >
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }

          case "video":
            return (
              <div
                key={index}
                className="my-8 aspect-video rounded-xl overflow-hidden"
              >
                <iframe
                  src={block.videoUrl}
                  title="Embedded video"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

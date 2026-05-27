import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}


const defaultSEO = {
  title: "HOTA — India's Creative Growth Agency",
  description:
    "HOTA is India's creative growth agency. We position brands with strategic social media management, content creation, performance marketing, and brand design. Packages from ₹50,000/month.",
  keywords:
    "creative agency India, social media agency Mumbai, brand growth agency, performance marketing India, digital marketing India",
  ogImage: "https://hotacreatives.in/hota-logo.png",
  ogType: "website",
  siteUrl: "https://hotacreatives.in",
};

export function useSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | HOTA - Creative Growth Agency`
      : defaultSEO.title;
    document.title = pageTitle;

    const metaTags = [
      { name: "title", content: pageTitle },
      { name: "description", content: description || defaultSEO.description },
      { name: "keywords", content: keywords || defaultSEO.keywords },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonicalUrl || defaultSEO.siteUrl },
      { property: "og:title", content: pageTitle },
      {
        property: "og:description",
        content: description || defaultSEO.description,
      },
      { property: "og:image", content: ogImage || defaultSEO.ogImage },
      { property: "og:site_name", content: "HOTA" },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:url", content: canonicalUrl || defaultSEO.siteUrl },
      { property: "twitter:title", content: pageTitle },
      {
        property: "twitter:description",
        content: description || defaultSEO.description,
      },
      { property: "twitter:image", content: ogImage || defaultSEO.ogImage },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      { name: "revisit-after", content: "7 days" },
      { name: "author", content: "hotacreatives@gmail.com" },
    ];

    metaTags.forEach((tag) => {
      let el;
      if (tag.name) {
        el = document.querySelector(`meta[name='${tag.name}']`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("name", tag.name);
          document.head.appendChild(el);
        }
        el.setAttribute("content", tag.content);
      } else if (tag.property) {
        el = document.querySelector(`meta[property='${tag.property}']`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("property", tag.property);
          document.head.appendChild(el);
        }
        el.setAttribute("content", tag.content);
      }
    });

    // Canonical
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl || defaultSEO.siteUrl);
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);
}

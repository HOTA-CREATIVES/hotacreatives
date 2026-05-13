// Blog module constants — authors, categories, tags, and sample posts
import type {
  BlogAuthor,
  BlogCategory,
  BlogTag,
  BlogPost,
} from "@/interfaces/blog.interfaces";

// ── Authors ─────────────────────────────────────────────────────────────
export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    id: "author-1",
    name: "Chinni Suryan",
    slug: "chinni-suryan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    photoURL:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    role: "Founder of HOTA",
    bio: "Chinni is the founder of HOTA, a creative growth agency focused on positioning brands for dominance.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/chinnisuryan",
      instagram: "https://www.instagram.com/hota.creatives",
    },
  },
];

// ── Categories ──────────────────────────────────────────────────────────
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-1",
    name: "Brand Strategy",
    slug: "brand-strategy",
    description:
      "Insights on building and positioning your brand for long-term growth.",
    color: "#f4c20d",
  },
  {
    id: "cat-2",
    name: "Social Media",
    slug: "social-media",
    description:
      "Tips, trends, and strategies for winning on social platforms.",
    color: "#4ade80",
  },
  {
    id: "cat-3",
    name: "Performance Marketing",
    slug: "performance-marketing",
    description:
      "Data-driven marketing strategies for measurable business growth.",
    color: "#60a5fa",
  },
  {
    id: "cat-4",
    name: "Design & Creative",
    slug: "design-creative",
    description:
      "Creative design thinking, visual identity, and aesthetic trends.",
    color: "#c084fc",
  },
  {
    id: "cat-5",
    name: "Industry Insights",
    slug: "industry-insights",
    description:
      "Analysis of market trends, case studies, and industry developments.",
    color: "#fb923c",
  },
];

// ── Tags ────────────────────────────────────────────────────────────────
export const BLOG_TAGS: BlogTag[] = [
  { id: "tag-1", name: "SEO", slug: "seo" },
  { id: "tag-2", name: "Content Marketing", slug: "content-marketing" },
  { id: "tag-3", name: "Branding", slug: "branding" },
  { id: "tag-4", name: "Instagram", slug: "instagram" },
  { id: "tag-5", name: "Ads", slug: "ads" },
  { id: "tag-6", name: "Case Study", slug: "case-study" },
  { id: "tag-7", name: "UI/UX", slug: "ui-ux" },
  { id: "tag-8", name: "Video", slug: "video" },
  { id: "tag-9", name: "Analytics", slug: "analytics" },
  { id: "tag-10", name: "Startup", slug: "startup" },
];

// ── Blog Posts ──────────────────────────────────────────────────────────
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Why Most Indian Brands Fail at Social Media (And How to Fix It)",
    slug: "why-indian-brands-fail-social-media",
    metaDescription:
      "Discover the top reasons Indian brands struggle on social media and learn actionable strategies to transform your digital presence and engagement.",
    excerpt:
      "90% of Indian brands treat social media as a loudspeaker. Here's why that doesn't work — and what the top 10% do differently.",
    coverImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop",
    coverImageAlt: "Social media strategy planning on a digital screen",
    category: BLOG_CATEGORIES[1],
    tags: [BLOG_TAGS[3], BLOG_TAGS[1], BLOG_TAGS[2]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-02-15T10:00:00Z",
    readTime: 8,
    featured: true,
    relatedPostIds: ["post-2", "post-4", "post-6"],
    content: [
      {
        type: "paragraph",
        content:
          "Let's start with a hard truth: most Indian brands are wasting their social media budget. They're posting daily, running contests, chasing followers — and getting absolutely nowhere. The engagement is dead, the reach is shrinking, and the ROI is a mystery.",
      },
      {
        type: "heading",
        level: 2,
        id: "the-loudspeaker-problem",
        content: "The Loudspeaker Problem",
      },
      {
        type: "paragraph",
        content:
          "The biggest mistake brands make is treating social media as a one-way broadcasting channel. They push out promotional content, product photos, and generic festival greetings without any thought for what the audience actually wants to consume.",
      },
      {
        type: "callout",
        calloutType: "tip",
        content:
          "Social media is a conversation, not a billboard. The brands winning are the ones creating content people actually want to share with their friends.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-top-brands-do-differently",
        content: "What the Top 10% Do Differently",
      },
      {
        type: "paragraph",
        content:
          "The best-performing Indian brands on social media follow a simple framework: they educate, entertain, or inspire — and they do it consistently. They understand their audience deeply, create content that resonates emotionally, and build genuine community.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "They invest in audience research before creating content",
          "They have a clear brand voice and stick to it",
          "They prioritize engagement rate over follower count",
          "They create platform-native content (not the same post everywhere)",
          "They measure what matters and iterate weekly",
        ],
        content: "",
      },
      {
        type: "heading",
        level: 2,
        id: "the-content-framework",
        content: "The 3E Content Framework",
      },
      {
        type: "paragraph",
        content:
          "At HOTA, we use the 3E framework for every brand we work with: Educate, Entertain, Empower. Every piece of content must fall into at least one of these categories. If it doesn't, it doesn't get published.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop",
        alt: "Content strategy framework visualization",
        caption:
          "The 3E Content Framework: Educate, Entertain, Empower — the foundation of every successful social strategy.",
        content: "",
      },
      {
        type: "heading",
        level: 3,
        id: "educate",
        content: "Educate",
      },
      {
        type: "paragraph",
        content:
          "Share industry knowledge, tips, and how-tos that position your brand as an authority. This builds trust and keeps your audience coming back for more.",
      },
      {
        type: "heading",
        level: 3,
        id: "entertain",
        content: "Entertain",
      },
      {
        type: "paragraph",
        content:
          "Create content that people enjoy consuming — memes, relatable stories, behind-the-scenes peeks. Entertainment content drives shares and expands reach organically.",
      },
      {
        type: "heading",
        level: 3,
        id: "empower",
        content: "Empower",
      },
      {
        type: "paragraph",
        content:
          "Inspire your audience to take action. Share success stories, testimonials, and transformative insights that make people feel capable of achieving more.",
      },
      {
        type: "heading",
        level: 2,
        id: "fixing-your-strategy",
        content: "How to Fix Your Strategy Starting Today",
      },
      {
        type: "paragraph",
        content:
          "You don't need a complete overhaul. Start with an audit of your last 30 posts. Categorize each using the 3E framework. If more than 50% of your content is purely promotional, you've found the problem.",
      },
      {
        type: "quote",
        content:
          "The brands that win on social media aren't the loudest — they're the most relevant. Stop broadcasting. Start connecting.",
      },
      {
        type: "paragraph",
        content:
          "The shift from broadcasting to building community is what separates brands that grow from brands that plateau. Make it your mission to understand your audience so deeply that your content feels like it was made specifically for them — because it should be.",
      },
    ],
  },
  {
    id: "post-2",
    title: "The Complete Guide to Brand Positioning in 2026",
    slug: "complete-guide-brand-positioning-2026",
    metaDescription:
      "Master brand positioning in 2026 with this comprehensive guide covering strategy, differentiation, and real-world examples from Indian markets.",
    excerpt:
      "Brand positioning isn't a logo or a tagline — it's the strategic foundation that determines whether your business thrives or becomes invisible.",
    coverImage:
      "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=630&fit=crop",
    coverImageAlt:
      "Brand strategy workspace with mood boards and color palettes",
    category: BLOG_CATEGORIES[0],
    tags: [BLOG_TAGS[2], BLOG_TAGS[1], BLOG_TAGS[9]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-02-08T10:00:00Z",
    readTime: 12,
    featured: false,
    relatedPostIds: ["post-1", "post-3", "post-5"],
    content: [
      {
        type: "paragraph",
        content:
          "In a market as crowded and competitive as India's, brand positioning is no longer optional — it's survival. Whether you're a D2C startup or an established enterprise, how you position your brand determines everything: who buys from you, how much they're willing to pay, and whether they come back.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-brand-positioning-really-means",
        content: "What Brand Positioning Really Means",
      },
      {
        type: "paragraph",
        content:
          "Brand positioning is the space your brand occupies in the customer's mind relative to competitors. It's not what you say about yourself — it's what people believe about you. And belief is built through consistent actions, not just clever marketing.",
      },
      {
        type: "callout",
        calloutType: "note",
        content:
          'Positioning is not your logo, color palette, or tagline. Those are expressions of your position. Positioning is the strategic decision: "We are _____ for _____ who need _____."',
      },
      {
        type: "heading",
        level: 2,
        id: "positioning-framework",
        content: "The HOTA Positioning Framework",
      },
      {
        type: "paragraph",
        content:
          "We've developed a simple but powerful framework that any brand can use to define their position. It starts with four essential questions.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Who is your ideal customer? (Be brutally specific)",
          "What problem do you solve better than anyone else?",
          "Why should they believe you? (Proof, not promises)",
          "What's the emotional outcome of choosing you?",
        ],
        content: "",
      },
      {
        type: "heading",
        level: 2,
        id: "common-positioning-mistakes",
        content: "5 Common Positioning Mistakes",
      },
      {
        type: "paragraph",
        content:
          "Most brands fail at positioning not because the concept is hard, but because they make avoidable mistakes. Here are the five biggest ones we see repeatedly:",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Trying to appeal to everyone (and resonating with no one)",
          "Copying competitor positioning instead of differentiating",
          "Changing positioning every quarter based on trends",
          "Confusing features with benefits",
          "Not aligning internal culture with external positioning",
        ],
        content: "",
      },
      {
        type: "heading",
        level: 2,
        id: "real-world-examples",
        content: "Real-World Examples from Indian Brands",
      },
      {
        type: "paragraph",
        content:
          "Let's look at how some Indian brands have nailed positioning. Amul consistently owns the 'affordable quality' position. Zomato has mastered 'relatable entertainment meets food culture'. boAt carved out 'affordable audio for the young Indian lifestyle'. Each brand owns a specific space in consumers' minds.",
      },
      {
        type: "quote",
        content:
          "You don't need to be the best at everything. You need to be the obvious choice for someone specific.",
      },
      {
        type: "heading",
        level: 2,
        id: "getting-started",
        content: "Getting Started With Your Positioning",
      },
      {
        type: "paragraph",
        content:
          "Start by talking to your best customers. Not surveys — actual conversations. Ask them why they chose you, what alternatives they considered, and how they'd describe you to a friend. The language they use is pure gold for your positioning work.",
      },
    ],
  },
  {
    id: "post-3",
    title: "Performance Marketing on a Budget: A Startup's Playbook",
    slug: "performance-marketing-budget-startup-playbook",
    metaDescription:
      "Learn how startups can run high-ROI performance marketing campaigns on lean budgets. Practical strategies for Meta Ads, Google Ads, and more.",
    excerpt:
      "You don't need lakhs to run effective ad campaigns. Here's the lean performance marketing playbook we use for early-stage brands.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
    coverImageAlt: "Analytics dashboard showing marketing performance metrics",
    category: BLOG_CATEGORIES[2],
    tags: [BLOG_TAGS[4], BLOG_TAGS[8], BLOG_TAGS[9]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-01-28T10:00:00Z",
    readTime: 10,
    featured: false,
    relatedPostIds: ["post-1", "post-5", "post-6"],
    content: [
      {
        type: "paragraph",
        content:
          "Every startup founder has the same question: 'How much should I spend on ads?' The answer isn't a number — it's a strategy. You can outperform brands spending 10x your budget if you're smarter about targeting, creative, and optimization.",
      },
      {
        type: "heading",
        level: 2,
        id: "mindset-shift",
        content: "The Budget Mindset Shift",
      },
      {
        type: "paragraph",
        content:
          "Stop thinking about ad spend as an expense. It's an investment with measurable returns. The goal isn't to spend less — it's to make every rupee work harder. That starts with understanding unit economics before you run a single ad.",
      },
      {
        type: "callout",
        calloutType: "warning",
        content:
          "Never scale ads before you've validated your product-market fit. Advertising accelerates what already exists — if people don't want your product, ads will just help you lose money faster.",
      },
      {
        type: "heading",
        level: 2,
        id: "lean-campaign-structure",
        content: "The Lean Campaign Structure",
      },
      {
        type: "paragraph",
        content:
          "Instead of spreading budget across 10 campaigns, focus on a simple three-tier funnel: awareness (top), consideration (middle), and conversion (bottom). Start from the bottom and work your way up.",
      },
      {
        type: "code",
        language: "plaintext",
        content:
          "Campaign Budget Allocation (Lean)\n─────────────────────────────────\nBottom of Funnel (Retargeting):  50%\nMiddle of Funnel (Engagement):   30%\nTop of Funnel (Awareness):       20%",
      },
      {
        type: "heading",
        level: 2,
        id: "creative-that-converts",
        content: "Creative That Converts on a Budget",
      },
      {
        type: "paragraph",
        content:
          "You don't need a production studio. The best-performing ad creatives in 2026 are authentic, UGC-style videos shot on phones. Focus on the hook (first 3 seconds), the value proposition, and a clear call to action.",
      },
      {
        type: "heading",
        level: 2,
        id: "key-metrics",
        content: "Key Metrics to Track Weekly",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Cost per result (CPR) — not just impressions",
          "Return on ad spend (ROAS) — aim for 3x minimum",
          "Click-through rate (CTR) — benchmark against industry",
          "Frequency — keep it under 3 for cold audiences",
          "Landing page conversion rate — the silent campaign killer",
        ],
        content: "",
      },
      {
        type: "quote",
        content:
          "The startup that wins isn't the one with the biggest budget. It's the one that learns the fastest. Test, measure, iterate — weekly.",
      },
    ],
  },
  {
    id: "post-4",
    title: "Design Systems: Why Your Brand Needs One Before Scaling",
    slug: "design-systems-brand-scaling",
    metaDescription:
      "Learn why a design system is critical for brand consistency and scalability, and how to build one even if you're a small team.",
    excerpt:
      "A design system isn't a luxury for big companies. It's the foundation that lets small teams create consistently beautiful work at speed.",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop",
    coverImageAlt: "Design system components laid out on a workspace",
    category: BLOG_CATEGORIES[3],
    tags: [BLOG_TAGS[6], BLOG_TAGS[2]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-01-20T10:00:00Z",
    readTime: 7,
    featured: false,
    relatedPostIds: ["post-2", "post-5"],
    content: [
      {
        type: "paragraph",
        content:
          "You've seen it happen: a brand launches with a gorgeous website, but six months later their Instagram looks completely different from their pitch deck, which looks nothing like their email newsletters. The culprit? No design system.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-is-a-design-system",
        content: "What Exactly Is a Design System?",
      },
      {
        type: "paragraph",
        content:
          "A design system is a documented set of standards for design and code — including visual language (colors, typography, spacing), UI components, patterns, and guidelines. Think of it as a single source of truth that everyone on your team references.",
      },
      {
        type: "heading",
        level: 2,
        id: "why-small-teams-need-it",
        content: "Why Small Teams Need It Most",
      },
      {
        type: "paragraph",
        content:
          "Counterintuitively, small teams benefit more from design systems than large ones. When you have limited people, a design system eliminates decision fatigue, speeds up production, and ensures that anyone can create on-brand content — not just the founding designer.",
      },
      {
        type: "callout",
        calloutType: "info",
        content:
          "A minimal design system doesn't need to be complex. Start with: color palette (5-7 colors), 2 typefaces, spacing scale, and 5-10 reusable component templates.",
      },
      {
        type: "heading",
        level: 2,
        id: "building-your-first",
        content: "Building Your First Design System",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Audit existing brand materials — what's consistent, what's not",
          "Define foundational tokens: colors, typography, spacing, sizing",
          "Create core components: buttons, cards, inputs, navigation",
          "Document everything in a shared, accessible location",
          "Train your team and enforce the system with reviews",
        ],
        content: "",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=900&h=500&fit=crop",
        alt: "Design system color palette and typography documentation",
        caption:
          "A well-documented design system scales your team's output without sacrificing quality.",
        content: "",
      },
      {
        type: "quote",
        content:
          "Design systems don't constrain creativity — they channel it. When the basics are solved, your team can focus on the work that actually matters.",
      },
    ],
  },
  {
    id: "post-5",
    title: "How We Grew a D2C Brand's Instagram from 2K to 100K in 6 Months",
    slug: "d2c-instagram-growth-case-study",
    metaDescription:
      "A detailed case study of how HOTA grew a D2C brand's Instagram following from 2,000 to 100,000 in just 6 months using organic and paid strategies.",
    excerpt:
      "A step-by-step breakdown of the strategy, content pillars, and growth levers we used to 50x an Instagram account in half a year.",
    coverImage:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&h=630&fit=crop",
    coverImageAlt: "Instagram mobile interface showing growth metrics",
    category: BLOG_CATEGORIES[4],
    tags: [BLOG_TAGS[3], BLOG_TAGS[5], BLOG_TAGS[1]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-01-10T10:00:00Z",
    readTime: 15,
    featured: false,
    relatedPostIds: ["post-1", "post-3", "post-6"],
    content: [
      {
        type: "paragraph",
        content:
          "When this D2C skincare brand approached us, they had 2,000 followers, inconsistent posting, and zero engagement strategy. Six months later, they had 100K followers, a 6.2% engagement rate, and were generating 35% of total revenue from Instagram alone.",
      },
      {
        type: "heading",
        level: 2,
        id: "the-starting-point",
        content: "The Starting Point",
      },
      {
        type: "paragraph",
        content:
          "The brand was doing everything wrong: posting product photos with white backgrounds, using generic captions, and running occasional boost posts with no targeting. Their content was indistinguishable from every other skincare brand on Instagram.",
      },
      {
        type: "heading",
        level: 2,
        id: "the-strategy",
        content: "Our 3-Phase Strategy",
      },
      {
        type: "paragraph",
        content:
          "We divided the six months into three distinct phases: Foundation (Month 1-2), Growth (Month 3-4), and Scale (Month 5-6). Each phase had specific goals, content strategies, and success metrics.",
      },
      {
        type: "heading",
        level: 3,
        id: "phase-1",
        content: "Phase 1: Foundation",
      },
      {
        type: "paragraph",
        content:
          "We rebuilt the entire brand presence from scratch — new visual identity, content pillars, bio optimization, and highlight covers. We established three content pillars: Skincare Education, Ingredient Deep-Dives, and Customer Transformations.",
      },
      {
        type: "heading",
        level: 3,
        id: "phase-2",
        content: "Phase 2: Growth",
      },
      {
        type: "paragraph",
        content:
          "With the foundation set, we ramped up posting frequency to 5x/week, launched a Reels strategy focused on trending audio + educational hooks, and initiated collaborations with micro-influencers (5K-50K followers).",
      },
      {
        type: "heading",
        level: 3,
        id: "phase-3",
        content: "Phase 3: Scale",
      },
      {
        type: "paragraph",
        content:
          "In the final phase, we combined organic momentum with strategic paid promotion. We boosted top-performing Reels, ran targeted ads to lookalike audiences, and introduced IG Shopping to convert followers into customers.",
      },
      {
        type: "heading",
        level: 2,
        id: "the-results",
        content: "The Results",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Followers: 2,000 → 100,000 (+4,900%)",
          "Engagement Rate: 0.8% → 6.2%",
          "Monthly Reach: 15K → 2.5M",
          "Revenue from Instagram: 3% → 35% of total",
          "Average order value from IG: 40% higher than other channels",
        ],
        content: "",
      },
      {
        type: "quote",
        content:
          "Growth isn't about hacks or tricks. It's about building a system that consistently delivers value to the right audience. The numbers are just the byproduct.",
      },
    ],
  },
  {
    id: "post-6",
    title: "The Rise of Short-Form Video: What Brands Need to Know in 2026",
    slug: "short-form-video-brands-2026",
    metaDescription:
      "Everything brands need to know about short-form video in 2026 — from Reels to Shorts to TikTok. Strategy, production tips, and platform insights.",
    excerpt:
      "Short-form video isn't a trend anymore — it's the default. Here's how to build a video-first content strategy that actually drives results.",
    coverImage:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=630&fit=crop",
    coverImageAlt: "Video content creation setup with camera and lighting",
    category: BLOG_CATEGORIES[1],
    tags: [BLOG_TAGS[7], BLOG_TAGS[3], BLOG_TAGS[1]],
    author: BLOG_AUTHORS[0],
    publishDate: "2026-02-22T10:00:00Z",
    readTime: 9,
    featured: false,
    relatedPostIds: ["post-1", "post-5", "post-3"],
    content: [
      {
        type: "paragraph",
        content:
          "If your brand isn't producing short-form video consistently, you're already behind. In 2026, Reels, Shorts, and TikTok account for over 60% of all social media engagement. The question isn't whether to invest — it's how to do it right.",
      },
      {
        type: "heading",
        level: 2,
        id: "why-short-form-dominates",
        content: "Why Short-Form Video Dominates",
      },
      {
        type: "paragraph",
        content:
          "Attention spans haven't shrunk — they've become more selective. Short-form video respects the viewer's time while delivering maximum impact. The format forces brands to distill their message to its essence, which is actually better communication.",
      },
      {
        type: "heading",
        level: 2,
        id: "platform-breakdown",
        content: "Platform-by-Platform Breakdown",
      },
      {
        type: "paragraph",
        content:
          "Each platform has its own culture and algorithm. Instagram Reels favors polished, aspirational content. YouTube Shorts rewards educational and how-to content. TikTok thrives on authenticity and trend participation. Your content strategy should be platform-native, not one-size-fits-all.",
      },
      {
        type: "callout",
        calloutType: "tip",
        content:
          "Shoot once, edit thrice. Record your content in a way that lets you adapt it for each platform — different aspect ratios, caption styles, and opening hooks.",
      },
      {
        type: "heading",
        level: 2,
        id: "content-production-tips",
        content: "Production Tips That Don't Break the Bank",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Natural lighting > expensive studio setups for authenticity",
          "Invest in audio quality — a ₹2,000 lapel mic changes everything",
          "Batch produce: shoot 10 videos in one day, edit throughout the week",
          "Use templates for consistent branding (captions, intros, CTAs)",
          "Keep hooks under 1 second — the first frame decides everything",
        ],
        content: "",
      },
      {
        type: "heading",
        level: 2,
        id: "measuring-success",
        content: "Measuring What Matters",
      },
      {
        type: "paragraph",
        content:
          "Views are vanity. Focus on watch-through rate (what percentage watch to the end), shares (the strongest signal of content quality), and profile visits (indicating conversion intent). Build your strategy around these metrics, not follower count.",
      },
      {
        type: "quote",
        content:
          "The best short-form content doesn't feel like marketing. It feels like a friend sharing something valuable. That's the standard to aim for.",
      },
    ],
  },
];

// Helper to get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

// Helper to get author by slug
export function getBlogAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

// Helper to get category by slug
export function getBlogCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

// Helper to get posts by author
export function getPostsByAuthor(authorId: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.author.id === authorId);
}

// Helper to get posts by category
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category.slug === categorySlug);
}

// Helper to get related posts
export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return BLOG_POSTS.filter((p) => post.relatedPostIds.includes(p.id));
}

// Helper to search posts
export function searchBlogPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return BLOG_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
      p.category.name.toLowerCase().includes(q),
  );
}

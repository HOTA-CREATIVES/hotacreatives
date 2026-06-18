import {
  BarChart3,
  Globe,
  Megaphone,
  Palette,
  PenTool,
  Video,
  Target,
  Rocket,
  Sparkles,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  deliverables: string[];
  outcome: string;
};

export type WorkflowStep = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export type MetricCard = {
  label: string;
  value: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "social-media",
    title: "Social Media Management",
    tagline: "Build a loyal brand community",
    description:
      "From strategy to posting to engagement, we operate your social channels as one consistent growth system.",
    icon: Megaphone,
    features: [
      "Monthly content and publishing plan",
      "Channel-specific content formatting",
      "Community engagement workflow",
      "Weekly traction reviews",
    ],
    deliverables: [
      "15-30 posts across key platforms",
      "Caption and hashtag framework",
      "Story and reel publishing calendar",
      "Monthly report with action points",
    ],
    outcome:
      "Consistent brand voice and predictable organic engagement growth.",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    tagline: "Creative that people remember",
    description:
      "We produce audience-first content that balances trend relevance with your long-term brand story.",
    icon: PenTool,
    features: [
      "Reel and carousel ideation",
      "Brand-aligned design execution",
      "Short-form script direction",
      "Hook and format experimentation",
    ],
    deliverables: [
      "10-20 creative assets per month",
      "Campaign-oriented content batches",
      "Story kit for daily publishing",
      "Creative sprint notes",
    ],
    outcome: "Higher retention and faster idea-to-publish turnaround.",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    tagline: "Make ad spend accountable",
    description:
      "We run paid campaigns with structured testing, clean tracking, and sharp optimization loops.",
    icon: BarChart3,
    features: [
      "Audience and offer architecture",
      "Conversion tracking setup",
      "Creative and copy testing",
      "Weekly optimization cycles",
    ],
    deliverables: [
      "Campaign setup and launch",
      "Performance dashboard",
      "Testing matrix and findings",
      "Monthly ROI summary",
    ],
    outcome: "Lower wasted spend and stronger lead quality over time.",
  },
  {
    id: "brand-identity",
    title: "Brand Identity & Design",
    tagline: "Look premium and stay recognizable",
    description:
      "We build visual systems that make your brand feel intentional and consistent across every touchpoint.",
    icon: Palette,
    features: [
      "Logo and identity exploration",
      "Color and type system",
      "Social and ad template system",
      "Visual language consistency rules",
    ],
    deliverables: [
      "Brand toolkit",
      "Usage guideline document",
      "Template starter pack",
      "Campaign visual direction",
    ],
    outcome: "Stronger first impressions and better brand recall.",
  },
  {
    id: "video-production",
    title: "Video Production",
    tagline: "Move people from attention to trust",
    description:
      "We create platform-ready videos designed for retention, trust-building, and conversion.",
    icon: Video,
    features: [
      "Concept and shot planning",
      "Narrative edit structure",
      "Subtitle and cut-down versions",
      "Platform-specific exports",
    ],
    deliverables: [
      "4-8 edited videos each month",
      "Multiple hook variations",
      "Short and long versions",
      "Creative performance notes",
    ],
    outcome: "Better watch-through rates and stronger message clarity.",
  },
  {
    id: "website-funnel",
    title: "Website & Funnel Design",
    tagline: "Turn traffic into qualified action",
    description:
      "We design conversion-first web journeys that remove friction and guide users toward action.",
    icon: Globe,
    features: [
      "Page and funnel mapping",
      "UX and copy alignment",
      "Responsive UI implementation",
      "Analytics event planning",
    ],
    deliverables: [
      "Conversion-optimized pages",
      "Mobile and desktop layouts",
      "CTA and form wiring",
      "Post-launch improvement list",
    ],
    outcome: "More qualified leads and cleaner conversion flow.",
  },
];

export const workflow: WorkflowStep[] = [
  {
    title: "Audit & Direction",
    detail: "We map goals, current bottlenecks, and growth constraints first.",
    icon: Target,
  },
  {
    title: "System Build",
    detail:
      "Creative, distribution, and paid channels are connected as one engine.",
    icon: Rocket,
  },
  {
    title: "Creative Sprints",
    detail:
      "Fast weekly execution cycles to ship assets without quality drops.",
    icon: Sparkles,
  },
  {
    title: "Scale by Signal",
    detail: "We double down on what works and trim what does not.",
    icon: LineChart,
  },
];

export const metrics: MetricCard[] = [
  {
    label: "Conversion Lift",
    value: "2–5×",
    description:
      "Measured through lead form and CTA event improvements over baseline.",
  },
  {
    label: "Creative Velocity",
    value: "30+",
    description:
      "Quality assets shipped per month across content, ads, and video.",
  },
  {
    label: "Brand Recall",
    value: "100%",
    description:
      "Consistency in messaging and visuals across every channel and touchpoint.",
  },
  {
    label: "ROAS Discipline",
    value: "3×+",
    description:
      "Structured paid optimization to maintain efficient ad spend returns.",
  },
];

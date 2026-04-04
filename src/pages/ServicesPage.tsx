import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe,
  LineChart,
  Megaphone,
  Palette,
  PenTool,
  Rocket,
  Sparkles,
  Target,
  Video,
} from "lucide-react";
import HomeCTAButton from "@/components/composite/HomeCTAButton";
import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base/tooltip";
import { ROUTES } from "@/routes";

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Megaphone;
  features: string[];
  deliverables: string[];
  outcome: string;
};

const services: Service[] = [
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

const workflow = [
  {
    title: "Audit & Direction",
    detail: "We map goals, current bottlenecks, and growth constraints first.",
    icon: Target,
  },
  {
    title: "System Build",
    detail: "Creative, distribution, and paid channels are connected as one engine.",
    icon: Rocket,
  },
  {
    title: "Creative Sprints",
    detail: "Fast weekly execution cycles to ship assets without quality drops.",
    icon: Sparkles,
  },
  {
    title: "Scale by Signal",
    detail: "We double down on what works and trim what does not.",
    icon: LineChart,
  },
];

const metricHints = [
  {
    label: "Conversion Lift",
    hint: "Measured through lead form and CTA event improvements over baseline.",
  },
  {
    label: "Creative Velocity",
    hint: "How quickly your team can ship quality assets each week.",
  },
  {
    label: "Brand Recall",
    hint: "Consistency in messaging and visuals across channels.",
  },
  {
    label: "ROAS Discipline",
    hint: "Structured paid optimization to maintain efficient spend.",
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId],
  );

  const ActiveIcon = activeService.icon;

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-services-v3.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,194,13,0.14),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.80),rgba(0,0,0,0.62)_50%,rgba(0,0,0,0.88))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-35" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-8 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              Services
            </span>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-7xl">
              Growth Services
              <br />
              <span className="text-accent">built like a system</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              We combine strategy, creative, distribution, and optimization so
              your brand scales with consistency instead of random execution.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <HomeCTAButton
                onClick={() => navigate(ROUTES.FREE_AUDIT)}
                className="w-full sm:w-auto font-bold"
              >
                Get Your Free Audit
              </HomeCTAButton>
              <Button
                onClick={() => navigate(ROUTES.CONTACT)}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-6 text-sm font-bold text-white hover:bg-white/20"
              >
                Discuss your scope
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border-white/15 bg-black/45 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-black text-white">
                Outcome Dashboard
              </CardTitle>
              <CardDescription className="text-white/70">
                Hover each metric to see what we optimize for in real projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="grid gap-3 sm:grid-cols-2">
                  {metricHints.map((metric) => (
                    <Tooltip key={metric.label}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          {metric.label}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] border-border bg-bg-card text-text-secondary">
                        {metric.hint}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Service Command Deck
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Select a service track,
              <span className="text-accent"> inspect full execution scope</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
              A unique, non-tabbed showcase to compare all service lanes without
              overlap or stacked template behavior.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = activeService.id === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`text-left ${
                      isActive ? "translate-x-1" : ""
                    } transition-transform`}
                  >
                    <Card
                      className={`rounded-2xl border transition-colors ${
                        isActive
                          ? "border-accent/55 bg-accent/10"
                          : "border-border bg-bg-card hover:border-accent/30 hover:bg-bg-card-hover"
                      }`}
                    >
                      <CardContent className="flex items-start gap-3 pt-6">
                        <div className="rounded-lg bg-accent/15 p-2 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-text-primary">
                            {service.title}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">
                            {service.tagline}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
            </div>

            <Card className="rounded-3xl border-border bg-bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent/15 p-3 text-accent">
                    <ActiveIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-text-primary">
                      {activeService.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-text-secondary">
                      {activeService.tagline}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-text-secondary">
                  {activeService.description}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-black/20 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">
                      Includes
                    </p>
                    <ul className="mt-4 space-y-3">
                      {activeService.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border bg-black/20 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-accent">
                      Deliverables
                    </p>
                    <ul className="mt-4 space-y-3">
                      {activeService.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span className="text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    Expected outcome
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {activeService.outcome}
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => navigate(ROUTES.FREE_AUDIT)}
                    className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
                  >
                    Start with audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => navigate(ROUTES.CONTACT)}
                    className="rounded-full border border-border bg-bg-card px-6 py-6 text-sm font-bold text-text-primary hover:bg-bg-card-hover"
                  >
                    Discuss custom scope
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-secondary py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(244,194,13,0.10),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(244,194,13,0.08),transparent_30%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              How We Execute
            </span>
            <h3 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              A creative workflow with
              <span className="text-accent"> operational discipline</span>
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.title}
                  className="rounded-2xl border-border/70 bg-black/30 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg font-black text-text-primary">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {step.detail}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h4 className="text-4xl font-black tracking-tight sm:text-5xl">
            Ready to build a smarter growth system?
          </h4>
          <p className="mt-5 text-lg text-text-secondary">
            Tell us what you are optimizing for and we will suggest the right
            service stack for your stage.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <HomeCTAButton
              onClick={() => navigate(ROUTES.FREE_AUDIT)}
              className="w-full sm:w-auto font-bold"
            >
              Get Your Free Audit
            </HomeCTAButton>
            <HomeCTAButton
              onClick={() => navigate(ROUTES.CONTACT)}
              className="w-full sm:w-auto"
              variant="secondary"
            >
              Let&apos;s Talk
            </HomeCTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

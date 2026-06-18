import { Link } from "react-router-dom";
import { ArrowRight, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";

const aboutPoints = [
  {
    icon: Target,
    title: "Positioning before posting",
    description:
      "We define how your brand should be perceived before a single campaign goes live.",
  },
  {
    icon: Zap,
    title: "Creative systems that scale",
    description:
      "From content pipelines to ad creative, we build repeatable systems, not random bursts.",
  },
  {
    icon: TrendingUp,
    title: "Growth tied to business goals",
    description:
      "Reach matters only when it converts into leads, sales, and category authority.",
  },
];

const aboutStats = [
  { label: "Working model", value: "Founder-led" },
  { label: "Approach", value: "Research-first" },
  { label: "Core focus", value: "Content + Ads" },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-14 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="rounded-[2rem] border border-border bg-bg-card/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              About Hota
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Your brand deserves a
              <br />
              <span className="text-accent">clear growth narrative</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Hota is built for founders and marketing teams that need sharper
              positioning, stronger creative, and a growth system that feels
              intentional from top to bottom.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">
              We combine content strategy, paid growth, and brand design into a
              single operating layer so ambitious Indian businesses can stop
              blending in and start becoming the brand people remember first.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-black/20 p-4"
                >
                  <p className="text-2xl font-black text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover"
              >
                <Link to="/services" className="inline-flex items-center gap-2">
                  Explore services
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-bg-card/60 p-8">
              <LottieAnimation
                src={LOTTIE_ANIMATIONS.about}
                className="mb-6 h-52 w-full"
              />
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">
                Operating principle
              </p>
              <p className="mt-3 text-xl font-semibold leading-relaxed text-text-primary">
                Strategy, design, and distribution should feel like one motion,
                not three disconnected teams.
              </p>
            </div>

            <div className="grid gap-4">
              {aboutPoints.map((point) => (
                <div
                  key={point.title}
                  className="group rounded-[1.75rem] border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:bg-bg-card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20 h-12 w-12">
                      <point.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

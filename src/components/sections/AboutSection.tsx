import { Link } from "react-router-dom";
import { ArrowRight, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";
import { motion } from "framer-motion";

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

const pointsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const pointVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-14 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] 5xl:max-w-[2800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-border bg-bg-card/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              About Hota
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl 3xl:text-6xl 4xl:text-7xl">
              Your brand deserves a
              <br />
              <span className="text-accent">clear growth narrative</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary 3xl:text-xl 4xl:text-2xl">
              Hota is built for founders and marketing teams that need sharper
              positioning, stronger creative, and a growth system that feels
              intentional from top to bottom.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary 3xl:text-lg 4xl:text-xl">
              We combine content strategy, paid growth, and brand design into a
              single operating layer so ambitious Indian businesses can stop
              blending in and start becoming the brand people remember first.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="rounded-2xl border border-border bg-black/20 p-4 hover:border-accent/30 transition-colors"
                >
                  <p className="text-2xl font-black text-accent 3xl:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="rounded-full bg-accent px-6 py-6 text-sm font-bold text-black hover:bg-accent-hover transition-transform hover:scale-105"
              >
                <Link to="/services" className="inline-flex items-center gap-2">
                  Explore services
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="rounded-[2rem] border border-border bg-bg-card/60 p-8 shadow-lg"
            >
              <LottieAnimation
                src={LOTTIE_ANIMATIONS.about}
                className="mb-6 h-52 w-full filter drop-shadow-[0_0_10px_rgba(244,194,13,0.15)]"
              />
              <p className="text-sm uppercase tracking-[0.24em] text-text-muted">
                Operating principle
              </p>
              <p className="mt-3 text-xl font-semibold leading-relaxed text-text-primary 3xl:text-2xl">
                Strategy, design, and distribution should feel like one motion,
                not three disconnected teams.
              </p>
            </motion.div>

            <motion.div
              variants={pointsContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-4"
            >
              {aboutPoints.map((point) => (
                <motion.div
                  variants={pointVariants}
                  key={point.title}
                  className="group rounded-[1.75rem] border border-border bg-bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:bg-bg-card-hover hover:shadow-[0_8px_25px_rgba(244,194,13,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20 h-12 w-12">
                      <point.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary 3xl:text-xl">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary 3xl:text-base">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

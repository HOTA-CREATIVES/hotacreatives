import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FeatureSpotlight() {
  const features = [
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "High-Velocity Creative",
      desc: "30+ high-retention assets monthly — reels, designs, and copy that position your brand premium.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Data-Attuned Performance",
      desc: "ROAS-driven Meta & Google campaigns backed by clean tracking and disciplined optimization.",
    },
    {
      icon: "fa-solid fa-arrows-spin",
      title: "Conversion Optimization",
      desc: "Conversion-first web journeys and landing pages that turn hard-won traffic into revenue.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-bg-primary">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[160px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                The HOTA System
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl leading-tight text-white">
                One unified system for
                <span className="block text-accent">unstoppable brand growth.</span>
              </h2>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                We replace three disconnected agencies (social, performance buyers, and web developers) with a single high-velocity execution engine. By managing creative, media buying, and conversion funnels under one roof, we eliminate communication gaps and align every asset directly with your bottom line.
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-5">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-black/30 hover:border-accent/20 transition-all duration-300 group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                    <i className={`${feature.icon} text-sm`}></i>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                className="rounded-full bg-accent px-8 py-6 text-base font-bold text-black hover:bg-accent-hover transition-transform hover:scale-105"
              >
                <Link to="/free-audit" className="inline-flex items-center gap-2">
                  Claim your free growth roadmap
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Spotlight Visual */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            {/* Spotlight highlight overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,194,13,0.1)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative w-full max-w-[480px] aspect-square rounded-[3rem] border border-white/5 bg-black/40 p-8 sm:p-12 overflow-hidden flex flex-col items-center justify-center shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-[2.5rem] border-2 border-dashed border-accent/20 pointer-events-none"
              />

              {/* Glowing Core Engine */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 25px rgba(244,194,13,0.15)",
                    "0 0 45px rgba(244,194,13,0.35)",
                    "0 0 25px rgba(244,194,13,0.15)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-accent/15 border-2 border-accent text-accent shadow-[0_0_30px_rgba(244,194,13,0.2)]"
              >
                <i className="fa-solid fa-arrows-spin text-4xl animate-[spin_10s_linear_infinite]"></i>
                <div className="absolute -bottom-7 bg-black/80 px-3 py-1 rounded-full border border-accent/40 text-[10px] uppercase tracking-widest font-black text-accent whitespace-nowrap shadow-md">
                  HOTA Engine
                </div>
              </motion.div>

              {/* Floating Card 1: Performance ROI */}
              <motion.div
                initial={{ x: -60, y: -90 }}
                animate={{ y: [-95, -85, -95] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-8 top-16 sm:left-14 sm:top-24 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/90 px-4 py-3 backdrop-blur-md shadow-lg"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                  <i className="fa-solid fa-arrow-trend-up text-xs"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-text-muted">Meta & Google Ads</div>
                  <div className="text-sm font-black text-white">4.2× average ROAS</div>
                </div>
              </motion.div>

              {/* Floating Card 2: Creative Assets */}
              <motion.div
                initial={{ x: 80, y: -40 }}
                animate={{ y: [-45, -35, -45] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute right-6 top-1/3 sm:right-12 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/90 px-4 py-3 backdrop-blur-md shadow-lg"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <i className="fa-solid fa-film text-xs"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-text-muted">Creative Speed</div>
                  <div className="text-sm font-black text-white">30+ Assets / mo</div>
                </div>
              </motion.div>

              {/* Floating Card 3: Web Funnel Conversion */}
              <motion.div
                initial={{ x: -50, y: 70 }}
                animate={{ y: [65, 75, 65] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-10 bottom-20 sm:left-20 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/90 px-4 py-3 backdrop-blur-md shadow-lg"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <i className="fa-solid fa-circle-check text-xs"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-text-muted">Web Conversion</div>
                  <div className="text-sm font-black text-white">2.5x inquiry rate</div>
                </div>
              </motion.div>

              {/* Background glowing particles/decorations */}
              <div className="absolute right-20 bottom-16 h-2 w-2 rounded-full bg-accent/40 animate-ping" />
              <div className="absolute left-16 top-1/2 h-3 w-3 rounded-full bg-accent/20 blur-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

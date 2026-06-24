import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function SignatureProject() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const metrics = [
    {
      icon: "fa-solid fa-arrow-trend-up",
      value: "2.1x",
      label: "Inquiry rate increase",
      desc: "Doubled client inquiries within the first 30 days of launch.",
    },
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      value: "100%",
      label: "Bespoke Identity",
      desc: "Bespoke visual styling built from the ground up for luxury events.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      value: "Premium",
      label: "Market Position",
      desc: "Shifted target audience from mass market to premium luxury buyers.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-bg-primary py-20 md:py-32"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] 5xl:max-w-[2800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Signature Piece
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl 3xl:text-7xl">
            Case Study: <span className="text-accent">Haanav Eviors</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary leading-relaxed 3xl:text-xl">
            See how HOTA Creatives repositioned a leading luxury event production and interior architecture firm. We designed a complete digital presence that mirrors the scale, elegance, and prestige of their physical projects.
          </p>
        </div>

        {/* Highlight Showcase Section */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Side: Parallax Image Container */}
          <div className="relative rounded-[2.5rem] border border-white/5 bg-black/40 overflow-hidden aspect-[16/10] shadow-[0_30px_100px_rgba(0,0,0,0.4)] group">
            <motion.div
              style={{ y: yImage, scale: scaleImage }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <img
                src="/images/haanav-eviors.jpg"
                alt="Haanav Eviors Showcase"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </motion.div>
            
            {/* Absolute overlay details */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  Luxury Events & Interior Design
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Haanav Eviors
                </h3>
              </div>
              <Button
                asChild
                className="rounded-full bg-accent text-black font-bold hover:bg-accent-hover transition-transform hover:scale-105 shrink-0 self-start sm:self-auto"
              >
                <a
                  href="https://www.haanaveviors.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Visit Live Site
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side: Performance Metrics Grid */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
              Strategic Impact & Metrics
            </h4>
            <div className="grid gap-4">
              {metrics.map((metric, index) => {
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 18,
                      delay: index * 0.1,
                    }}
                    className="flex gap-5 rounded-[1.75rem] border border-white/5 bg-black/40 p-6 hover:border-accent/30 transition-colors duration-300"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <i className={`${metric.icon} text-xl`}></i>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-accent">
                          {metric.value}
                        </span>
                        <span className="text-sm font-bold text-text-primary">
                          {metric.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {metric.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

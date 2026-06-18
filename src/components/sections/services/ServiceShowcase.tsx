import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, ChevronDown } from "lucide-react";
import { services } from "@/constants/services";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
    },
  },
};

export default function ServiceShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-14 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
            What We Deliver
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Six service tracks,
            <span className="text-accent"> one growth engine</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary">
            Each service is designed to work independently or as part of an
            integrated system. Click any card to explore the full scope.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                layout
                className={`group relative overflow-hidden rounded-[1.75rem] border backdrop-blur-md transition-all duration-500 cursor-pointer ${
                  isExpanded
                    ? "border-accent/40 bg-accent/5 shadow-[0_8px_40px_rgba(244,194,13,0.12)]"
                    : "border-white/5 bg-black/40 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(244,194,13,0.08)]"
                }`}
                onClick={() => toggle(service.id)}
              >
                {/* Top accent line on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                      <Icon size={26} />
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-1 text-text-muted"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-accent/70">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          {/* Features */}
                          <div className="rounded-2xl border border-white/5 bg-black/20 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">
                              Includes
                            </p>
                            <ul className="mt-3 space-y-2.5">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                                  <span className="text-text-secondary">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Deliverables */}
                          <div className="rounded-2xl border border-white/5 bg-black/20 p-5">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-accent">
                              Deliverables
                            </p>
                            <ul className="mt-3 space-y-2.5">
                              {service.deliverables.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                                  <span className="text-text-secondary">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Outcome */}
                        <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/10 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                            Expected outcome
                          </p>
                          <p className="mt-1.5 text-sm text-text-secondary">
                            {service.outcome}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

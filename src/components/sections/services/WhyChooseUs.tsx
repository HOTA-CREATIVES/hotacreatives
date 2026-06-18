import { motion } from "framer-motion";
import { metrics } from "@/constants/services";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            Why Hota
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Outcomes we
            <span className="text-accent"> optimize for</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-text-secondary">
            Every engagement is measured against these benchmarks. We don't
            just deliver assets — we deliver business impact.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-[1.75rem] border border-white/5 bg-black/40 p-7 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(244,194,13,0.1)]"
            >
              {/* Accent top border on hover */}
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-[1.75rem] bg-linear-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <p className="text-4xl font-black text-accent tracking-tight">
                {metric.value}
              </p>
              <h3 className="mt-3 text-base font-bold text-text-primary">
                {metric.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { workflow } from "@/constants/services";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
    },
  },
};

export default function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-14 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(244,194,13,0.10),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(244,194,13,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
            How We Execute
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            A creative workflow with
            <span className="text-accent"> operational discipline</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connecting line (desktop only) */}
          <div className="absolute top-[52px] left-[10%] right-[10%] hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block" />

          {workflow.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-[1.75rem] border border-white/5 bg-black/30 p-7 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-black/50 hover:shadow-[0_8px_30px_rgba(244,194,13,0.08)]"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent/25">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-black text-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.detail}
                </p>

                {/* Bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

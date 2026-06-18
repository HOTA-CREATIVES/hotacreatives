import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeCTAButton from "@/components/ui/HomeCTAButton";

const ctaBullets = [
  "Brand positioning audit",
  "Content and funnel opportunities",
  "Paid growth direction for the next 90 days",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-14 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-144 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-black/40 to-black/80 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10 lg:p-12"
        >
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                Next step
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Ready to stop posting and start
                <br className="hidden md:block" />
                <span className="text-accent"> positioning?</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Our motive is to replace random posting with deliberate brand
                growth. This audit gives you a practical roadmap to sharpen
                positioning, improve content direction, and scale with clarity.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-[2rem] border border-white/10 bg-black/40 p-8 shadow-inner"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                What you get
              </p>
              <div className="mt-6 space-y-4">
                {ctaBullets.map((bullet, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={bullet}
                    className="flex items-center gap-5 rounded-2xl border border-white/5 bg-black/40 p-5 transition-colors hover:bg-white/5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-base font-black text-black">
                      0{index + 1}
                    </span>
                    <p className="text-base font-medium leading-relaxed text-text-primary">
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <HomeCTAButton
              onClick={() => navigate("/free-audit")}
              className="w-full sm:w-auto font-bold px-8 py-6 text-base transition-transform hover:scale-105"
            >
              Get Your Free Brand Audit
            </HomeCTAButton>
            <HomeCTAButton
              onClick={() =>
                window.open(
                  "https://wa.me/919542421108?text=Hi!%20I%27m%20interested%20in%20Hota%27s%20services.",
                  "_blank",
                )
              }
              className="w-full sm:w-auto px-8 py-6 text-base transition-transform hover:scale-105"
              variant="secondary"
            >
              WhatsApp Us Directly
            </HomeCTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HomeCTAButton from "@/components/ui/HomeCTAButton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";

export default function ServicesHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pb-20 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,194,13,0.14),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.80),rgba(0,0,0,0.62)_50%,rgba(0,0,0,0.88))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-35" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

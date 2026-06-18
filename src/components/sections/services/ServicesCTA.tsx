import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeCTAButton from "@/components/ui/HomeCTAButton";
import { ROUTES } from "@/routes";

export default function ServicesCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-14 md:py-24">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
          Ready to build a smarter
          <br className="hidden sm:block" />
          <span className="text-accent"> growth system?</span>
        </h2>
        <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">
          Tell us what you are optimizing for and we will suggest the right
          service stack for your stage.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
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
        </motion.div>
      </motion.div>
    </section>
  );
}

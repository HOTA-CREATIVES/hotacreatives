import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import HomeCTAButton from "@/components/ui/HomeCTAButton";
import Hero3DBackground from "@/components/visual-effects/Hero3DBackground";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative -mt-20 flex w-full flex-col overflow-hidden bg-bg-primary md:h-screen md:min-h-[700px] md:justify-center pt-20">
      {/* Desktop: absolute globe background (hidden on mobile) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Hero3DBackground />
      </div>
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_top_left,rgba(244,194,13,0.16),transparent_32%),radial-gradient(circle_at_75%_20%,rgba(244,194,13,0.08),transparent_25%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.72)_48%,rgba(0,0,0,0.96)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40 pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[2000px] 5xl:max-w-[2800px] px-4 pb-4 pt-24 sm:px-6 sm:pb-16 md:pt-28 md:pb-16 lg:px-6 lg:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-14"
        >
          <div className="w-full space-y-5 lg:w-3/5">
            <h1 className="max-w-4xl font-heading text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 3xl:text-8xl 4xl:text-[6.5rem] 5xl:text-[8rem]">
              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  where creativity meets growth
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-accent"
                >
                  strategy turn into success
                </motion.span>
              </span>
            </h1>
            <motion.div variants={itemVariants}>
              <HomeCTAButton
                onClick={() => navigate("/free-audit")}
                className="w-full sm:w-auto font-bold 3xl:text-lg 3xl:px-8 3xl:py-6"
              >
                Get Your Free Brand Audit
              </HomeCTAButton>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="w-full lg:w-2/5">
            <p className="border-l border-accent/30 pl-5 text-base italic leading-relaxed text-text-secondary sm:text-lg lg:text-right lg:border-l-0 lg:border-r lg:pr-5 lg:pl-0 xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl">
              At Hota Creatives, we bring strategy, content, and digital growth
              into one system — helping brands stop chasing attention and start
              owning it.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: inline globe below content (hidden on desktop) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center pb-8 md:hidden"
      >
        <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
          <Hero3DBackground inline />
        </div>
      </motion.div>
    </section>
  );
}

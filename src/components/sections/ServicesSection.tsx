import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LottieAnimation from "@/components/ui/LottieAnimation";
import { LOTTIE_ANIMATIONS } from "../../constants";

/* ------------------------------------------------------------------ */
/* Service data                                                       */
/* ------------------------------------------------------------------ */
interface Service {
  animation?: string;
  image?: string;
  title: string;
  description: string;
  className?: string; // added for bento layout spans
}

const services: Service[] = [
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772949005/Website_setup-pana_kdmoks.svg",
    title: "Social Media Management",
    description:
      "End-to-end management of your Instagram, Facebook, LinkedIn, and X (Twitter) presence with daily content, engagement, and community building.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948840/About_us_page-amico_x6pzpn.svg",
    title: "Content Creation",
    description:
      "Reels, carousels, stories, memes, and static posts — designed to resonate with your Indian audience and drive meaningful engagement.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Content_creator-amico_1_dkabfw.svg",
    title: "Performance Marketing",
    description:
      "Meta Ads, Google Ads, and campaign management optimised for ROAS. We turn ad spend into revenue with data-driven strategies.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948723/Videographer-pana_gladr0.svg",
    title: "Brand Identity & Design",
    description:
      "Logo design, brand guidelines, visual identity systems, and packaging design that makes your brand look like a ₹100 Cr company from day one.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    image:
      "https://res.cloudinary.com/diiyy6bar/image/upload/v1772948722/Mobile_Marketing-pana_x02k3u.svg",
    title: "Video Production",
    description:
      "Product shoots, brand films, testimonial videos, and UGC-style content that builds trust and drives conversions across platforms.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    animation: LOTTIE_ANIMATIONS.services,
    title: "Website & Funnel Design",
    description:
      "High-converting landing pages, sales funnels, and brand websites that don't just look good — they generate leads 24/7.",
    className: "md:col-span-2 md:row-span-1",
  },
];

/* ------------------------------------------------------------------ */
/* Animations                                                         */
/* ------------------------------------------------------------------ */
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

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

/* ------------------------------------------------------------------ */
/* ServiceCard                                                        */
/* ------------------------------------------------------------------ */
function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-border bg-black/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-accent/40 hover:bg-black/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(244,194,13,0.12)] flex flex-col justify-center ${service.className || ""}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <LottieAnimation
              src={service.animation!}
              className="w-12 h-12"
              loop
              autoplay
            />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="mb-3 text-2xl font-bold tracking-tight">
            {service.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ServicesSection                                                     */
/* ------------------------------------------------------------------ */
export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-24 bg-bg-secondary">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              What We Do
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Service architecture
              <br className="hidden md:block" />
              <span className="text-accent"> built for growth</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Our motive is simple: build a clear growth engine for your brand.
              This service stack is structured to move from positioning to
              execution so every creative and campaign contributes to long-term
              brand authority.
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="rounded-full bg-accent px-8 py-6 text-base font-bold text-black hover:bg-accent-hover transition-transform hover:scale-105"
              >
                <Link to="/services" className="inline-flex items-center gap-2">
                  View full service stack
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-black/40 to-black/80 p-6 sm:p-10 backdrop-blur-xl shadow-2xl"
          >
            <LottieAnimation
              src={LOTTIE_ANIMATIONS.services}
              className="mx-auto h-52 w-full object-contain filter drop-shadow-[0_0_15px_rgba(244,194,13,0.3)]"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Content systems", "Paid acquisition", "Brand identity"].map(
                (label, index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-black/40 p-5 transition-colors hover:bg-accent/10"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                      0{index + 1}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-text-primary">
                      {label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

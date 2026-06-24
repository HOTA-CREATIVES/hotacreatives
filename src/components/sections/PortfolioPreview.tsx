import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    title: "Haanav Eviors",
    category: "Luxury Events & Interior Architecture",
    description:
      "A premium brand website for a luxury event production and interior architecture firm — combining bespoke high-end event management with modern minimalist design.",
    image:
      "/images/haanav-eviors.jpg",
    url: "https://www.haanaveviors.com/",
  },
  {
    title: "FitGym Elite",
    category: "Fitness & SaaS Platform",
    description:
      "A high-performance gym and fitness SaaS platform featuring workout trackers, diet planners, gamified challenges, and premium membership flows.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    url: "https://fit-gym-rosy-sigma.vercel.app/",
  },
  {
    title: "Grand Occasion",
    category: "Event Venue Booking",
    description:
      "A premium banquet hall booking platform with real-time availability, seamless reservation management, and elegant event coordination.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
    url: "https://grand-occassion.vercel.app/",
  },
];

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

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function PortfolioPreview() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              Our Work
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Portfolio gallery with
              <br className="hidden md:block" />
              <span className="text-accent"> campaign depth</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Our motive is to show how strategic thinking translates into
              creative direction. This gallery highlights the style and approach
              we bring to brand building across industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              className="rounded-full bg-accent px-8 py-6 text-base font-bold text-black hover:bg-accent-hover transition-transform hover:scale-105"
            >
              <Link to="/portfolio" className="inline-flex items-center gap-2">
                View all work
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {portfolioItems.map((item) => (
            <motion.a
              variants={itemVariants}
              whileHover={{ y: -8 }}
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/40 shadow-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(244,194,13,0.15)] block cursor-pointer"
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  {item.category}
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                  {item.description}
                </p>
                <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
                  <i className="fa-solid fa-arrow-up-right-from-square text-white transition-colors duration-300 group-hover:text-accent text-sm"></i>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

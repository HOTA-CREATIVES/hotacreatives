import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, User, ExternalLink } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  websiteUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Navadeep",
    role: "Founder & CEO",
    company: "Haanav Eviors",
    content:
      "Hota Creatives didn't just build us a website — they crafted an entire digital identity. The luxury positioning, the visual language, everything feels premium and intentional. Our client inquiries doubled within the first month of launch.",
    rating: 5,
    avatar: "",
    websiteUrl: "https://www.haanaveviors.com/",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function TestimonialsSection() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrentIndex(([prev]) => {
        const next =
          (prev + newDirection + testimonials.length) % testimonials.length;
        return [next, newDirection];
      });
    },
    [],
  );

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-bg-primary py-14 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            Client Love
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            What our clients
            <br className="hidden sm:block" />
            <span className="text-accent"> say about us</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-text-secondary">
            Real feedback from real brands we've helped grow. Every testimonial
            represents a partnership built on trust and results.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-black/40 to-black/80 p-8 sm:p-10 lg:p-14 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
            >
              {/* Quote icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-8">
                <Quote size={28} className="text-accent" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-text-primary mb-10">
                "{current.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-accent/20"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl border-2 border-accent/20 bg-accent/5 flex items-center justify-center text-accent/50">
                    <User size={24} />
                  </div>
                )}
                <div>
                  <p className="text-base font-bold text-text-primary">
                    {current.name}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {current.role},{" "}
                    {current.websiteUrl ? (
                      <a
                        href={current.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent font-semibold hover:underline inline-flex items-center gap-1 group/link"
                      >
                        {current.company}
                        <ExternalLink size={12} className="opacity-60 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-accent font-semibold">
                        {current.company}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={() => paginate(-1)}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentIndex([index, index > currentIndex ? 1 : -1])
                    }
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      index === currentIndex
                        ? "w-8 bg-accent"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

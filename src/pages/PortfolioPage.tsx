import { ExternalLink } from "lucide-react";
// import { SEO } from "@/components";

const portfolioItems = [
  {
    title: "Haanav Eviors",
    category: "Luxury Events & Interior Architecture",
    description:
      "A premium brand website for a luxury event production and interior architecture firm — combining bespoke high-end event management with modern minimalist design language.",
    image:
      "/images/haanav-eviors.jpg",
    results: "Premium brand positioning & digital presence",
    url: "https://www.haanaveviors.com/",
  },
  {
    title: "FitGym Elite",
    category: "Fitness & SaaS Platform",
    description:
      "A high-performance gym and fitness SaaS platform featuring workout trackers, diet planners, gamified challenges, and premium membership flows.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop",
    results: "Full-stack SaaS web application with interactive UI",
    url: "https://fit-gym-rosy-sigma.vercel.app/",
  },
  {
    title: "Grand Occasion",
    category: "Event Venue Booking",
    description:
      "A premium banquet hall booking platform with real-time availability, seamless reservation management, and elegant event coordination for weddings and corporate events.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=450&fit=crop",
    results: "Streamlined booking flow & venue management",
    url: "https://grand-occassion.vercel.app/",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* SEO removed */}
      {/* Hero */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Our Work
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mt-4 mb-6">
            Portfolio That
            <span className="text-accent"> Speaks Results</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every project here represents a brand we helped grow. Real
            businesses. Real results. Real growth.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 flex flex-col h-full cursor-pointer hover:shadow-[0_8px_30px_rgba(244,194,13,0.1)]"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <span className="text-xs sm:text-sm font-bold text-accent bg-accent/10 px-3 sm:px-4 py-2 rounded-full">
                      {item.results}
                    </span>
                    <ExternalLink
                      size={18}
                      className="text-text-muted group-hover:text-accent transition-colors duration-300 shrink-0"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
